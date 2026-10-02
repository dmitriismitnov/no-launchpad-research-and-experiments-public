import type { ReactNode, } from "react";

import { Badge, } from "@shared/components/badge";
import { Brand, } from "@shared/components/brand";
import { Button, } from "@shared/components/button";
import { ButtonIcon, } from "@shared/components/button-icon";
import { Card, } from "@shared/components/card";
import { Divider, } from "@shared/components/divider";
import { Icon, type IconName, } from "@shared/components/icon";
import { Input, } from "@shared/components/input";
import { Link, } from "@shared/components/link";
import { NavItem, } from "@shared/components/nav-item";
import { Statistic, } from "@shared/components/statistic";
import { TopNavigation, } from "@shared/components/top-navigation";
import { css, cx, } from "@shared/styled-system/css";

/**
 * Landing screen composition, ported from the three Pen frames
 * `10 Landing — desktop` (`DsHK8`), `11 Landing — tablet` (`XiPDu`) and
 * `12 Landing — mobile` (`T4klu9`).
 *
 * Existing public components carry every control, card, navigation entry and
 * glyph. Layout lives in app-local Panda CSS with explicit `md` / `lg` / `xl`
 * breakpoints; `data-theme` stays the only light/dark axis.
 */
const shell = css({
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "semantic.surface.base",
    color: "semantic.text.primary",
    fontFamily: "body",
});

// Pen content column: 1312 / 1440, 704 / 768, 350 / 390.
const container = css({
    width: "100%",
    maxWidth: "1312px",
    marginInline: "auto",
    // Pen desktop gutters are 64px; the xN scale tops out at x25 (50px), so the
    // desktop gutter is the same literal the Pen frame documents.
    paddingInline: { base: "x10", md: "x16", xl: "64px", },
});

const section = css({ paddingBlock: { base: "x16", md: "x20", xl: "x25", }, });

const sectionHead = css({
    display: "grid",
    gap: "x6",
    justifyItems: "center",
    textAlign: "center",
    marginBottom: { base: "x12", xl: "x16", },
});

const sectionTitle = css({
    fontSize: { base: "xl", md: "2xl", xl: "3xl", },
    fontWeight: "bold",
    lineHeight: "tight",
    letterSpacing: "tight",
    maxWidth: "26ch",
});

const sectionLead = css({
    fontSize: { base: "sm", md: "md", },
    lineHeight: "relaxed",
    color: "semantic.text.secondary",
    maxWidth: "52ch",
});

const eyebrow = css({
    fontSize: "xs",
    fontWeight: "medium",
    letterSpacing: "wide",
    textTransform: "uppercase",
    color: "semantic.text.link",
});

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

const navWrap = css({ display: { base: "none", md: "flex", }, alignItems: "center", gap: "x2", });

// Pen header: 76 / 68 / 64 tall with the same 64 / 32 / 20 gutters as the page
// column. Utilities sit after the TopNavigation recipe layer, so the bar keeps
// its component contract while the landing aligns it to the Pen frame.
const headerBar = css({
    paddingInline: { base: "x10", md: "x16", xl: "64px", },
    height: { base: "64px", md: "68px", xl: "76px", },
});
const navTokensOnly = css({ display: { base: "none", lg: "inline-flex", }, alignItems: "center", });
const desktopOnly = css({ display: { base: "none", lg: "flex", }, alignItems: "center", });
const tabletUp = css({ display: { base: "none", md: "flex", }, alignItems: "center", });
const belowDesktop = css({ display: { base: "flex", lg: "none", }, alignItems: "center", });

// ---------------------------------------------------------------------------
// Mobile menu
// ---------------------------------------------------------------------------

// Pen `12 Landing — mobile` (`T4klu9`) opens with the expanded menu `M2D0g`
// directly below the header: five full-width entries, then a full-width
// primary action and a status badge. It is a static composition, not a
// disclosure: the trigger stays decorative and the panel has no state.
const mobileMenu = css({
    display: { base: "grid", md: "none", },
    justifyItems: "stretch",
    gap: "x3",
    padding: "x8",
    backgroundColor: "semantic.surface.raised",
});

const mobileMenuSpacer = css({ height: "x3", });

// Keep the status badge at its intrinsic width instead of stretching with the
// menu column.
const mobileMenuStatus = css({ justifySelf: "start", });

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

const hero = css({ paddingBlock: { base: "x16", md: "x20", xl: "64px", }, });

const heroGrid = css({
    display: "grid",
    gridTemplateColumns: { base: "minmax(0, 1fr)", xl: "minmax(0, 1fr) 600px", },
    gap: { base: "x12", xl: "x20", },
    alignItems: "center",
});

const heroCopy = css({ display: "grid", gap: "x8", alignContent: "center", });

const tagRow = css({ display: "flex", alignItems: "center", gap: "x5", flexWrap: "wrap", });

const tagline = css({ fontSize: "xs", color: "semantic.text.tertiary", });

const heroTitle = css({
    fontSize: { base: "2xl", md: "3xl", xl: "4xl", },
    fontWeight: "bold",
    lineHeight: "tight",
    letterSpacing: "tight",
    maxWidth: "16ch",
});

const lead = css({
    fontSize: { base: "md", xl: "lg", },
    lineHeight: "relaxed",
    color: "semantic.text.secondary",
    maxWidth: "56ch",
});

const actionRow = css({ display: "flex", alignItems: "center", gap: "x5", flexWrap: "wrap", });

// Pen mobile hero actions (`P6A8Xm`): the two controls become a full-width
// stack with the 12px Pen gap and 48px controls. From `md` the pre-existing
// horizontal intrinsic 40px row is kept, as freezes the parity plan.
const heroActions = css({
    display: "flex",
    flexDirection: { base: "column", md: "row", },
    alignItems: { base: "stretch", md: "center", },
    gap: { base: "x6", md: "x5", },
});

const heroActionButton = css({
    width: { base: "100%", md: "auto", },
    height: { base: "x24", md: "x20", },
});

const trustRow = css({ display: "flex", alignItems: "center", gap: "x5", flexWrap: "wrap", });

const trustLabel = css({ fontSize: "xs", color: "semantic.text.tertiary", });

// ---------------------------------------------------------------------------
// Product preview
// ---------------------------------------------------------------------------

const preview = css({
    display: "flex",
    width: "100%",
    minHeight: { base: "200px", md: "340px", xl: "460px", },
    borderWidth: "thin",
    borderStyle: "solid",
    borderColor: "semantic.border.subtle",
    borderRadius: "lg",
    backgroundColor: "semantic.surface.raised",
    overflow: "hidden",
});

const previewSidebar = css({
    display: { base: "none", md: "flex", },
    flexDirection: "column",
    gap: "x4",
    width: { md: "180px", xl: "190px", },
    flexShrink: "0",
    padding: "x8",
    borderInlineEndWidth: "thin",
    borderInlineEndStyle: "solid",
    borderInlineEndColor: "semantic.border.subtle",
    backgroundColor: "semantic.surface.sunken",
});

const previewSidebarSpacer = css({ flex: "1", minHeight: "x4", });

const previewMain = css({
    display: "flex",
    flexDirection: "column",
    gap: "x6",
    flex: "1",
    minWidth: "0",
    padding: "x8",
});

const previewHead = css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "x4",
});

const previewTitle = css({ fontSize: "md", fontWeight: "semibold", lineHeight: "tight", });

const previewStats = css({
    display: "grid",
    gridTemplateColumns: { base: "repeat(2, minmax(0, 1fr))", md: "repeat(3, minmax(0, 1fr))", },
    gap: "x6",
});

const previewTabs = css({
    display: { base: "none", xl: "flex", },
    alignItems: "center",
    gap: "x8",
    borderBlockEndWidth: "thin",
    borderBlockEndStyle: "solid",
    borderBlockEndColor: "semantic.border.subtle",
});

const previewTab = css({
    paddingBlock: "x3",
    fontSize: "sm",
    fontWeight: "medium",
    color: "semantic.text.secondary",
});

const previewTabActive = css({
    color: "semantic.text.primary",
    borderBlockEndWidth: "thick",
    borderBlockEndStyle: "solid",
    borderBlockEndColor: "semantic.action.primary.background",
    marginBlockEnd: "-1px",
});

const previewRow = css({
    display: "flex",
    alignItems: "center",
    gap: "x4",
    fontSize: "sm",
    color: "semantic.text.secondary",
});

const previewRowName = css({ flex: "1", minWidth: "0", color: "semantic.text.primary", });

const codeSurface = {
    borderRadius: "md",
    backgroundColor: "semantic.surface.sunken",
    padding: "x6",
    fontSize: "xs",
    lineHeight: "normal",
    color: "semantic.text.secondary",
    overflow: "hidden",
};

const codeBlock = css({ ...codeSurface, display: { base: "none", md: "block", }, });
const tokensCode = css({ ...codeSurface, display: { base: "none", xl: "block", }, });

const codeLine = css({ whiteSpace: "pre", });

const codeDim = css({ color: "semantic.text.tertiary", });

// ---------------------------------------------------------------------------
// Value strip
// ---------------------------------------------------------------------------

const valueStrip = css({
    display: "grid",
    gridTemplateColumns: { base: "minmax(0, 1fr)", md: "repeat(2, minmax(0, 1fr))", xl: "repeat(4, minmax(0, 1fr))", },
    gap: { base: "x10", xl: "x12", },
    paddingBlock: { base: "x12", xl: "x16", },
});

const valueItem = css({ display: "grid", gap: "x4", alignContent: "start", });

const valueHead = css({ display: "flex", alignItems: "center", gap: "x3", });

const valueTitle = css({ fontSize: "md", fontWeight: "semibold", lineHeight: "tight", });

const valueBody = css({ fontSize: "sm", lineHeight: "relaxed", color: "semantic.text.secondary", });

// ---------------------------------------------------------------------------
// Features
// ---------------------------------------------------------------------------

const featureGrid = {
    display: "grid",
    gap: { base: "x12", xl: "x16", },
    alignItems: "center",
    paddingBlock: { base: "x12", xl: "x16", },
};

// Pen `10 Landing — desktop` (`DsHK8`) keeps the feature section header
// (`vaCHO`); the tablet and mobile frames drop it while keeping every feature.
const featuresHeaderSlot = css({ display: { base: "none", xl: "block", }, });

const feature = css({
    ...featureGrid,
    gridTemplateColumns: { base: "minmax(0, 1fr)", xl: "minmax(0, 1fr) 560px", },
});

// Pen alternates the copy/visual sides; the reversed master puts the visual
// first. Two complete classes avoid a cascade tie between two `xl:` utilities.
const featureReversed = css({
    ...featureGrid,
    gridTemplateColumns: { base: "minmax(0, 1fr)", xl: "560px minmax(0, 1fr)", },
});

const slotBase = { display: "grid", gap: "x6", alignContent: "center", gridRow: { base: "auto", xl: "1", }, };

const copySlot = css({ ...slotBase, gridColumn: { base: "1", xl: "1", }, });
const copySlotReversed = css({ ...slotBase, gridColumn: { base: "1", xl: "2", }, });
const visualSlot = css({ gridRow: { base: "auto", xl: "1", }, gridColumn: { base: "1", xl: "2", }, });
const visualSlotReversed = css({ gridRow: { base: "auto", xl: "1", }, gridColumn: { base: "1", xl: "1", }, });

const featureTag = css({ display: "flex", alignItems: "center", gap: "x3", });

const featureTitle = css({
    fontSize: { base: "xl", md: "2xl", xl: "3xl", },
    fontWeight: "bold",
    lineHeight: "tight",
    letterSpacing: "tight",
});

const featureBody = css({
    fontSize: { base: "sm", md: "md", },
    lineHeight: "relaxed",
    color: "semantic.text.secondary",
    maxWidth: "52ch",
});

// Pen keeps the bullet list (`LjRvF`) and the secondary action (`Df1Dk`) on
// desktop (`M2zLU`) only; tablet (`vzXfY`) and mobile (`pRsS2`) drop both.
const bulletList = css({
    display: { base: "none", xl: "grid", },
    gap: "x3",
    margin: "x0",
    padding: "x0",
    listStyle: "none",
});

const featureAction = css({ display: { base: "none", xl: "block", }, });

const bullet = css({ display: "flex", alignItems: "flex-start", gap: "x3", fontSize: "sm", });

const bulletIcon = css({ flexShrink: "0", color: "semantic.action.primary.background", marginTop: "x1", });

const visualPanel = css({
    display: "grid",
    borderWidth: "thin",
    borderStyle: "solid",
    borderColor: "semantic.border.subtle",
    borderRadius: "lg",
    backgroundColor: "semantic.surface.raised",
    overflow: "hidden",
});

const visualBar = css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "x4",
    paddingBlock: "x5",
    paddingInline: "x6",
    borderBlockEndWidth: "thin",
    borderBlockEndStyle: "solid",
    borderBlockEndColor: "semantic.border.subtle",
    backgroundColor: "semantic.surface.sunken",
});

const visualBarLabel = css({ fontSize: "xs", color: "semantic.text.tertiary", });

const visualBody = css({ display: "grid", gap: "x6", padding: "x6", });

const paletteRow = css({ display: "flex", alignItems: "center", gap: "x3", });

const paletteLabel = css({
    width: "64px",
    flexShrink: "0",
    fontSize: "xs",
    color: "semantic.text.tertiary",
});

const paletteSwatches = css({ display: "flex", flex: "1", minWidth: "0", gap: "x1", });

const paletteSwatch = css({ flex: "1", minWidth: "0", height: "24px", borderRadius: "sm", });

const buttonRow = css({ display: "flex", alignItems: "center", gap: "x4", flexWrap: "wrap", });

const metaList = css({ display: "grid", gap: "x2", margin: "x0", padding: "x0", });

const metaRow = css({ display: "flex", alignItems: "baseline", gap: "x4", fontSize: "sm", });

const metaKey = css({ width: "70px", flexShrink: "0", fontSize: "xs", color: "semantic.text.link", });

const metaValue = css({ margin: "x0", color: "semantic.text.secondary", });

const inputPair = css({
    display: "grid",
    gridTemplateColumns: { base: "minmax(0, 1fr)", md: "repeat(2, minmax(0, 1fr))", },
    gap: "x4",
});

const badgeRow = css({ display: "flex", alignItems: "center", gap: "x4", flexWrap: "wrap", });

const progressTrack = css({
    height: "x2",
    borderRadius: "full",
    backgroundColor: "semantic.surface.sunken",
    overflow: "hidden",
});

const progressFill = css({
    width: "60%",
    height: "100%",
    borderRadius: "full",
    backgroundColor: "semantic.action.primary.background",
});

// ---------------------------------------------------------------------------
// Workflow
// ---------------------------------------------------------------------------

const workflowSteps = css({
    display: "grid",
    gridTemplateColumns: { base: "minmax(0, 1fr)", md: "repeat(2, minmax(0, 1fr))", xl: "repeat(4, minmax(0, 1fr))", },
    gap: { base: "x8", md: "x12", },
});

const workflowStep = css({ display: "grid", gap: "x4", alignContent: "start", });

const workflowHead = css({ display: "flex", alignItems: "center", gap: "x3", });

const workflowDot = css({
    display: { base: "none", md: "inline-flex", },
    alignItems: "center",
    justifyContent: "center",
    width: "x9",
    height: "x9",
    flexShrink: "0",
    borderRadius: "full",
    fontSize: "xs",
    fontWeight: "semibold",
    backgroundColor: "semantic.action.primary.background",
    color: "semantic.action.primary.foreground",
});

const workflowIconOnly = css({ display: { base: "inline-flex", md: "none", }, color: "semantic.text.link", });

const workflowTitle = css({ fontSize: "md", fontWeight: "semibold", lineHeight: "tight", });

const workflowBody = css({ fontSize: "sm", lineHeight: "relaxed", color: "semantic.text.secondary", });

// ---------------------------------------------------------------------------
// Theme preview
// ---------------------------------------------------------------------------

const themePanelWrap = css({ display: "flex", justifyContent: { base: "center", md: "flex-start", }, });

const themePanel = css({
    display: "grid",
    gap: "x6",
    width: { base: "100%", md: "420px", },
    padding: "x8",
    borderWidth: "thin",
    borderStyle: "solid",
    borderColor: "semantic.border.subtle",
    borderRadius: "lg",
    backgroundColor: "semantic.surface.raised",
});

const themePanelHead = css({ display: "flex", alignItems: "center", gap: "x3", });

const themePanelTitle = css({ flex: "1", minWidth: "0", fontSize: "md", fontWeight: "semibold", });

const themePanelRow = css({ display: "flex", alignItems: "center", gap: "x4", flexWrap: "wrap", });

// ---------------------------------------------------------------------------
// CTA
// ---------------------------------------------------------------------------

const ctaPanel = css({
    display: "grid",
    gap: "x6",
    justifyItems: "center",
    textAlign: "center",
    paddingBlock: { base: "x16", md: "44px", xl: "x25", },
    paddingInline: { base: "x10", md: "x16", xl: "64px", },
    borderWidth: "thin",
    borderStyle: "solid",
    borderColor: "semantic.border.strong",
    borderRadius: "lg",
    backgroundColor: "semantic.surface.raised",
});

const ctaTitle = css({
    fontSize: { base: "xl", md: "2xl", xl: "3xl", },
    fontWeight: "bold",
    lineHeight: "tight",
    maxWidth: "24ch",
});

const ctaLead = css({
    fontSize: { base: "sm", md: "md", },
    lineHeight: "relaxed",
    color: "semantic.text.secondary",
    maxWidth: "60ch",
});

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

const footer = css({ marginTop: "auto", paddingBlock: { base: "x12", xl: "x16", }, });

const footerGrid = css({
    display: "grid",
    gridTemplateColumns: {
        base: "minmax(0, 1fr)",
        md: "repeat(3, minmax(0, 1fr))",
        xl: "320px repeat(3, minmax(0, 1fr))",
    },
    gap: { base: "x10", xl: "x12", },
    paddingBlockEnd: "x8",
});

const footerBrandCol = css({ display: "grid", gap: "x4", alignContent: "start", });

const footerTag = css({ fontSize: "sm", lineHeight: "relaxed", color: "semantic.text.secondary", maxWidth: "40ch", });

const footerColumn = css({ display: "grid", gap: "x4", alignContent: "start", });

const footerHeading = css({ fontSize: "xs", color: "semantic.text.tertiary", });

const footerList = css({ display: "grid", gap: "x3", });

const footerLegalMobile = css({ display: { base: "grid", md: "none", xl: "grid", }, });

const footerBottom = css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "x6",
    flexWrap: "wrap",
    paddingBlockStart: "x8",
});

const copyright = css({ fontSize: "xs", color: "semantic.text.tertiary", });

const socialRow = css({ display: "flex", alignItems: "center", gap: "x6", });

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const headerLinks = [ "Product", "Components", "Tokens", "Pricing", ] as const;

// Pen mobile menu order (`M2D0g`): Overview, Foundations, Components, States,
// Pricing, then the primary action and the status badge.
const mobileMenuLinks = [ "Overview", "Foundations", "Components", "States", "Pricing", ] as const;

const valueItems = [
    {
        icon: "layout-grid",
        title: "System clarity",
        description: "Clear layers: foundation owns tokens, components own anatomy.",
    },
    {
        icon: "sliders-horizontal",
        title: "Predictable tokens",
        description: "Primitive and semantic tokens referenced everywhere, never hardcoded.",
    },
    {
        icon: "copy",
        title: "Reusable components",
        description: "Masters with public variants; instances everywhere.",
    },
    {
        icon: "moon",
        title: "Light / dark consistency",
        description: "Every semantic token resolves a value for both themes.",
    },
] as const satisfies ReadonlyArray<{ icon: IconName; title: string; description: string; }>;

type FeatureVisual = "tokens" | "architecture" | "states";

type Feature = {
    id: string;
    eyebrow: string;
    eyebrowIcon: IconName;
    title: string;
    description: string;
    bullets: string[];
    action: string;
    actionIcon: IconName;
    visual: FeatureVisual;
    reverse?: boolean;
};

const features: Feature[] = [
    {
        id: "landing-feature-tokens",
        eyebrow: "Foundation",
        eyebrowIcon: "palette",
        title: "Primitive and semantic tokens",
        description:
            "Own the raw palette once. Build meaning on top: semantic tokens carry a value for every theme, so dark mode is a projection, not a fork.",
        bullets: [
            "6 primitive families × 11 steps",
            "6 semantic groups, all themed",
            "Spacing, type, shape and shadow tokens",
        ],
        action: "Read the token reference",
        actionIcon: "arrow-right",
        visual: "tokens",
    },
    {
        id: "landing-feature-components",
        eyebrow: "Components",
        eyebrowIcon: "copy",
        title: "Component-scoped architecture",
        description:
            "Each component owns its anatomy, public variants and visual states. No hidden inheritance, no cross-component overrides — just clear, local rules.",
        bullets: [
            "Masters + instances, not copies",
            "Public variants stay at the component",
            "Theme is system context, never a variant",
        ],
        action: "Browse components",
        actionIcon: "arrow-right",
        visual: "architecture",
        reverse: true,
    },
    {
        id: "landing-feature-states",
        eyebrow: "States",
        eyebrowIcon: "sliders-horizontal",
        title: "Responsive and state-aware UI",
        description:
            "The same components render across desktop, tablet and mobile. Every interactive surface documents hover, focus-visible, active and disabled.",
        bullets: [
            "Desktop, tablet and mobile compositions",
            "Full state catalogue for every family",
            "Focus rings and contrast verified in both themes",
        ],
        action: "Open the state catalogue",
        actionIcon: "arrow-right",
        visual: "states",
    },
];

const workflow = [
    {
        icon: "layout-grid",
        title: "Foundation",
        description: "Primitives, semantics, themes, spacing, type and shape.",
    },
    { icon: "copy", title: "Components", description: "Reusable masters with public variants and anatomy.", },
    {
        icon: "sliders-horizontal",
        title: "States",
        description: "Hover, focus, disabled, loading, invalid, selected.",
    },
    { icon: "folder", title: "Screens", description: "Landing, dashboard and app surfaces from instances.", },
] as const satisfies ReadonlyArray<{ icon: IconName; title: string; description: string; }>;

const footerColumns = [
    { heading: "Product", links: [ "Overview", "Components", "Tokens", "Pricing", ], },
    { heading: "Resources", links: [ "Documentation", "Changelog", "State catalogue", "Figma library", ], },
] as const;

const legalLinks = [ "Privacy", "Terms", "Status", ] as const;

const socials = [ "GitHub", "Twitter", "YouTube", ] as const;

const paletteRows = [
    { label: "neutral", family: "neutral", },
    { label: "blue", family: "blue", },
    { label: "green", family: "green", },
    { label: "sky", family: "sky", },
] as const;

const paletteSteps = [ 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, ] as const;

const paletteVar = (family: string, step: number): string => `var(--colors-palette-${family}-${step})`;

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

const Header = () => (
    <TopNavigation
        data-testid="landing-header"
        className={headerBar}
        brand={<Brand />}
        nav={
            <div className={navWrap}>
                {headerLinks.map((label) => (
                    <span key={label} className={label === "Tokens" ? navTokensOnly : undefined}>
                        <NavItem label={label} href="#" />
                    </span>
                ))}
            </div>
        }
        actions={
            <>
                <span className={desktopOnly}>
                    <Link tone="subtle" href="#">Sign in</Link>
                </span>
                <span className={tabletUp}>
                    <Button>Get the tokens</Button>
                </span>
                <span className={belowDesktop}>
                    <ButtonIcon icon="menu" label="Open navigation" tone="ghost" />
                </span>
            </>
        }
    />
);

const MobileMenu = () => (
    <nav data-testid="landing-mobile-menu" aria-label="Mobile" className={mobileMenu}>
        {mobileMenuLinks.map((label) => <NavItem key={label} label={label} href="#" />)}
        <div aria-hidden="true" className={mobileMenuSpacer} />
        <Button>Get the tokens</Button>
        <span className={mobileMenuStatus}>
            <Badge label="expanded mobile menu" />
        </span>
    </nav>
);

const ProductPreview = () => (
    <div data-testid="landing-product-preview" className={preview}>
        <div data-testid="landing-product-preview-sidebar" className={previewSidebar}>
            <Brand />
            <div className={previewSidebarSpacer} />
            {[ "Overview", "Foundations", "Components", "States", ].map((label) => (
                <NavItem key={label} label={label} href="#" />
            ))}
            <div className={previewSidebarSpacer} />
            <Badge label="beta" tone="neutral" />
        </div>

        <div className={previewMain}>
            <div className={previewHead}>
                <span className={previewTitle}>Tokens</span>
                <div className={actionRow}>
                    <Button size="sm" tone="secondary" prefixIcon="plus">Add</Button>
                    <ButtonIcon icon="settings" label="Preview settings" tone="ghost" size="sm" />
                </div>
            </div>

            <div className={previewStats}>
                <Statistic label="Components" value="64" delta="+6 this release" trend="up" />
                <Statistic label="Tokens" value="480" delta="+48 this release" trend="up" />
                <Statistic label="Themes" value="2" delta="0 this release" />
            </div>

            <div className={previewTabs}>
                <span className={cx(previewTab, previewTabActive)}>Preview</span>
                <span className={previewTab}>Code</span>
            </div>

            <div className={previewRow}>
                <Icon name="check" size="sm" />
                <span className={previewRowName}>Select</span>
                <span>Kai</span>
                <span>Beta</span>
            </div>

            <div className={codeBlock}>
                <div className={codeLine}>import {"{"} tokens {"}"} from "@nolaunchpad/core";</div>
                <div className={codeLine}></div>
                <div className={codeLine}>const button = tokens.semantic.brand[600];</div>
                <div className={cx(codeLine, codeDim)}>export const primary = button.background;</div>
            </div>
        </div>
    </div>
);

const Hero = () => (
    <section data-testid="landing-hero" className={hero}>
        <div className={container}>
            <div className={heroGrid}>
                <div className={heroCopy}>
                    <div className={tagRow}>
                        <Badge label="v2.3 released" tone="positive" />
                        <span className={tagline}>Component-scoped design system</span>
                    </div>
                    <h1 className={heroTitle}>One foundation. Every screen, both themes.</h1>
                    <p className={lead}>
                        No Launchpad keeps primitive and semantic tokens, reusable components and a full state catalogue
                        in one place — so your team ships consistent product UI without rebuilding it every sprint.
                    </p>
                    <div className={heroActions}>
                        <Button className={heroActionButton}>Get the tokens</Button>
                        <Button className={heroActionButton} tone="secondary">Explore components</Button>
                    </div>
                    <div className={trustRow}>
                        <span className={trustLabel}>Built on</span>
                        <Badge label="Inter" />
                        <Badge label="IBM Plex Mono" />
                        <Badge label="Figma tokens" />
                    </div>
                </div>
                <ProductPreview />
            </div>
        </div>
    </section>
);

const ValueStrip = () => (
    <section>
        <div className={container}>
            <div data-testid="landing-value-strip" className={valueStrip}>
                {valueItems.map((item) => (
                    <div key={item.title} className={valueItem}>
                        <div className={valueHead}>
                            <Icon name={item.icon} size="md" />
                            <span className={valueTitle}>{item.title}</span>
                        </div>
                        <p className={valueBody}>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const TokensPreview = () => (
    <div className={visualPanel}>
        <div className={visualBar}>
            <Badge label="palette" tone="brand" />
            <span className={visualBarLabel}>semantic/brand</span>
        </div>
        <div className={visualBody}>
            {paletteRows.map((row) => (
                <div key={row.family} className={paletteRow}>
                    <span className={paletteLabel}>{row.label}</span>
                    <div className={paletteSwatches}>
                        {paletteSteps.map((step) => (
                            <span
                                key={step}
                                className={paletteSwatch}
                                style={{ backgroundColor: paletteVar(row.family, step), }}
                            />
                        ))}
                    </div>
                </div>
            ))}
            <div className={tokensCode}>
                <div className={codeLine}>const brand = tokens.semantic.brand[600];</div>
                <div className={cx(codeLine, codeDim)}>export const primary = brand.background;</div>
            </div>
        </div>
    </div>
);

const ArchitecturePreview = () => (
    <div className={visualPanel}>
        <div className={visualBar}>
            <span className={visualBarLabel}>button.tsx</span>
            <Badge label="stable" tone="positive" />
        </div>
        <div className={visualBody}>
            <div className={buttonRow}>
                <Button tone="primary">Primary</Button>
                <Button tone="secondary">Secondary</Button>
                <Button tone="ghost">Ghost</Button>
                <Button tone="secondary" disabled>Disabled</Button>
            </div>
            <dl className={metaList}>
                {[
                    [ "anatomy", "root · prefix · label · suffix · spinner", ],
                    [ "public", "tone, size, width, icon placement", ],
                    [ "context", "theme: light | dark", ],
                    [ "states", "disabled suppresses interaction feedback", ],
                ].map(([ key, value, ]) => (
                    <div key={key} className={metaRow}>
                        <dt className={metaKey}>{key}</dt>
                        <dd className={metaValue}>{value}</dd>
                    </div>
                ))}
            </dl>
        </div>
    </div>
);

const StatesPreview = () => (
    <div className={visualPanel}>
        <div className={visualBar}>
            <span className={visualBarLabel}>states · text input</span>
        </div>
        <div className={visualBody}>
            <div className={inputPair}>
                <Input aria-label="Filled value" defaultValue="Filled" readOnly />
                <Input aria-label="Focus-visible example" placeholder="Focus-visible" readOnly />
            </div>
            <div className={badgeRow}>
                <Badge label="valid" tone="positive" />
                <Badge label="invalid" tone="negative" />
                <Badge label="read-only" />
                <Badge label="selected" tone="brand" />
            </div>
            <div className={progressTrack}>
                <div className={progressFill} />
            </div>
        </div>
    </div>
);

const FeatureVisualByKind = ({ kind, }: { kind: FeatureVisual; }) => {
    if ( kind === "tokens" ) {
        return <TokensPreview />;
    }

    if ( kind === "architecture" ) {
        return <ArchitecturePreview />;
    }

    return <StatesPreview />;
};

const FeatureSection = ({ feature: item, }: { feature: Feature; }) => (
    <div data-testid={item.id} className={item.reverse ? featureReversed : feature}>
        <div data-slot="copy" className={item.reverse ? copySlotReversed : copySlot}>
            <div className={featureTag}>
                <Icon name={item.eyebrowIcon} size="sm" />
                <span className={eyebrow}>{item.eyebrow}</span>
            </div>
            <h3 className={featureTitle}>{item.title}</h3>
            <p className={featureBody}>{item.description}</p>
            <ul className={bulletList}>
                {item.bullets.map((text) => (
                    <li key={text} className={bullet}>
                        <Icon className={bulletIcon} name="check" size="sm" />
                        <span>{text}</span>
                    </li>
                ))}
            </ul>
            <div className={featureAction}>
                <Button tone="secondary" suffixIcon={item.actionIcon}>{item.action}</Button>
            </div>
        </div>
        <div data-slot="visual" className={item.reverse ? visualSlotReversed : visualSlot}>
            <FeatureVisualByKind kind={item.visual} />
        </div>
    </div>
);

const Features = () => (
    <section data-testid="landing-features">
        <div className={container}>
            <div data-testid="landing-features-header" className={featuresHeaderSlot}>
                <div className={sectionHead}>
                    <h2 className={sectionTitle}>Everything a design system needs, in one canvas</h2>
                    <p className={sectionLead}>
                        Foundation, components and states — organised, themed and ready to compose.
                    </p>
                </div>
            </div>
            {features.map((item) => <FeatureSection key={item.id} feature={item} />)}
        </div>
    </section>
);

const Workflow = () => (
    <section data-testid="landing-workflow" className={section}>
        <div className={container}>
            <div className={sectionHead}>
                <h2 className={sectionTitle}>From foundation to product screens</h2>
                <p className={sectionLead}>
                    A workflow that keeps decisions local and the surface consistent.
                </p>
            </div>
            <div data-testid="landing-workflow-steps" className={workflowSteps}>
                {workflow.map((step, index) => (
                    <div key={step.title} className={workflowStep}>
                        <div className={workflowHead}>
                            <span className={workflowDot}>{index + 1}</span>
                            <span className={workflowIconOnly}>
                                <Icon name={step.icon} size="md" />
                            </span>
                            <span className={workflowTitle}>{step.title}</span>
                        </div>
                        <p className={workflowBody}>{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const ThemePreview = () => (
    <section data-testid="landing-theme-preview" className={section}>
        <div className={container}>
            <div className={sectionHead}>
                <span className={eyebrow}>Themes</span>
                <h2 className={cx(sectionTitle, css({ fontSize: { base: "lg", md: "xl", xl: "2xl", }, }))}>
                    Light and dark from the same components
                </h2>
                <p className={sectionLead}>
                    Switch the theme context and every token re-resolves. No forked components, no dark-mode cleanup.
                </p>
            </div>
            <div className={themePanelWrap}>
                {/* Pen `Dark preview` (`CIU7d`): the panel demonstrates the dark projection. */}
                <div data-theme="dark" data-testid="landing-theme-preview-panel" className={themePanel}>
                    <div className={themePanelHead}>
                        <Icon name="moon" size="sm" />
                        <span className={themePanelTitle}>Theme preview</span>
                        <Badge label="theme" />
                    </div>
                    <div className={themePanelRow}>
                        <Button>Primary</Button>
                        <Button tone="secondary">Secondary</Button>
                    </div>
                    <Input aria-label="Theme preview email" defaultValue="team@acme.dev" readOnly />
                    <div className={themePanelRow}>
                        <Badge label="Selected" tone="brand" />
                        <Badge label="Passing" tone="positive" />
                        <Badge label="Draft" />
                    </div>
                    <Card
                        variant="compact"
                        title="Card title"
                        description="Readable in both themes."
                        footer={{ primaryNote: "Updated 2h ago", secondaryNote: "Open", }}
                    />
                </div>
            </div>
        </div>
    </section>
);

const CallToAction = () => (
    <section data-testid="landing-cta" className={section}>
        <div className={container}>
            <div className={ctaPanel}>
                <h2 className={ctaTitle}>Start with the foundation</h2>
                <p className={ctaLead}>
                    Install the token package, drop in the components and ship both themes from day one.
                </p>
                <div className={actionRow}>
                    <Button>Get the tokens</Button>
                    <Button tone="secondary">Talk to us</Button>
                </div>
            </div>
        </div>
    </section>
);

const FooterColumn = ({ heading, links, }: { heading: string; links: readonly string[]; }) => (
    <div className={footerColumn}>
        <span className={footerHeading}>{heading}</span>
        <div className={footerList}>
            {links.map((label) => <Link key={label} tone="subtle" href="#">{label}</Link>)}
        </div>
    </div>
);

const Footer = () => (
    <footer data-testid="landing-footer" className={footer}>
        <div className={container}>
            <div data-testid="landing-footer-grid" className={footerGrid}>
                <div className={footerBrandCol}>
                    <Brand />
                    <p className={footerTag}>
                        A component-scoped design system for teams that ship in light and dark.
                    </p>
                    <Badge label="All systems nominal" tone="positive" />
                </div>
                {footerColumns.map((column) => (
                    <FooterColumn key={column.heading} heading={column.heading} links={column.links} />
                ))}
                <div className={footerLegalMobile}>
                    <FooterColumn heading="Legal" links={legalLinks} />
                </div>
            </div>
            <Divider />
            <div className={footerBottom}>
                <span className={copyright}>© 2025 No Launchpad. All rights reserved.</span>
                <div className={socialRow}>
                    {socials.map((label) => <Link key={label} tone="subtle" href="#">{label}</Link>)}
                </div>
            </div>
        </div>
    </footer>
);

export const Landing = (): ReactNode => (
    <div className={shell}>
        <Header />
        <MobileMenu />
        <main>
            <Hero />
            <ValueStrip />
            <Features />
            <Workflow />
            <ThemePreview />
            <CallToAction />
        </main>
        <Footer />
    </div>
);
