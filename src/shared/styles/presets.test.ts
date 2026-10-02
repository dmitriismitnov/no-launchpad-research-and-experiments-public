import { describe, expect, test, } from "bun:test";

import { mergeConfigs, } from "@pandacss/config";
import type { Config, } from "@pandacss/dev";

import { avatarRecipe, } from "../components/avatar/preset";
import { badgeRecipe, } from "../components/badge/preset";
import { buttonIconRecipe, } from "../components/button-icon/preset";
import { buttonRecipe, } from "../components/button/preset";
import { cardRecipe, } from "../components/card/preset";
import { dividerRecipe, } from "../components/divider/preset";
import { iconRecipe, } from "../components/icon/preset";
import { inputRecipe, } from "../components/input/preset";
import { skeletonRecipe, } from "../components/skeleton/preset";
import { spinnerRecipe, } from "../components/spinner/preset";
import { statusIndicatorRecipe, } from "../components/status-indicator/preset";
import { tagRecipe, } from "../components/tag/preset";
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

        expect(Object.keys(componentPreset?.theme?.slotRecipes ?? {})).toEqual([
            "button",
            "buttonIcon",
            "card",
            "input",
            "badge",
            "avatar",
            "statusIndicator",
            "tag",
        ]);
        expect(Object.keys(componentPreset?.theme?.recipes ?? {})).toEqual([
            "icon",
            "dividerRule",
            "skeleton",
            "spinner",
        ]);
    });

    test("keeps every component recipe after the loader merge", () => {
        expect(mergedConfig.theme?.slotRecipes?.["button"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["buttonIcon"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["card"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["input"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["badge"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["avatar"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["statusIndicator"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["tag"]).toBeDefined();
        expect(mergedConfig.theme?.recipes?.["icon"]).toBeDefined();
        expect(mergedConfig.theme?.recipes?.["dividerRule"]).toBeDefined();
        expect(mergedConfig.theme?.recipes?.["skeleton"]).toBeDefined();
        expect(mergedConfig.theme?.recipes?.["spinner"]).toBeDefined();
    });

    test("carries the recipe content declared by each component", () => {
        expect(mergedConfig.theme?.slotRecipes?.["button"]).toEqual(buttonRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["buttonIcon"]).toEqual(buttonIconRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["card"]).toEqual(cardRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["input"]).toEqual(inputRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["badge"]).toEqual(badgeRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["avatar"]).toEqual(avatarRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["statusIndicator"]).toEqual(statusIndicatorRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["tag"]).toEqual(tagRecipe);
        expect(mergedConfig.theme?.recipes?.["icon"]).toEqual(iconRecipe);
        expect(mergedConfig.theme?.recipes?.["dividerRule"]).toEqual(dividerRecipe);
        expect(mergedConfig.theme?.recipes?.["skeleton"]).toEqual(skeletonRecipe);
        expect(mergedConfig.theme?.recipes?.["spinner"]).toEqual(spinnerRecipe);
    });

    test("carries component-owned keyframes", () => {
        expect(mergedConfig.theme?.keyframes?.["spin"]).toEqual({
            from: { transform: "rotate(0deg)", },
            to: { transform: "rotate(360deg)", },
        });
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

        expect(Object.keys(forward.slotRecipes)).toEqual([
            "button",
            "buttonIcon",
            "card",
            "input",
            "badge",
            "avatar",
            "statusIndicator",
            "tag",
        ]);
        expect(Object.keys(reversed.slotRecipes)).toEqual([
            "tag",
            "statusIndicator",
            "avatar",
            "badge",
            "input",
            "card",
            "buttonIcon",
            "button",
        ]);
        expect(Object.keys(forward.recipes)).toEqual([ "icon", "dividerRule", "skeleton", "spinner", ]);
        expect(Object.keys(reversed.recipes)).toEqual([ "spinner", "skeleton", "dividerRule", "icon", ]);
    });
});
