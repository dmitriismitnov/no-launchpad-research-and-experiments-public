import { describe, expect, test, } from "bun:test";

import { mergeConfigs, } from "@pandacss/config";
import type { Config, } from "@pandacss/dev";

import { accordionItemRecipe, } from "../components/accordion-item/preset";
import { alertDialogRecipe, } from "../components/alert-dialog/preset";
import { alertRecipe, } from "../components/alert/preset";
import { avatarRecipe, } from "../components/avatar/preset";
import { badgeRecipe, } from "../components/badge/preset";
import { brandRecipe, } from "../components/brand/preset";
import { breadcrumbsRecipe, } from "../components/breadcrumbs/preset";
import { buttonIconRecipe, } from "../components/button-icon/preset";
import { buttonRecipe, } from "../components/button/preset";
import { cardRecipe, } from "../components/card/preset";
import { carouselRecipe, } from "../components/carousel/preset";
import { checkboxRecipe, } from "../components/checkbox/preset";
import { clipboardRecipe, } from "../components/clipboard/preset";
import { codeBlockRecipe, } from "../components/code-block/preset";
import { contextMenuRecipe, } from "../components/context-menu/preset";
import { dataTableRecipe, } from "../components/data-table/preset";
import { dialogRecipe, } from "../components/dialog/preset";
import { dividerRecipe, } from "../components/divider/preset";
import { drawerRecipe, } from "../components/drawer/preset";
import { emptyStateRecipe, } from "../components/empty-state/preset";
import { fieldRecipe, } from "../components/field/preset";
import { floatingPanelRecipe, } from "../components/floating-panel/preset";
import { hoverCardRecipe, } from "../components/hover-card/preset";
import { iconRecipe, } from "../components/icon/preset";
import { inputRecipe, } from "../components/input/preset";
import { linkRecipe, } from "../components/link/preset";
import { listRecipe, } from "../components/list/preset";
import { mediaPlaceholderRecipe, } from "../components/media-placeholder/preset";
import { menuRecipe, } from "../components/menu/preset";
import { multiSelectRecipe, } from "../components/multi-select/preset";
import { navItemRecipe, } from "../components/nav-item/preset";
import { numberInputRecipe, } from "../components/number-input/preset";
import { paginationRecipe, } from "../components/pagination/preset";
import { pinInputRecipe, } from "../components/pin-input/preset";
import { popoverRecipe, } from "../components/popover/preset";
import { progressRingRecipe, } from "../components/progress-ring/preset";
import { progressRecipe, } from "../components/progress/preset";
import { qrCodeRecipe, } from "../components/qr-code/preset";
import { radioGroupRecipe, } from "../components/radio-group/preset";
import { radioRecipe, } from "../components/radio/preset";
import { scrollAreaRecipe, } from "../components/scroll-area/preset";
import { selectRecipe, } from "../components/select/preset";
import { sheetRecipe, } from "../components/sheet/preset";
import { sidebarItemRecipe, } from "../components/sidebar-item/preset";
import { skeletonRecipe, } from "../components/skeleton/preset";
import { sliderRecipe, } from "../components/slider/preset";
import { spinnerRecipe, } from "../components/spinner/preset";
import { splitterRecipe, } from "../components/splitter/preset";
import { statisticRecipe, } from "../components/statistic/preset";
import { statusIndicatorRecipe, } from "../components/status-indicator/preset";
import { stepRecipe, } from "../components/step/preset";
import { switchControlRecipe, } from "../components/switch/preset";
import { tabRecipe, } from "../components/tab/preset";
import { tagRecipe, } from "../components/tag/preset";
import { textareaRecipe, } from "../components/textarea/preset";
import { timelineRecipe, } from "../components/timeline/preset";
import { toastRecipe, } from "../components/toast/preset";
import { toggleGroupRecipe, } from "../components/toggle-group/preset";
import { toggleRecipe, } from "../components/toggle/preset";
import { tooltipRecipe, } from "../components/tooltip/preset";
import { topNavigationRecipe, } from "../components/top-navigation/preset";
import { tourRecipe, } from "../components/tour/preset";
import { treeItemRecipe, } from "../components/tree-item/preset";
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
            "alert",
            "toast",
            "progress",
            "progressRing",
            "emptyState",
            "statistic",
            "list",
            "timeline",
            "codeBlock",
            "clipboard",
            "dataTable",
            "scrollArea",
            "splitter",
            "mediaPlaceholder",
            "qrCode",
            "link",
            "navItem",
            "brand",
            "breadcrumbs",
            "sidebarItem",
            "topNavigation",
            "tab",
            "accordionItem",
            "menu",
            "step",
            "pagination",
            "treeItem",
            "carousel",
            "contextMenu",
            "tooltip",
            "popover",
            "hoverCard",
            "dialog",
            "alertDialog",
            "drawer",
            "sheet",
            "floatingPanel",
            "tour",
            "toggle",
            "toggleGroup",
            "textarea",
            "numberInput",
            "checkbox",
            "radio",
            "switchControl",
            "slider",
            "field",
            "select",
            "multiSelect",
            "radioGroup",
            "pinInput",
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
        expect(mergedConfig.theme?.slotRecipes?.["alert"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["toast"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["progress"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["progressRing"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["emptyState"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["statistic"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["list"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["timeline"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["codeBlock"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["clipboard"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["dataTable"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["scrollArea"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["splitter"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["mediaPlaceholder"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["qrCode"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["link"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["navItem"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["brand"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["breadcrumbs"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["sidebarItem"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["topNavigation"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["tab"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["accordionItem"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["menu"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["step"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["pagination"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["treeItem"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["carousel"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["contextMenu"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["tooltip"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["popover"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["hoverCard"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["dialog"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["alertDialog"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["drawer"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["sheet"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["floatingPanel"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["tour"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["toggle"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["toggleGroup"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["textarea"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["numberInput"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["checkbox"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["radio"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["switchControl"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["slider"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["field"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["select"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["multiSelect"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["radioGroup"]).toBeDefined();
        expect(mergedConfig.theme?.slotRecipes?.["pinInput"]).toBeDefined();
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
        expect(mergedConfig.theme?.slotRecipes?.["alert"]).toEqual(alertRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["toast"]).toEqual(toastRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["progress"]).toEqual(progressRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["progressRing"]).toEqual(progressRingRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["emptyState"]).toEqual(emptyStateRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["statistic"]).toEqual(statisticRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["list"]).toEqual(listRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["timeline"]).toEqual(timelineRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["codeBlock"]).toEqual(codeBlockRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["clipboard"]).toEqual(clipboardRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["dataTable"]).toEqual(dataTableRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["scrollArea"]).toEqual(scrollAreaRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["splitter"]).toEqual(splitterRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["mediaPlaceholder"]).toEqual(mediaPlaceholderRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["qrCode"]).toEqual(qrCodeRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["link"]).toEqual(linkRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["navItem"]).toEqual(navItemRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["brand"]).toEqual(brandRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["breadcrumbs"]).toEqual(breadcrumbsRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["sidebarItem"]).toEqual(sidebarItemRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["topNavigation"]).toEqual(topNavigationRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["tab"]).toEqual(tabRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["accordionItem"]).toEqual(accordionItemRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["menu"]).toEqual(menuRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["step"]).toEqual(stepRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["pagination"]).toEqual(paginationRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["treeItem"]).toEqual(treeItemRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["carousel"]).toEqual(carouselRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["contextMenu"]).toEqual(contextMenuRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["tooltip"]).toEqual(tooltipRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["popover"]).toEqual(popoverRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["hoverCard"]).toEqual(hoverCardRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["dialog"]).toEqual(dialogRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["alertDialog"]).toEqual(alertDialogRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["drawer"]).toEqual(drawerRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["sheet"]).toEqual(sheetRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["floatingPanel"]).toEqual(floatingPanelRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["tour"]).toEqual(tourRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["toggle"]).toEqual(toggleRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["toggleGroup"]).toEqual(toggleGroupRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["textarea"]).toEqual(textareaRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["numberInput"]).toEqual(numberInputRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["checkbox"]).toEqual(checkboxRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["radio"]).toEqual(radioRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["switchControl"]).toEqual(switchControlRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["slider"]).toEqual(sliderRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["field"]).toEqual(fieldRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["select"]).toEqual(selectRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["multiSelect"]).toEqual(multiSelectRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["radioGroup"]).toEqual(radioGroupRecipe);
        expect(mergedConfig.theme?.slotRecipes?.["pinInput"]).toEqual(pinInputRecipe);
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
            "alert",
            "toast",
            "progress",
            "progressRing",
            "emptyState",
            "statistic",
            "list",
            "timeline",
            "codeBlock",
            "clipboard",
            "dataTable",
            "scrollArea",
            "splitter",
            "mediaPlaceholder",
            "qrCode",
            "link",
            "navItem",
            "brand",
            "breadcrumbs",
            "sidebarItem",
            "topNavigation",
            "tab",
            "accordionItem",
            "menu",
            "step",
            "pagination",
            "treeItem",
            "carousel",
            "contextMenu",
            "tooltip",
            "popover",
            "hoverCard",
            "dialog",
            "alertDialog",
            "drawer",
            "sheet",
            "floatingPanel",
            "tour",
            "toggle",
            "toggleGroup",
            "textarea",
            "numberInput",
            "checkbox",
            "radio",
            "switchControl",
            "slider",
            "field",
            "select",
            "multiSelect",
            "radioGroup",
            "pinInput",
        ]);
        expect(Object.keys(reversed.slotRecipes)).toEqual([
            "pinInput",
            "radioGroup",
            "multiSelect",
            "select",
            "field",
            "slider",
            "switchControl",
            "radio",
            "checkbox",
            "numberInput",
            "textarea",
            "toggleGroup",
            "toggle",
            "tour",
            "floatingPanel",
            "sheet",
            "drawer",
            "alertDialog",
            "dialog",
            "hoverCard",
            "popover",
            "tooltip",
            "contextMenu",
            "carousel",
            "treeItem",
            "pagination",
            "step",
            "menu",
            "accordionItem",
            "tab",
            "topNavigation",
            "sidebarItem",
            "breadcrumbs",
            "brand",
            "navItem",
            "link",
            "qrCode",
            "mediaPlaceholder",
            "splitter",
            "scrollArea",
            "dataTable",
            "clipboard",
            "codeBlock",
            "timeline",
            "list",
            "statistic",
            "emptyState",
            "progressRing",
            "progress",
            "toast",
            "alert",
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
