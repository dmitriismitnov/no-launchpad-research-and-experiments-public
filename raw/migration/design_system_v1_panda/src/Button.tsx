import type { ButtonHTMLAttributes, ReactNode, } from "react";
import { cx, } from "../styled-system/css";
import { button, } from "../styled-system/recipes";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    tone?: "primary" | "secondary";
    size?: "sm" | "md";
    prefixIcon?: ReactNode;
    suffixIcon?: ReactNode;
};

export function Button({
    tone = "primary",
    size = "md",
    prefixIcon,
    suffixIcon,
    children,
    className,
    ...props
}: ButtonProps) {
    const styles = button({ tone, size, });

    return (
        <button {...props} className={cx(styles.root, className)}>
            {prefixIcon && <span className={styles.prefixIcon}>{prefixIcon}</span>}
            <span className={styles.label}>{children}</span>
            {suffixIcon && <span className={styles.suffixIcon}>{suffixIcon}</span>}
        </button>
    );
}
