import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { FileUpload, } from "./file-upload";

describe("FileUpload composition", () => {
    test("renders a labelled dropzone over a native file input", () => {
        const markup = renderToStaticMarkup(
            <FileUpload
                title="Drop files here"
                description="or browse — PNG, SVG up to 10 MB"
                multiple
                accept="image/png"
                name="assets"
            />,
        );

        expect(markup).toContain("<label");
        expect(markup).toContain('type="file"');
        expect(markup).toContain('name="assets"');
        expect(markup).toContain('accept="image/png"');
        expect(markup).toContain("multiple");
        expect(markup).toContain("Drop files here");
        expect(markup).toContain("or browse — PNG, SVG up to 10 MB");
        expect(markup).toContain("fileUpload__icon");
        expect(markup).toContain("fileUpload__root");
    });

    test("hides the input visually instead of removing it", () => {
        const markup = renderToStaticMarkup(<FileUpload />);

        expect(markup).toContain("fileUpload__input");
        expect(markup).toContain('type="file"');
    });

    test("shows the hint and hides it when an error is shown", () => {
        const withHint = renderToStaticMarkup(<FileUpload hint="До 10 МБ." />);
        const withError = renderToStaticMarkup(
            <FileUpload invalid hint="До 10 МБ." error="Файл слишком большой." />,
        );

        expect(withHint).toContain("До 10 МБ.");
        expect(withHint).toContain('aria-describedby="');
        expect(withError).toContain("Файл слишком большой.");
        expect(withError).not.toContain("До 10 МБ.");
    });

    test("invalid sets aria-invalid on the input", () => {
        const markup = renderToStaticMarkup(
            <FileUpload id="assets" invalid error="Файл слишком большой." />,
        );

        expect(markup).toContain('aria-invalid="true"');
        expect(markup).toContain('id="assets-error"');
        expect(markup).toContain('aria-describedby="assets-error"');
    });

    test("disabled marks the native input and the dropzone", () => {
        const markup = renderToStaticMarkup(<FileUpload disabled />);

        expect(markup).toContain("disabled");
        expect(markup).toContain("fileUpload__root--disabled_true");
    });

    test("renders no count before any file is chosen", () => {
        const markup = renderToStaticMarkup(<FileUpload />);

        expect(markup).not.toContain("selected");
        expect(markup).not.toContain("fileUpload__count");
    });

    test("renders an external uploading state with a labelled progressbar", () => {
        const markup = renderToStaticMarkup(
            <FileUpload
                status="uploading"
                progress={42}
                fileName="logo.png"
                statusMessage="Загрузка…"
            />,
        );

        expect(markup).toContain('role="progressbar"');
        expect(markup).toContain('aria-valuenow="42"');
        expect(markup).toContain('aria-valuemin="0"');
        expect(markup).toContain('aria-valuemax="100"');
        expect(markup).toContain('role="status"');
        expect(markup).toContain("logo.png");
        expect(markup).toContain("Загрузка…");
    });

    test("clamps the external progress into 0..100", () => {
        const high = renderToStaticMarkup(<FileUpload status="uploading" progress={140} />);
        const low = renderToStaticMarkup(<FileUpload status="uploading" progress={-5} />);
        const none = renderToStaticMarkup(<FileUpload status="uploading" />);

        expect(high).toContain('aria-valuenow="100"');
        expect(low).toContain('aria-valuenow="0"');
        expect(none).toContain('aria-valuenow="0"');
    });

    test("renders a complete state with the file name and no progressbar", () => {
        const markup = renderToStaticMarkup(
            <FileUpload status="complete" fileName="logo.png" statusMessage="Готово" />,
        );

        expect(markup).toContain("logo.png");
        expect(markup).toContain("Готово");
        expect(markup).not.toContain('role="progressbar"');
    });

    test("renders an error status as a negative border with the text reason", () => {
        const markup = renderToStaticMarkup(
            <FileUpload id="assets" status="error" statusMessage="Файл слишком большой." />,
        );

        expect(markup).toContain("fileUpload__root--invalid_true");
        expect(markup).toContain("Файл слишком большой.");
        expect(markup).toContain('aria-describedby="assets-error"');
        expect(markup).toContain('id="assets-error"');
    });

    test("keeps the dropzone root across every external status", () => {
        for ( const status of [ "idle", "uploading", "complete", "error", ] as const ) {
            const markup = renderToStaticMarkup(<FileUpload status={status} />);

            expect(markup).toContain("fileUpload__root");
            expect(markup).toContain('type="file"');
        }
    });

    test("merges className with the dropzone class, not replacing it", () => {
        const markup = renderToStaticMarkup(<FileUpload className="my-dropzone" />);

        expect(markup).toContain("my-dropzone");
        expect(markup).toContain("fileUpload__root");
    });
});
