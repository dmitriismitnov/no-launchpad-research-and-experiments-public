import { expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Playground, } from "./Card.stories";

test("Playground maps section controls to Card's nested props", () => {
    const render = Playground.render;

    if ( render === undefined ) {
        throw new Error("Playground must define a render function");
    }

    const markup = renderToStaticMarkup(render({
        title: "Pressure sensors",
        description: "Supporting description",
        useSuppliedMedia: true,
        mediaSrc: "/pressure-gauge.png",
        mediaAlt: "Pressure gauge",
        showHeader: true,
        headerLabel: "01",
        headerIcon: "gauge",
        showFooter: true,
        footerPrimaryNote: "0…400 бар",
        footerSecondaryNote: "4…20 мА",
        showAction: true,
        actionLabel: "Details",
        actionTone: "secondary",
        actionSize: "md",
    }, {} as never));

    expect(markup).toContain('src="/pressure-gauge.png"');
    expect(markup).toContain('alt="Pressure gauge"');
    expect(markup).toContain("01");
    expect(markup).toContain("0…400 бар");
    expect(markup).toContain("4…20 мА");
    expect(markup).toContain("Details");
    expect(markup).toContain("button__root--tone_secondary");
    expect(markup).toContain("button__root--size_md");
});

test("Playground removes disabled sections from Card", () => {
    const render = Playground.render;

    if ( render === undefined ) {
        throw new Error("Playground must define a render function");
    }

    const markup = renderToStaticMarkup(render({
        title: "Pressure sensors",
        description: "Supporting description",
        useSuppliedMedia: false,
        mediaSrc: "/pressure-gauge.png",
        mediaAlt: "Pressure gauge",
        showHeader: false,
        headerLabel: "01",
        headerIcon: "gauge",
        showFooter: false,
        footerPrimaryNote: "0…400 бар",
        footerSecondaryNote: "4…20 мА",
        showAction: false,
        actionLabel: "Details",
        actionTone: "primary",
        actionSize: "sm",
    }, {} as never));

    expect(markup).toContain('aria-hidden="true"');
    expect(markup).not.toContain('alt="Pressure gauge"');
    expect(markup).not.toContain("card__header");
    expect(markup).not.toContain("card__footer");
    expect(markup).not.toContain("<button");
});
