import type { ButtonHTMLAttributes, ReactNode, } from "react";

import { cx, } from "@shared/styled-system/css";
import { button, } from "@shared/styled-system/recipes";

export type ButtonTone = "primary" | "secondary" | "ghost" | "icon";
export type ButtonSize = "sm" | "md";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    tone?: ButtonTone;
    size?: ButtonSize;
    prefixIcon?: ReactNode;
    suffixIcon?: ReactNode;
};

export const Button = ({
    tone = "primary",
    size = "md",
    prefixIcon,
    suffixIcon,
    children,
    className,
    ...props
}: ButtonProps) => {
    const styles = button({ tone, size, });

    return (
        <button {...props} className={cx(styles.root, className)}>
            {prefixIcon != null && <span className={styles.prefixIcon}>{prefixIcon}</span>}
            {children != null && <span className={styles.label}>{children}</span>}
            {suffixIcon != null && <span className={styles.suffixIcon}>{suffixIcon}</span>}
        </button>
    );
};
