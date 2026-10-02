import type { ComponentProps, } from "react";

import { Icon, } from "@shared/components/icon";
import { cx, } from "@shared/styled-system/css";
import { pagination, } from "@shared/styled-system/recipes";

export type PaginationProps = Omit<ComponentProps<"nav">, "children"> & {
    /** Current page, 1-based. */
    page: number;
    /** Total number of pages; at least 1. */
    totalPages: number;
    /** Called with the next page when a control is activated. */
    onPageChange?: (page: number) => void;
    /** Accessible name for the navigation landmark. */
    label?: string;
};

/**
 * Controlled pagination. It derives a windowed set of page numbers from `page`
 * and `totalPages`, marks the current page with `aria-current="page"` and keeps
 * previous/next in place but disabled at the bounds.
 */
export const Pagination = ({
    page,
    totalPages,
    onPageChange,
    label = "Pagination",
    className,
    ...props
}: PaginationProps) => {
    const styles = pagination();
    const items = buildPageItems(page, totalPages);

    const goTo = (next: number) => {
        if ( next < 1 || next > totalPages || next === page ) {
            return;
        }

        onPageChange?.(next);
    };

    return (
        <nav {...props} aria-label={label} className={cx(styles.root, className)}>
            <button
                type="button"
                className={styles.item}
                onClick={() => goTo(page - 1)}
                disabled={page <= 1}
                aria-label="Previous page"
            >
                <Icon name="chevron-left" size="sm" />
            </button>
            {items.map((item, index) =>
                item === "ellipsis"
                    ? <span key={`ellipsis-${index}`} className={styles.ellipsis} aria-hidden="true">…</span>
                    : (
                        <PageButton
                            key={item}
                            page={item}
                            current={item === page}
                            onSelect={goTo}
                        />
                    )
            )}
            <button
                type="button"
                className={styles.item}
                onClick={() => goTo(page + 1)}
                disabled={page >= totalPages}
                aria-label="Next page"
            >
                <Icon name="chevron-right" size="sm" />
            </button>
        </nav>
    );
};

type PageButtonProps = {
    page: number;
    current: boolean;
    onSelect: (page: number) => void;
};

const PageButton = ({ page, current, onSelect, }: PageButtonProps) => {
    const styles = pagination();

    if ( current ) {
        return (
            <span className={styles.itemCurrent} aria-current="page">
                {page}
            </span>
        );
    }

    return (
        <button
            type="button"
            className={styles.item}
            onClick={() => onSelect(page)}
            aria-label={`Page ${page}`}
        >
            {page}
        </button>
    );
};

type PageItem = number | "ellipsis";

/**
 * Windowed page numbers: always the first and last page, the current page and
 * its neighbours, with an ellipsis wherever a range is hidden.
 */
function buildPageItems(page: number, totalPages: number): PageItem[] {
    if ( totalPages <= 0 ) {
        return [];
    }

    const visible = new Set<number>([ 1, totalPages, page, page - 1, page + 1, ]);
    const sorted = [ ...visible, ]
        .filter((value) => value >= 1 && value <= totalPages)
        .sort((a, b) => a - b);
    const items: PageItem[] = [];
    let previous = 0;

    for ( const value of sorted ) {
        if ( previous !== 0 && value - previous > 1 ) {
            items.push("ellipsis");
        }

        items.push(value);
        previous = value;
    }

    return items;
}
