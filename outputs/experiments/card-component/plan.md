# Card v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static reusable Card with 16:9 media, optional structured regions, and a Button-based footer action.

**Architecture:** `Card` is a declarative React component that owns its full `<article>` markup and its Panda slot elements. The recipe owns the visual projection and joins the project’s explicit component-preset collection. The existing validated SVG is copied into the component as a Vite URL asset; no image pipeline is added.

**Tech Stack:** React, TypeScript, Vite asset URLs, PandaCSS slot recipes, Bun Test, Storybook/Vitest browser tests.

**Spec:** `outputs/experiments/card-component/notes/design-spec.md`

## Global Constraints

- Implement only static Card v1: no `onClick`, link behavior, `children`, compound API, variants, image loading state, or error fallback.
- Keep source under `src/shared/components/card/`; do not add dependencies.
- Use semantic and foundation tokens; use full CSS property names and no `_light`/`_dark` recipe branches.
- Never edit `src/shared/styled-system`; run `mise run gen` after recipe registration.
- Preserve the SVG asset’s contents unchanged and retain its experiment copy in `outputs/`.
- Match existing Button/ButtonIcon formatting, export, recipe, test, and Storybook patterns.

## Review Focus

- No `media`: render a decorative local SVG image rather than omitting media.
- Supplied `media` with `alt=""`: preserve the supplied URL and empty alt; do not replace it with the skeleton.
- Empty `header` or `footer` objects: do not emit an empty wrapper, unless an action button requires the footer.
- Explicit `actionButton.size`: override Card’s default `sm` size.
- Native article `className` and `aria-label`: preserve both on `<article>` while retaining recipe classes.

---

## File Structure

| File | Responsibility |
| --- | --- |
| `src/shared/components/card/card.tsx` | Public types and deterministic article markup. |
| `src/shared/components/card/preset.ts` | Card slot anatomy and reference-derived styles. |
| `src/shared/components/card/index.ts` | Public Card/type/recipe exports. |
| `src/shared/components/card/assets/card-media.skeleton.svg` | Decorative 16:9 no-media asset. |
| `src/shared/components/card/Card.test.ts` | Recipe structure and styling-policy tests. |
| `src/shared/components/card/Card.composition.test.tsx` | Server-rendered public API tests. |
| `src/shared/components/card/Card.stories.tsx` | Stories and browser assertions. |
| `src/shared/styles/index.ts` | Explicit Card preset registration. |

### Task 1: Create and register the visual recipe

**Files:**
- Create: `src/shared/components/card/preset.ts`
- Create: `src/shared/components/card/Card.test.ts`
- Modify: `src/shared/styles/index.ts:4-20`

**Interfaces:**
- Consumes: `definePreset`, `defineSlotRecipe`, existing foundation tokens, semantic colour roles.
- Produces: `cardRecipe`, `cardPreset`, and generated `card()` styles with every specified slot.

- [ ] **Step 1: Write the failing recipe tests**

Create `Card.test.ts`, based on `Button.test.ts`, with these exact tests:

```ts
import { describe, expect, test, } from "bun:test";
import { cardRecipe, } from "./preset";

describe("card recipe", () => {
    test("declares the complete card anatomy", () => {
        expect(cardRecipe.slots).toEqual([
            "root", "media", "body", "header", "title", "description",
            "footer", "footerPrimary", "footerSecondary", "actionButton",
        ]);
    });
    test("has no public variants", () => {
        expect(cardRecipe.variants).toBeUndefined();
    });
    test("does not branch on theme inside the recipe", () => {
        expect(JSON.stringify(cardRecipe)).not.toMatch(/_(light|dark)\b/);
    });
});
```

Copy the `bannedShorthands` and recursive `collectKeys` helpers from `Button.test.ts`, and add a test that all keys in `cardRecipe.base` exclude `bg`, `p`, `px`, `py`, `pt`, `pr`, `pb`, `pl`, `m`, `mx`, `my`, `mt`, `mb`, `ml`, `w`, `h`, and `size`.

- [ ] **Step 2: Confirm the tests fail before implementation**

Run: `bun test src/shared/components/card/Card.test.ts`

Expected: FAIL because `./preset` does not exist.

- [ ] **Step 3: Implement the recipe and register it**

Create `cardRecipe` with this exact anatomy:

```ts
slots: [
    "root", "media", "body", "header", "title", "description",
    "footer", "footerPrimary", "footerSecondary", "actionButton",
],
```

Create `cardPreset` with name `@no-launchpad/card` and its recipe in `theme.slotRecipes.card`. Base styles must use a vertical root with `x2` padding, a thin solid `semantic.common.200.divider` border, `md` radius, `semantic.common.50.background` fill, and a `semantic.shadow.*` shadow. Media must have `width: "full"`, `aspectRatio: "16 / 9"`, `overflow: "hidden"`, `sm` radius, and a `semantic.common.200.background` placeholder fill. Body is vertical. Footer is a top-divided flex row with top padding and gap. `actionButton` has `flexShrink: "0"`. Place colours and typography on their individual slots, never the root.

Use token names already present in the project’s foundation files; do not invent tokens. Do not add a `variants` property.

Update `src/shared/styles/index.ts` by importing/exporting `cardPreset` and inserting it into `componentPresetSources`:

```ts
import { cardPreset, } from "../components/card/preset";
export const componentPresetSources: readonly Preset[] = [
    buttonPreset, buttonIconPreset, cardPreset, iconPreset,
];
```

- [ ] **Step 4: Generate and verify the recipe**

Run: `mise run gen && bun test src/shared/components/card/Card.test.ts`

Expected: generation succeeds and all recipe tests PASS.

- [ ] **Step 5: Commit the recipe**

```bash
git add src/shared/components/card/preset.ts src/shared/components/card/Card.test.ts src/shared/styles/index.ts src/shared/styled-system
git commit -m "feat(card): add card visual recipe"
```

### Task 2: Add the SVG asset and deterministic Card markup

**Files:**
- Create: `src/shared/components/card/assets/card-media.skeleton.svg`
- Create: `src/shared/components/card/card.tsx`
- Create: `src/shared/components/card/index.ts`
- Create: `src/shared/components/card/Card.composition.test.tsx`

**Interfaces:**
- Consumes: generated `card()` recipe, `Button`/`ButtonProps`, `Icon`/`IconName`, and Vite SVG URL imports.
- Produces: `Card`, `CardProps`, `CardMedia`, `CardHeader`, and `CardFooter`.

- [ ] **Step 1: Write failing composition tests**

Use `renderToStaticMarkup`, following `Button.composition.test.tsx`. Include this test block:

```tsx
test("renders an article with its title and forwarded attributes", () => {
    const markup = renderToStaticMarkup(
        <Card title="Pressure sensors" aria-label="Sensor family" data-card="catalog" />,
    );
    expect(markup).toContain("<article");
    expect(markup).toContain('aria-label="Sensor family"');
    expect(markup).toContain('data-card="catalog"');
    expect(markup).toContain("<h3");
    expect(markup).toContain("Pressure sensors");
});

test("uses the decorative skeleton when media is absent", () => {
    const markup = renderToStaticMarkup(<Card title="Pressure sensors" />);
    expect(markup).toContain("card-media.skeleton.svg");
    expect(markup).toContain('alt=""');
});

test("uses supplied media without a fallback image", () => {
    const markup = renderToStaticMarkup(
        <Card title="Pressure sensors" media={{ src: "/sensor.jpg", alt: "Pressure gauge", }} />,
    );
    expect(markup).toContain('src="/sensor.jpg"');
    expect(markup).toContain('alt="Pressure gauge"');
    expect(markup).not.toContain("card-media.skeleton.svg");
});
```

Also test: optional header/description/footer wrappers are absent on a title-only Card; header label/icon and both footer notes render when supplied; `actionButton={{ children: "Details", }}` resolves to `button--size_sm`; `actionButton={{ children: "Details", size: "md", }}` resolves to `button--size_md`. Add `@ts-expect-error` lines proving Card rejects `children` and media without `alt`.

- [ ] **Step 2: Confirm the tests fail before implementation**

Run: `bun test src/shared/components/card/Card.composition.test.tsx`

Expected: FAIL because the Card module and asset do not exist.

- [ ] **Step 3: Copy the skeleton unchanged**

Copy `outputs/experiments/card-media-skeleton/card-media.skeleton.svg` to `src/shared/components/card/assets/card-media.skeleton.svg` byte-for-byte. Keep the source artifact in `outputs/`.

- [ ] **Step 4: Implement Card and its barrel**

Define the five public types exactly as in the spec. Use these imports:

```ts
import type { ComponentProps, } from "react";
import { Button, type ButtonProps, } from "@shared/components/button";
import { Icon, type IconName, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { card, } from "@shared/styled-system/recipes";
import cardMediaSkeleton from "./assets/card-media.skeleton.svg";
```

Compute:

```ts
const hasHeader = header?.label != null || header?.icon != null;
const hasFooter = footer?.primaryNote != null
    || footer?.secondaryNote != null
    || actionButton != null;
```

Render `<article {...props} className={cx(styles.root, className)}>` with no `children` position. Always render the media slot: supplied `<img src={media.src} alt={media.alt}>` when `media` exists, otherwise `<img src={cardMediaSkeleton} alt="">`. When `actionButton` exists, use this exact precedence:

```tsx
<span className={styles.actionButton}>
    <Button size="sm" {...actionButton} />
</span>
```

Do not render empty footer-note spans for an action-only footer. Render a header icon as `<Icon name={header.icon} size="sm" />` without `label`. Export `Card`, the five public types, `cardPreset`, and `cardRecipe` from `index.ts` using the Button barrel pattern.

- [ ] **Step 5: Verify the component**

Run: `mise run gen && bun test src/shared/components/card/Card.composition.test.tsx && mise run check:types`

Expected: generation, composition tests, and type checking all PASS.

- [ ] **Step 6: Commit the component**

```bash
git add src/shared/components/card src/shared/styled-system
git commit -m "feat(card): add static card component"
```

### Task 3: Add Storybook documentation and browser assertions

**Files:**
- Create: `src/shared/components/card/Card.stories.tsx`

**Interfaces:**
- Consumes: public `Card` API, existing Panda `css`, Storybook test helpers.
- Produces: Card documentation and browser-level behavior checks.

- [ ] **Step 1: Write the stories and play assertions**

Create a `Meta<typeof Card>` titled `Components/Card` with fullscreen layout. Copy Button’s `ThemeShell` pattern. Add stories named `Playground`, `CatalogReference`, `Minimal`, `Media`, `ActionButton`, `Light`, and `Dark`.

`CatalogReference` must use title `"Датчики давления"`, description `"Измерение давления жидкостей и газов в трубопроводах и резервуарах."`, header `{ label: "01", icon: "gauge", }`, and footer `{ primaryNote: "0…400 бар", secondaryNote: "4…20 мА", }`, with no supplied media so the skeleton is visible.

Add play assertions: Minimal has only an article, one image, and one h3; Media has supplied `src` and `alt`; ActionButton exposes a button named `Details` whose class includes `button--size_sm`; Light and Dark each expose an article.

- [ ] **Step 2: Run browser tests and correct only spec violations**

Run: `mise run test:browser`

Expected: all browser tests PASS. If a Card assertion fails, correct Card markup, recipe, or story to the spec. Do not add variants or interactive-card behavior.

- [ ] **Step 3: Inspect the documented component**

Run: `mise run dev:storybook`

Expected: Storybook starts at `$STORYBOOK_URL`. Inspect `Components/Card` in light and dark: media is 16:9, content is not clipped, contrast is readable, and the footer aligns both with notes and with an action button. Stop the server after inspection.

- [ ] **Step 4: Commit the stories**

```bash
git add src/shared/components/card/Card.stories.tsx
git commit -m "docs(card): add card stories"
```

### Task 4: Perform integration verification

**Files:**
- Modify only files where verification finds a violation of the spec.

**Interfaces:**
- Consumes: completed Card source, recipe, generated CSS, tests, and stories.
- Produces: a verified Card v1 without code-generation drift.

- [ ] **Step 1: Regenerate Panda artifacts**

Run: `mise run gen`

Expected: succeeds without errors.

- [ ] **Step 2: Run focused Card tests**

Run: `bun test src/shared/components/card`

Expected: all Card recipe and composition tests PASS.

- [ ] **Step 3: Run the quality gate and dependency check**

Run: `mise run check && mise run check:deps`

Expected: lint, types, format, asset drift, unit/browser tests, and Knip all PASS.

- [ ] **Step 4: Commit verification-only changes if needed**

Run: `git status --short`

Expected: no uncommitted changes. If generated output or a verification fix is still uncommitted, stage only Card-related files and commit with `chore(card): verify card integration`.

## Plan Self-Review

- **Spec coverage:** Tasks 1–4 cover recipe/registration, every public prop, SVG behavior, static semantics, stories, and all required checks.
- **No placeholders:** each task names exact files, APIs, test cases, commands, and expected outcomes.
- **Type consistency:** `CardProps`, `CardMedia`, `CardHeader`, `CardFooter`, `cardRecipe`, and `cardPreset` use the same names throughout.
- **Review focus coverage:** Task 2 tests omitted/supplied media, empty optional regions, action-size precedence, and article attributes; Task 3 validates the rendered contract in a browser.
