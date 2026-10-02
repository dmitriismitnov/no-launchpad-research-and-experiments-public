import { AccordionItem, } from "@shared/components/accordion-item";
import { Alert, } from "@shared/components/alert";
import { Avatar, } from "@shared/components/avatar";
import { Badge, } from "@shared/components/badge";
import { Brand, } from "@shared/components/brand";
import { Breadcrumbs, } from "@shared/components/breadcrumbs";
import { Button, } from "@shared/components/button";
import { ButtonIcon, } from "@shared/components/button-icon";
import { Carousel, } from "@shared/components/carousel";
import { Clipboard, } from "@shared/components/clipboard";
import { CodeBlock, } from "@shared/components/code-block";
import { ContextMenu, } from "@shared/components/context-menu";
import { DataTable, } from "@shared/components/data-table";
import { Divider, } from "@shared/components/divider";
import { EmptyState, } from "@shared/components/empty-state";
import { Link, } from "@shared/components/link";
import { List, } from "@shared/components/list";
import { MediaPlaceholder, } from "@shared/components/media-placeholder";
import { Menu, MenuDivider, MenuItem, } from "@shared/components/menu";
import { NavItem, } from "@shared/components/nav-item";
import { Pagination, } from "@shared/components/pagination";
import { Progress, } from "@shared/components/progress";
import { ProgressRing, } from "@shared/components/progress-ring";
import { QrCode, } from "@shared/components/qr-code";
import { ScrollArea, } from "@shared/components/scroll-area";
import { SidebarItem, } from "@shared/components/sidebar-item";
import { Skeleton, } from "@shared/components/skeleton";
import { Spinner, } from "@shared/components/spinner";
import { Splitter, } from "@shared/components/splitter";
import { Statistic, } from "@shared/components/statistic";
import { StatusIndicator, } from "@shared/components/status-indicator";
import { Step, } from "@shared/components/step";
import { Tab, TabList, } from "@shared/components/tab";
import { Tag, } from "@shared/components/tag";
import { Timeline, } from "@shared/components/timeline";
import { Toast, } from "@shared/components/toast";
import { TopNavigation, } from "@shared/components/top-navigation";
import { TreeItem, } from "@shared/components/tree-item";
import { css, cx, } from "@shared/styled-system/css";

const tones = [ "primary", "secondary", "ghost", ] as const;

const tableColumns = [
    { key: "component", header: "COMPONENT", emphasis: "primary", },
    { key: "owner", header: "OWNER", width: 130, },
    { key: "status", header: "STATUS", width: 110, },
] as const;

const tableRows = [
    { id: "button", cells: { component: "Button", owner: "Ada Rivera", status: "Stable", }, },
    { id: "select", cells: { component: "Select", owner: "Kai Nakamura", status: "Beta", }, },
    { id: "data-table", cells: { component: "Data Table", owner: "Sam Okoro", status: "Draft", }, },
] as const;

const scrollLines = [
    "Scrollable content line 1",
    "Scrollable content line 2",
    "Scrollable content line 3",
    "Scrollable content line 4",
    "Scrollable content line 5",
    "Scrollable content line 6",
] as const;

const scrollLineStyle = css({
    fontFamily: "body",
    fontSize: "sm",
    fontWeight: "regular",
    lineHeight: "normal",
    color: "semantic.common.700.background",
});

const section = css({
    padding: "x12",
    backgroundColor: "semantic.common.100.background",
    color: "semantic.common.100.text",
});

const row = css({
    display: "flex",
    alignItems: "center",
    gap: "x8",
    flexWrap: "wrap",
});

const ThemePanel = ({ theme, }: { theme: "light" | "dark"; }) => (
    <section data-theme={theme}>
        <div className={section}>
            <div className={row}>
                {tones.map((tone) => <Button key={tone} tone={tone}>{tone}</Button>)}
                <Button tone="secondary" suffixIcon="arrow-right">Open</Button>
                {tones.map((tone) => <ButtonIcon key={tone} tone={tone} icon="settings" label={tone} />)}
            </div>
        </div>
    </section>
);

/*
 * Experiment-local Inter specimen.
 *
 * This is not a reusable typography API: it exists to prove that the generated
 * WOFF2 faces load and that a component can compose its text from individual
 * foundation atoms. It deliberately uses one `css()` class per atomic token
 * instead of a shared `textStyles` layer.
 */
const specimen = css({
    display: "grid",
    gap: "x4",
    padding: "x12",
    backgroundColor: "semantic.common.100.background",
    color: "semantic.common.100.text",
});

const specimenLine = css({
    fontFamily: "body",
    fontWeight: "regular",
    lineHeight: "normal",
    letterSpacing: "normal",
});

const specimenSize = {
    xs: css({ fontSize: "xs", }),
    sm: css({ fontSize: "sm", }),
    md: css({ fontSize: "md", }),
    lg: css({ fontSize: "lg", }),
    xl: css({ fontSize: "xl", }),
};

const specimenWeight = {
    regular: css({ fontWeight: "regular", }),
    medium: css({ fontWeight: "medium", }),
    semibold: css({ fontWeight: "semibold", }),
};

const specimenItalic = css({
    fontFamily: "body",
    fontStyle: "italic",
    fontSize: "sm",
    fontWeight: "semibold",
    lineHeight: "normal",
});

const specimenTitle = css({
    fontFamily: "body",
    fontSize: "lg",
    fontWeight: "semibold",
    lineHeight: "tight",
    letterSpacing: "tight",
});

const InterSpecimen = () => (
    <section data-testid="inter-specimen" className={specimen}>
        <p className={specimenTitle}>Inter specimen</p>
        <p className={cx(specimenLine, specimenSize["sm"], specimenWeight["regular"])}>
            Regular 400 — Launch / Запуск
        </p>
        <p className={cx(specimenLine, specimenSize["sm"], specimenWeight["medium"])}>
            Medium 500 — Launch / Запуск
        </p>
        <p className={cx(specimenLine, specimenSize["sm"], specimenWeight["semibold"])}>
            Semibold 600 — Launch / Запуск
        </p>
        <p className={specimenItalic}>Italic 600 — Launch / Запуск</p>
        <p className={specimenSize["xs"]}>xs · Launch / Запуск</p>
        <p className={specimenSize["sm"]}>sm · Launch / Запуск</p>
        <p className={specimenSize["md"]}>md · Launch / Запуск</p>
        <p className={specimenSize["lg"]}>lg · Launch / Запуск</p>
        <p className={specimenSize["xl"]}>xl · Launch / Запуск</p>
    </section>
);

export const App = () => (
    <main className={css({ display: "grid", gap: "x8", padding: "x12", })}>
        <h1 className={css({ fontSize: "xl", fontWeight: "semibold", lineHeight: "tight", })}>No Launchpad</h1>
        <div className={css({ display: "flex", gap: "x8", alignItems: "center", flexWrap: "wrap", })}>
            <Badge label="Neutral" />
            <Badge label="Healthy" tone="positive" />
            <Badge label="Failed" tone="negative" />
            <Badge label="New" tone="brand" />
            <Badge label="No dot" withDot={false} />
        </div>
        <div className={css({ display: "grid", gap: "x8", })}>
            <TopNavigation
                brand={<Brand />}
                nav={
                    <>
                        <NavItem href="#" label="Overview" active />
                        <NavItem href="#" label="Components" />
                        <NavItem href="#" label="Pricing" />
                    </>
                }
                actions={
                    <>
                        <NavItem href="#" label="Sign in" />
                        <Button size="sm">Get started</Button>
                    </>
                }
            />
            <TopNavigation
                surface="transparent"
                brand={<Brand name="Acme" />}
                actions={<Link href="#" external>Open changelog</Link>}
            />
        </div>
        <div className={css({ display: "flex", alignItems: "center", gap: "x8", flexWrap: "wrap", })}>
            <Link href="#">Read the docs</Link>
            <Link href="#" tone="subtle">Subtle link</Link>
            <Link href="#" leadingIcon="file">Design tokens</Link>
            <Link href="#" disabled>Disabled</Link>
            <Breadcrumbs
                items={[
                    { label: "Foundation", href: "#", },
                    { label: "Components", href: "#", },
                    { label: "Button", },
                ]}
            />
        </div>
        <div className={css({ display: "flex", flexDirection: "column", gap: "x1", width: "200px", })}>
            <SidebarItem href="#" label="Dashboard" icon="layout-grid" active />
            <SidebarItem href="#" label="Tokens" icon="sliders-horizontal" />
            <SidebarItem href="#" label="Archived" icon="file" disabled />
        </div>
        <div className={css({ display: "flex", gap: "x8", alignItems: "center", flexWrap: "wrap", })}>
            <Avatar name="Alice Ryder" presence="online" />
            <Tag label="Design" onClose={() => {}} />
            <StatusIndicator label="Online" tone="positive" />
            <Spinner label="Loading" />
            <Skeleton style={{ width: "8rem", height: "0.75rem", }} />
            <Divider orientation="vertical" style={{ height: "1.5rem", }} />
        </div>
        <div className={css({ display: "grid", gap: "x8", maxWidth: "32rem", })}>
            <Alert
                title="Saved"
                description="Your changes are live."
                tone="positive"
                icon="check"
            />
            <Toast
                title="Saved"
                description="Your changes are live."
                icon="check"
                action={{ label: "Undo", onClick: () => {}, }}
            />
            <Progress value={60} label="Upload progress" />
            <div className={css({ display: "flex", alignItems: "center", gap: "x8", })}>
                <ProgressRing value={60} label="Upload progress" />
                <ProgressRing value={25} size={64} thickness={6} label="Upload progress" />
            </div>
            <EmptyState
                title="No tokens yet"
                description="Create your first semantic token to get started."
                icon="settings"
                action={<Button size="sm">New token</Button>}
            />
        </div>
        <div className={css({ display: "grid", gap: "x8", maxWidth: "32rem", })}>
            <Statistic
                label="Active users"
                value="48.2K"
                delta="+12.4% vs last week"
                trend="up"
                deltaIcon="trending-up"
            />
            <List
                items={[
                    { title: "primitive-tokens.json", meta: "12 KB · 2h ago", trailing: "JSON", icon: "file", },
                    { title: "semantic-tokens.json", meta: "48 KB · 2h ago", trailing: "JSON", icon: "file", },
                    { title: "Button.tsx", meta: "Edited by Ada", trailing: "TSX", icon: "file", },
                ]}
            />
            <Timeline
                items={[
                    { title: "Foundation published", meta: "Mar 2", },
                    { title: "Components in review", meta: "In progress", },
                    { title: "Contrast audit", meta: "Failed", },
                ]}
            />
            <CodeBlock
                code={'import { tokens } from "@nolaunchpad/core";\n\nconst button = tokens.semantic.brand[600];'}
                filename="tokens.ts"
                onCopy={() => {}}
            />
            <Clipboard value="npm i @nolaunchpad/tokens" onCopy={() => {}} />
        </div>
        <div className={css({ display: "grid", gap: "x8", maxWidth: "48rem", })}>
            <Splitter
                start={<span>Editor</span>}
                end={<span>Preview</span>}
            />
            <MediaPlaceholder label="16 : 9 media" />
            <div className={css({ display: "flex", alignItems: "flex-start", gap: "x8", })}>
                <QrCode label="QR code placeholder" />
                <ScrollArea label="Release notes">
                    {scrollLines.map((line) => <p key={line} className={scrollLineStyle}>{line}</p>)}
                </ScrollArea>
            </div>
            <DataTable columns={tableColumns} rows={tableRows} aria-label="Components" />
        </div>
        <div className={css({ display: "grid", gap: "x8", maxWidth: "32rem", })}>
            <TabList>
                <Tab label="Overview" active />
                <Tab label="Tokens" />
                <Tab label="Archived" disabled />
            </TabList>
            <AccordionItem title="What are primitive tokens?" defaultOpen>
                Immutable raw values owned by the foundation layer.
            </AccordionItem>
            <AccordionItem title="How do themes work?">
                Themes map the same semantic roles to light and dark values.
            </AccordionItem>
            <div className={css({ display: "flex", alignItems: "center", gap: "x8", flexWrap: "wrap", })}>
                <Step number={1} label="Foundation" state="completed" />
                <Step number={2} label="Components" state="current" />
                <Step number={3} label="States" state="upcoming" />
            </div>
        </div>
        <div className={css({ display: "flex", alignItems: "flex-start", gap: "x8", flexWrap: "wrap", })}>
            <Menu label="Actions">
                <MenuItem label="Rename" shortcut="⌘R" />
                <MenuItem label="Duplicate" icon="copy" checked />
                <MenuItem label="Export" icon="file" submenu />
                <MenuDivider />
                <MenuItem label="Delete" tone="danger" />
            </Menu>
            <Pagination page={2} totalPages={8} />
        </div>
        <div className={css({ display: "grid", gap: "x8", maxWidth: "32rem", })}>
            <div role="tree" className={css({ display: "flex", flexDirection: "column", })}>
                <TreeItem label="Foundation" icon="folder" defaultExpanded>
                    <TreeItem label="Primitive tokens" icon="palette" />
                    <TreeItem label="Semantic tokens" icon="palette" selected />
                    <TreeItem label="Components" icon="folder">
                        <TreeItem label="Button" icon="layout-grid" />
                        <TreeItem label="Select" icon="layout-grid" disabled />
                    </TreeItem>
                </TreeItem>
            </div>
            <Carousel
                slides={[
                    { label: "Overview", icon: "image", },
                    { label: "Tokens", icon: "image", },
                    { label: "Components", icon: "image", },
                ]}
            />
            <ContextMenu
                label="Actions"
                defaultOpen
                x={24}
                y={24}
                trigger="Right-click area"
            >
                <MenuItem label="Rename" shortcut="⌘R" />
                <MenuItem label="Duplicate" icon="copy" checked />
                <MenuItem label="Delete" tone="danger" />
            </ContextMenu>
        </div>
        <InterSpecimen />
        <ThemePanel theme="light" />
        <ThemePanel theme="dark" />
    </main>
);
