import { Badge, } from "@shared/components/badge";
import { Brand, } from "@shared/components/brand";
import { Button, } from "@shared/components/button";
import { ButtonIcon, } from "@shared/components/button-icon";
import { Card, } from "@shared/components/card";
import { Divider, } from "@shared/components/divider";
import { Link, } from "@shared/components/link";
import { NavItem, } from "@shared/components/nav-item";
import { Statistic, } from "@shared/components/statistic";
import { ThemeSwitchPreview, } from "@shared/components/theme-switch-preview";
import { TopNavigation, } from "@shared/components/top-navigation";
import { css, } from "@shared/styled-system/css";

const shell = css({
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "semantic.common.50.background",
    color: "semantic.common.50.text",
    fontFamily: "body",
});

// Pen frames: 1440 frame / 1312 content (64px gutters), 768 / 704 (32px),
// 390 / 350 (20px). Content max width is the shared 1312px column.
const container = css({
    width: "100%",
    maxWidth: "1312px",
    marginInline: "auto",
    paddingInline: { base: "x10", md: "x16", xl: "x32", },
});

const section = css({ paddingBlock: { base: "x20", md: "x25", xl: "x32", }, });

const eyebrow = css({
    fontSize: "xs",
    fontWeight: "semibold",
    letterSpacing: "wide",
    textTransform: "uppercase",
    color: "semantic.brand.700.background",
});

const hero = css({ display: "grid", gap: "x8", paddingBlock: { base: "x20", md: "x25", xl: "x40", }, });

// Pen hero H1: 56 / 40 / 32 across desktop / tablet / mobile.
const heroTitle = css({
    fontSize: { base: "2xl", md: "3xl", xl: "4xl", },
    fontWeight: "semibold",
    lineHeight: "tight",
    letterSpacing: "tight",
    maxWidth: "18ch",
});

// Pen hero sub: 20px desktop, 16px below.
const lead = css({
    fontSize: { base: "md", xl: "lg", },
    lineHeight: "relaxed",
    color: "semantic.common.600.background",
    maxWidth: "60ch",
});

// Pen section copy: 16px desktop/tablet, 14px mobile.
const sectionLead = css({
    fontSize: { base: "sm", md: "md", },
    lineHeight: "relaxed",
    color: "semantic.common.600.background",
    maxWidth: "60ch",
});

const row = css({ display: "flex", alignItems: "center", gap: "x8", flexWrap: "wrap", });

// Pen reflows the header: desktop keeps the full action row, tablet keeps the
// primary action, mobile keeps only the brand and a menu trigger.
const headerNav = css({ display: { base: "none", md: "flex", }, alignItems: "center", gap: "x2", });
const headerDesktopOnly = css({ display: { base: "none", lg: "inline-flex", }, alignItems: "center", });
const headerTabletUp = css({ display: { base: "none", md: "inline-flex", }, alignItems: "center", });
const headerMobileOnly = css({ display: { base: "inline-flex", md: "none", }, alignItems: "center", });

// Pen value strip is 4-up desktop, 2-up tablet, 1-up mobile; this landing
// carries three statistics, so the tracks follow the same breakpoints.
const statsRow = css({
    display: "grid",
    gridTemplateColumns: {
        base: "minmax(0, 1fr)",
        md: "repeat(2, minmax(0, 1fr))",
        xl: "repeat(3, minmax(0, 1fr))",
    },
    gap: { base: "x10", md: "x12", xl: "x16", },
    paddingBlock: "x12",
});

// Pen tablet stacks the feature section; desktop lays the cards out in one row.
const features = css({
    display: "grid",
    gridTemplateColumns: {
        base: "minmax(0, 1fr)",
        lg: "repeat(3, minmax(0, 1fr))",
    },
    gap: "x12",
});

const sectionHead = css({ display: "grid", gap: "x6", marginBottom: "x16", });

// Pen section H2: 40 / 32 / 24 across desktop / tablet / mobile.
const sectionTitle = css({
    fontSize: { base: "xl", md: "2xl", xl: "3xl", },
    fontWeight: "semibold",
    lineHeight: "tight",
    letterSpacing: "tight",
    maxWidth: "26ch",
});

const muted = css({ color: "semantic.common.600.background", });

// Pen workflow: 4-up desktop, 2x2 tablet, 1-up mobile.
const steps = css({
    display: "grid",
    gridTemplateColumns: {
        base: "minmax(0, 1fr)",
        md: "repeat(2, minmax(0, 1fr))",
        xl: "repeat(4, minmax(0, 1fr))",
    },
    gap: { base: "x8", md: "x12", },
});

const step = css({ display: "grid", gap: "x4", });

const stepIndex = css({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "x12",
    height: "x12",
    borderRadius: "full",
    fontSize: "sm",
    fontWeight: "semibold",
    backgroundColor: "semantic.brand.50.background",
    color: "semantic.brand.700.background",
});

// Pen `CTA panel`: raised surface, strong boundary, 16px radius, [56, 64]
// padding, 20px gap. Tablet is [44, 32], mobile [32, 20].
const cta = css({
    display: "grid",
    gap: "x10",
    justifyItems: "start",
    paddingBlock: { base: "x16", md: "x22", xl: "x25", },
    paddingInline: { base: "x10", md: "x16", xl: "x32", },
    borderRadius: "lg",
    borderWidth: "thin",
    borderStyle: "solid",
    borderColor: "semantic.border.strong",
    backgroundColor: "semantic.surface.raised",
});

const footer = css({ marginTop: "auto", paddingBlock: "x16", });

// Pen footer: 4 columns desktop, 3 tablet, 1 mobile; this landing groups the
// product/resources/legal columns, so 3 desktop and 1 mobile.
const footerGrid = css({
    display: "grid",
    gridTemplateColumns: { base: "minmax(0, 1fr)", md: "repeat(3, minmax(0, 1fr))", },
    gap: "x12",
});

const footerHeading = css({
    fontSize: "xs",
    fontWeight: "semibold",
    letterSpacing: "wide",
    textTransform: "uppercase",
    color: "semantic.common.600.background",
});

const footerList = css({
    display: "grid",
    gap: "x4",
    marginTop: "x6",
});

const copyright = css({
    marginTop: "x12",
    fontSize: "xs",
    color: "semantic.common.600.background",
});

const navLinks = [ "Foundation", "Components", "States", "Screens", ] as const;

const featureData = [
    {
        label: "Tokens",
        title: "Primitive and semantic tokens",
        description:
            "Own the raw palette once. Semantic tokens carry a value for every theme, so dark mode is a projection, not a fork.",
    },
    {
        label: "Architecture",
        title: "Component-scoped architecture",
        description:
            "Each component owns its anatomy, public variants and visual states. No hidden inheritance, no cross-component overrides.",
    },
    {
        label: "Responsive",
        title: "Responsive and state-aware UI",
        description:
            "The same components render across desktop, tablet and mobile, and document hover, focus-visible, active and disabled.",
    },
] as const;

const workflowSteps = [
    { title: "Tokens", description: "Primitives, semantics, themes, spacing, type and shape.", },
    { title: "Components", description: "Reusable masters with public variants and anatomy.", },
    { title: "State catalogue", description: "Hover, focus, disabled, loading, invalid, selected.", },
    { title: "Screens", description: "Landing, dashboard and app surfaces from instances.", },
] as const;

export const Landing = () => (
    <div className={shell}>
        <TopNavigation
            brand={<Brand />}
            nav={
                <div className={headerNav}>
                    {navLinks.map((label) => <NavItem key={label} label={label} href="#" />)}
                </div>
            }
            actions={
                <>
                    <span className={headerDesktopOnly}>
                        <ThemeSwitchPreview />
                    </span>
                    <span className={headerDesktopOnly}>
                        <Link href="#">Sign in</Link>
                    </span>
                    <span className={headerTabletUp}>
                        <Button>Get started</Button>
                    </span>
                    <span className={headerMobileOnly}>
                        <ButtonIcon icon="menu" label="Open navigation" tone="ghost" />
                    </span>
                </>
            }
        />

        <div className={container}>
            <section className={hero} data-testid="landing-hero">
                <span className={eyebrow}>Component-scoped design system</span>
                <h1 className={heroTitle}>One foundation. Every screen, both themes.</h1>
                <p className={lead}>
                    A component-scoped design system for teams that ship in light and dark. Primitive and semantic
                    tokens, reusable components and a full state catalogue in one place.
                </p>
                <div className={row}>
                    <Button>Start with the foundation</Button>
                    <Button tone="secondary" suffixIcon="arrow-right">Browse components</Button>
                </div>
            </section>

            <div className={statsRow} data-testid="landing-stats">
                <Statistic label="Components" value="64" delta="+6 this release" trend="up" />
                <Statistic label="Tokens" value="480" delta="+48 this release" trend="up" />
                <Statistic label="Themes" value="2" delta="0 this release" />
            </div>
        </div>

        <Divider />

        <div className={container}>
            <section className={section}>
                <div className={sectionHead}>
                    <span className={eyebrow}>Foundation</span>
                    <h2 className={sectionTitle}>Everything a design system needs, in one canvas</h2>
                    <p className={sectionLead}>
                        Foundation, components and states — organised, themed and ready to compose.
                    </p>
                </div>

                <div className={features} data-testid="landing-features">
                    {featureData.map((feature) => (
                        <Card
                            key={feature.title}
                            title={feature.title}
                            description={feature.description}
                            header={{ label: feature.label, }}
                            footer={{ primaryNote: feature.label, secondaryNote: "documented", }}
                        />
                    ))}
                </div>
            </section>
        </div>

        <div className={container}>
            <section className={section}>
                <div className={sectionHead}>
                    <span className={eyebrow}>Workflow</span>
                    <h2 className={sectionTitle}>From foundation to product screens</h2>
                </div>
                <div className={steps} data-testid="landing-steps">
                    {workflowSteps.map((item, index) => (
                        <div key={item.title} className={step}>
                            <span className={stepIndex}>{index + 1}</span>
                            <span className={css({ fontWeight: "semibold", })}>{item.title}</span>
                            <span className={muted}>{item.description}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>

        <Divider />

        <div className={container}>
            <section className={section}>
                <div className={sectionHead}>
                    <span className={eyebrow}>Themes</span>
                    <h2 className={sectionTitle}>Light and dark from the same components</h2>
                    <p className={sectionLead}>
                        Switch the theme context and every token re-resolves. No forked components, no dark-mode
                        cleanup.
                    </p>
                </div>
                <div className={cta}>
                    <Badge label="Ready in both themes" tone="positive" />
                    <h3 className={css({ fontSize: "2xl", fontWeight: "semibold", lineHeight: "tight", })}>
                        Start with the foundation
                    </h3>
                    <p className={muted}>
                        Install the token package, drop in the components and ship both themes from day one.
                    </p>
                    <Button>Read the documentation</Button>
                </div>
            </section>
        </div>

        <div className={footer}>
            <div className={container}>
                <Divider />
                <div className={css({ paddingTop: "x12", })}>
                    <Brand />
                </div>
                <div className={css({ marginTop: "x12", })}>
                    <div className={footerGrid} data-testid="landing-footer-grid">
                        <div>
                            <span className={footerHeading}>Product</span>
                            <div className={footerList}>
                                <Link href="#">Overview</Link>
                                <Link href="#">Components</Link>
                                <Link href="#">Changelog</Link>
                            </div>
                        </div>
                        <div>
                            <span className={footerHeading}>Resources</span>
                            <div className={footerList}>
                                <Link href="#">Documentation</Link>
                                <Link href="#">Pricing</Link>
                                <Link href="#">Figma library</Link>
                            </div>
                        </div>
                        <div>
                            <span className={footerHeading}>Legal</span>
                            <div className={footerList}>
                                <Link href="#">Privacy</Link>
                                <Link href="#">Terms</Link>
                            </div>
                        </div>
                    </div>
                    <p className={copyright}>© 2025 No Launchpad. All rights reserved.</p>
                </div>
            </div>
        </div>
    </div>
);
