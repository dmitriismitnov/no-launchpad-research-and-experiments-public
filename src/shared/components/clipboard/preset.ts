import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Clipboard visual projection. Slots: root / value / copy.
 *
 * A single-line readonly field: a value on a sunken surface with an optional
 * copy control. The component never touches the clipboard API; `onCopy` is a
 * consumer callback.
 *
 * Pen `Jfhu9` (master) / `wsiFp` (documentation): named parts `root · value ·
 * copy control · confirmation · error state`; state contract `default · error ·
 * hover · copied · focus-visible`. Resolved roles:
 * - root fill `surface/sunken` -> `semantic.surface.sunken`
 * - root stroke `border/subtle` -> `semantic.border.subtle`
 * - value `text/primary` -> `semantic.text.primary`
 * - copy control `text/secondary` -> `semantic.text.secondary`
 * - copy control focus ring `focus/ring` (2px outer) -> `semantic.focus.ring`
 *
 * The Pen confirmation/error icons (`feedback/positive-fg` /
 * `feedback/negative-fg`), the `inline · field / with label / masked / error`
 * variants and the `hover` / `copied` / `error` states need new public props or
 * the `feedback/*` Foundation roles the code does not ship; they are recorded
 * BLOCKED, not implemented.
 *
 * Approximations: Pen's mono family (IBM Plex Mono) has no code token, so the
 * body family is used.
 */
export const clipboardRecipe = defineSlotRecipe({
    className: "clipboard",
    slots: [ "root", "value", "copy", ],

    base: {
        root: {
            display: "flex",
            alignItems: "center",
            gap: "x2",
            minHeight: "x20",
            paddingInline: "x6",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.border.subtle",
            borderRadius: "md",
            backgroundColor: "semantic.surface.sunken",
        },

        value: {
            flex: "1",
            minWidth: "0",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "tight",
            letterSpacing: "normal",
            color: "semantic.text.primary",
        },

        copy: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
            padding: "x0",
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            color: "semantic.text.secondary",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
        },
    },
});

export const clipboardPreset = definePreset({
    name: "@no-launchpad/clipboard",
    theme: { slotRecipes: { clipboard: clipboardRecipe, }, },
});
