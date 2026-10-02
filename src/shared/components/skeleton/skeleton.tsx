import type { ComponentProps, } from "react";

import { cx, } from "@shared/styled-system/css";
import { skeleton, } from "@shared/styled-system/recipes";

export type SkeletonProps = ComponentProps<"div">;

/**
 * Decorative placeholder. It is hidden from assistive technology and owns only
 * the muted surface; size is set by the consumer through `className` / `style`.
 */
export const Skeleton = ({ className, ...props }: SkeletonProps) => (
    <div aria-hidden="true" {...props} className={cx(skeleton(), className)} />
);
