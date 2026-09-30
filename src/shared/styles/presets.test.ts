import { describe, expect, test, } from "bun:test";

import { mergeConfigs, } from "@pandacss/config";
import type { Config, } from "@pandacss/dev";

import { buttonIconRecipe, } from "../components/button-icon/preset";
import { buttonRecipe, } from "../components/button/preset";
import { cardRecipe, } from "../components/card/preset";
import { iconRecipe, } from "../components/icon/preset";
import { foundationPreset, } from "./foundation";
import { collectComponentDictionaries, componentPresetSources, presets, settingsPreset, } from "./index";

/**
 * Regression guard for preset composition.
 *
 * Panda's loader resolves presets depth-first and hands them to `mergeConfigs`
 * in declaration order, followed by the application config. The merge is the
 * real one, so these tests assert the merged result rather than only the source
 * objects.
 */
const appConfig: Config = {};
const mergedConfig = mergeConfigs([ ...presets, appConfig, ]) as Config;

describe("preset composition", () => {
    test("registers settings, foundation and one assembled component preset", () => {
        expect(presets).toHaveLength(3);
        expect(presets[0]).toBe(settingsPreset);
        expect(presets[1]).toBe(foundationPreset);
    });

    test("the assembled component preset owns every component recipe", () => {
        const componentPreset = presets[2];

        expect(Object.keys(componentPreset?.theme?.slotRecipes ?? {})).toEqual([ "button", "buttonIcon", "card", ]);
        expect(Object.keys(componentPreset?.theme?.recipes ?? {})).toEqual([ "icon", ]);
    });

    test("keeps every component recipe after the loader merge", () => {
        expect(mergedConfig.theme?.slotRecipes?.["button"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["buttonIcon"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["card"]).toBeDefined();
        expect(mergedConfig.theme?.recipes?.["icon"]).toBeDefined();
    });

    test("carries the recipe content declared by each component", () => {
        expect(mergedConfig.theme?.slotRecipes?.["button"]).toEqual(buttonRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["buttonIcon"]).toEqual(buttonIconRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["card"]).toEqual(cardRecipe);
        expect(mergedConfig.theme?.recipes?.["icon"]).toEqual(iconRecipe);
    });

    test("preserves foundation tokens and system conditions", () => {
        const tokenGroups = Object.keys(mergedConfig.theme?.tokens ?? {});

        for ( const group of [ "colors", "sizes", "spacing", ] ) {
            expect(tokenGroups).toContain(group);
        }

        expect(mergedConfig.theme?.semanticTokens).toBeDefined();
        expect(mergedConfig.conditions?.["light"]).toContain('data-theme="light"');
        expect(mergedConfig.conditions?.["dark"]).toContain('data-theme="dark"');
    });

    test("component sources with distinct recipe names survive in any order", () => {
        const forward = collectComponentDictionaries(componentPresetSources);
        const reversed = collectComponentDictionaries([ ...componentPresetSources, ].reverse());

        expect(Object.keys(forward.slotRecipes)).toEqual([ "button", "buttonIcon", "card", ]);
        expect(Object.keys(reversed.slotRecipes)).toEqual([ "card", "buttonIcon", "button", ]);
        expect(Object.keys(reversed.recipes)).toEqual([ "icon", ]);
    });
});
