/**
 * Regular scale used by `spacing` and `sizes`.
 * `xN` is a scale index, not a pixel value: xN = N * 0.125rem (2px at a 16px root).
 */
export const SCALE_STEP_REM = 0.125;

export const createScale = (indices: readonly number[]) =>
    Object.fromEntries(
        indices.map((index) => [
            `x${index}`,
            { value: `${Number(( index * SCALE_STEP_REM ).toFixed(3))}rem`, },
        ]),
    );
