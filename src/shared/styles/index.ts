import type { CssKeyframes, Preset, RecipeConfig, SlotRecipeConfig, } from "@pandacss/dev";
import { definePreset, } from "@pandacss/dev";

import { alertPreset, } from "../components/alert/preset";
import { avatarPreset, } from "../components/avatar/preset";
import { badgePreset, } from "../components/badge/preset";
import { buttonIconPreset, } from "../components/button-icon/preset";
import { buttonPreset, } from "../components/button/preset";
import { cardPreset, } from "../components/card/preset";
import { clipboardPreset, } from "../components/clipboard/preset";
import { codeBlockPreset, } from "../components/code-block/preset";
import { dataTablePreset, } from "../components/data-table/preset";
import { dividerPreset, } from "../components/divider/preset";
import { emptyStatePreset, } from "../components/empty-state/preset";
import { iconPreset, } from "../components/icon/preset";
import { inputPreset, } from "../components/input/preset";
import { listPreset, } from "../components/list/preset";
import { mediaPlaceholderPreset, } from "../components/media-placeholder/preset";
import { progressRingPreset, } from "../components/progress-ring/preset";
import { progressPreset, } from "../components/progress/preset";
import { qrCodePreset, } from "../components/qr-code/preset";
import { scrollAreaPreset, } from "../components/scroll-area/preset";
import { skeletonPreset, } from "../components/skeleton/preset";
import { spinnerPreset, } from "../components/spinner/preset";
import { splitterPreset, } from "../components/splitter/preset";
import { statisticPreset, } from "../components/statistic/preset";
import { statusIndicatorPreset, } from "../components/status-indicator/preset";
import { tagPreset, } from "../components/tag/preset";
import { timelinePreset, } from "../components/timeline/preset";
import { toastPreset, } from "../components/toast/preset";
import { foundationPreset, } from "./foundation";
import { preflight, settingsPreset, } from "./settings";

export {
    alertPreset,
    avatarPreset,
    badgePreset,
    buttonIconPreset,
    buttonPreset,
    cardPreset,
    clipboardPreset,
    codeBlockPreset,
    dataTablePreset,
    dividerPreset,
    emptyStatePreset,
    foundationPreset,
    iconPreset,
    inputPreset,
    listPreset,
    mediaPlaceholderPreset,
    preflight,
    progressPreset,
    progressRingPreset,
    qrCodePreset,
    scrollAreaPreset,
    settingsPreset,
    skeletonPreset,
    spinnerPreset,
    splitterPreset,
    statisticPreset,
    statusIndicatorPreset,
    tagPreset,
    timelinePreset,
    toastPreset,
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
