import type { Preset, RecipeConfig, SlotRecipeConfig, } from "@pandacss/dev";
import { definePreset, } from "@pandacss/dev";

import { badgePreset, } from "../components/badge/preset";
import { buttonIconPreset, } from "../components/button-icon/preset";
import { buttonPreset, } from "../components/button/preset";
import { cardPreset, } from "../components/card/preset";
import { iconPreset, } from "../components/icon/preset";
import { inputPreset, } from "../components/input/preset";
import { foundationPreset, } from "./foundation";
import { preflight, settingsPreset, } from "./settings";

export {
    badgePreset,
    buttonIconPreset,
    buttonPreset,
    cardPreset,
    foundationPreset,
    iconPreset,
    inputPreset,
    preflight,
    settingsPreset,
};

/**
 * Component presets own only their own recipe. Panda shallow-merges `theme`
 * across presets, so two presets that both declare `theme.slotRecipes` would
 * overwrite each other's section instead of merging it. The collection point
 * therefore gathers the component dictionaries into one technical preset: a
 * shallow, two-key collection. No deep merge, no component overrides and no
 * hidden inheritance.
 */
export const componentPresetSources: readonly Preset[] = [
    buttonPreset,
    buttonIconPreset,
    cardPreset,
    iconPreset,
    inputPreset,
    badgePreset,
];

export const collectComponentDictionaries = (
    sources: readonly Preset[],
): { recipes: Record<string, RecipeConfig>; slotRecipes: Record<string, SlotRecipeConfig>; } => {
    const recipes: Record<string, RecipeConfig> = {};
    const slotRecipes: Record<string, SlotRecipeConfig> = {};

    for ( const source of sources ) {
        if ( source.theme?.recipes ) {
            Object.assign(recipes, source.theme.recipes);
        }

        if ( source.theme?.slotRecipes ) {
            Object.assign(slotRecipes, source.theme.slotRecipes);
        }
    }

    return { recipes, slotRecipes, };
};

export const componentsPreset = definePreset({
    name: "@no-launchpad/components",
    theme: collectComponentDictionaries(componentPresetSources),
});

export const presets = [ settingsPreset, foundationPreset, componentsPreset, ];
