import type { CssKeyframes, Preset, RecipeConfig, SlotRecipeConfig, } from "@pandacss/dev";
import { definePreset, } from "@pandacss/dev";

import { accordionItemPreset, } from "../components/accordion-item/preset";
import { alertDialogPreset, } from "../components/alert-dialog/preset";
import { alertPreset, } from "../components/alert/preset";
import { avatarPreset, } from "../components/avatar/preset";
import { badgePreset, } from "../components/badge/preset";
import { brandPreset, } from "../components/brand/preset";
import { breadcrumbsPreset, } from "../components/breadcrumbs/preset";
import { buttonIconPreset, } from "../components/button-icon/preset";
import { buttonPreset, } from "../components/button/preset";
import { cardPreset, } from "../components/card/preset";
import { carouselPreset, } from "../components/carousel/preset";
import { clipboardPreset, } from "../components/clipboard/preset";
import { codeBlockPreset, } from "../components/code-block/preset";
import { contextMenuPreset, } from "../components/context-menu/preset";
import { dataTablePreset, } from "../components/data-table/preset";
import { dialogPreset, } from "../components/dialog/preset";
import { dividerPreset, } from "../components/divider/preset";
import { drawerPreset, } from "../components/drawer/preset";
import { emptyStatePreset, } from "../components/empty-state/preset";
import { floatingPanelPreset, } from "../components/floating-panel/preset";
import { hoverCardPreset, } from "../components/hover-card/preset";
import { iconPreset, } from "../components/icon/preset";
import { inputPreset, } from "../components/input/preset";
import { linkPreset, } from "../components/link/preset";
import { listPreset, } from "../components/list/preset";
import { mediaPlaceholderPreset, } from "../components/media-placeholder/preset";
import { menuPreset, } from "../components/menu/preset";
import { navItemPreset, } from "../components/nav-item/preset";
import { paginationPreset, } from "../components/pagination/preset";
import { popoverPreset, } from "../components/popover/preset";
import { progressRingPreset, } from "../components/progress-ring/preset";
import { progressPreset, } from "../components/progress/preset";
import { qrCodePreset, } from "../components/qr-code/preset";
import { scrollAreaPreset, } from "../components/scroll-area/preset";
import { sheetPreset, } from "../components/sheet/preset";
import { sidebarItemPreset, } from "../components/sidebar-item/preset";
import { skeletonPreset, } from "../components/skeleton/preset";
import { spinnerPreset, } from "../components/spinner/preset";
import { splitterPreset, } from "../components/splitter/preset";
import { statisticPreset, } from "../components/statistic/preset";
import { statusIndicatorPreset, } from "../components/status-indicator/preset";
import { stepPreset, } from "../components/step/preset";
import { tabPreset, } from "../components/tab/preset";
import { tagPreset, } from "../components/tag/preset";
import { timelinePreset, } from "../components/timeline/preset";
import { toastPreset, } from "../components/toast/preset";
import { tooltipPreset, } from "../components/tooltip/preset";
import { topNavigationPreset, } from "../components/top-navigation/preset";
import { tourPreset, } from "../components/tour/preset";
import { treeItemPreset, } from "../components/tree-item/preset";
import { foundationPreset, } from "./foundation";
import { preflight, settingsPreset, } from "./settings";

export {
    accordionItemPreset,
    alertDialogPreset,
    alertPreset,
    avatarPreset,
    badgePreset,
    brandPreset,
    breadcrumbsPreset,
    buttonIconPreset,
    buttonPreset,
    cardPreset,
    carouselPreset,
    clipboardPreset,
    codeBlockPreset,
    contextMenuPreset,
    dataTablePreset,
    dialogPreset,
    dividerPreset,
    drawerPreset,
    emptyStatePreset,
    floatingPanelPreset,
    foundationPreset,
    hoverCardPreset,
    iconPreset,
    inputPreset,
    linkPreset,
    listPreset,
    mediaPlaceholderPreset,
    menuPreset,
    navItemPreset,
    paginationPreset,
    popoverPreset,
    preflight,
    progressPreset,
    progressRingPreset,
    qrCodePreset,
    scrollAreaPreset,
    settingsPreset,
    sheetPreset,
    sidebarItemPreset,
    skeletonPreset,
    spinnerPreset,
    splitterPreset,
    statisticPreset,
    statusIndicatorPreset,
    stepPreset,
    tabPreset,
    tagPreset,
    timelinePreset,
    toastPreset,
    tooltipPreset,
    topNavigationPreset,
    tourPreset,
    treeItemPreset,
};

/**
 * Component presets own only their own recipe. Panda shallow-merges `theme`
 * across presets, so two presets that both declare `theme.slotRecipes` would
 * overwrite each other's section instead of merging it. The collection point
 * therefore gathers the component dictionaries into one technical preset: a
 * shallow collection. No deep merge, no component overrides and no hidden
 * inheritance.
 */
export const componentPresetSources: readonly Preset[] = [
    buttonPreset,
    buttonIconPreset,
    cardPreset,
    iconPreset,
    inputPreset,
    badgePreset,
    dividerPreset,
    skeletonPreset,
    spinnerPreset,
    avatarPreset,
    statusIndicatorPreset,
    tagPreset,
    alertPreset,
    toastPreset,
    progressPreset,
    progressRingPreset,
    emptyStatePreset,
    statisticPreset,
    listPreset,
    timelinePreset,
    codeBlockPreset,
    clipboardPreset,
    dataTablePreset,
    scrollAreaPreset,
    splitterPreset,
    mediaPlaceholderPreset,
    qrCodePreset,
    linkPreset,
    navItemPreset,
    brandPreset,
    breadcrumbsPreset,
    sidebarItemPreset,
    topNavigationPreset,
    tabPreset,
    accordionItemPreset,
    menuPreset,
    stepPreset,
    paginationPreset,
    treeItemPreset,
    carouselPreset,
    contextMenuPreset,
    tooltipPreset,
    popoverPreset,
    hoverCardPreset,
    dialogPreset,
    alertDialogPreset,
    drawerPreset,
    sheetPreset,
    floatingPanelPreset,
    tourPreset,
];

export const collectComponentDictionaries = (
    sources: readonly Preset[],
): {
    recipes: Record<string, RecipeConfig>;
    slotRecipes: Record<string, SlotRecipeConfig>;
    keyframes: CssKeyframes;
} => {
    const recipes: Record<string, RecipeConfig> = {};
    const slotRecipes: Record<string, SlotRecipeConfig> = {};
    const keyframes: CssKeyframes = {};

    for ( const source of sources ) {
        if ( source.theme?.recipes ) {
            Object.assign(recipes, source.theme.recipes);
        }

        if ( source.theme?.slotRecipes ) {
            Object.assign(slotRecipes, source.theme.slotRecipes);
        }

        if ( source.theme?.keyframes ) {
            Object.assign(keyframes, source.theme.keyframes);
        }
    }

    return { recipes, slotRecipes, keyframes, };
};

export const componentsPreset = definePreset({
    name: "@no-launchpad/components",
    theme: collectComponentDictionaries(componentPresetSources),
});

export const presets = [ settingsPreset, foundationPreset, componentsPreset, ];
