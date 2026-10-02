import type { ComponentProps, } from "react";

import { cx, } from "@shared/styled-system/css";
import { dataTable, } from "@shared/styled-system/recipes";

export type DataTableColumn = {
    /** Stable key used to read the cell value from each row. */
    key: string;
    /** Header label; always rendered. */
    header: string;
    /** Fixed column width in px; flexible (fills the rest) when omitted. */
    width?: number;
    /** Cell alignment; `end` right-aligns. Defaults to `start`. */
    align?: "start" | "end";
    /** Text role for the column cells; defaults to `secondary`. */
    emphasis?: "primary" | "secondary";
};

export type DataTableRow = {
    /** Stable row key; the row index is used when omitted. */
    id?: string;
    /** Cell values keyed by the matching column `key`. */
    cells: Readonly<Record<string, string>>;
};

export type DataTableProps = Omit<ComponentProps<"table">, "children"> & {
    /** Column definitions, in order. */
    columns: readonly DataTableColumn[];
    /** Row data, in order. */
    rows: readonly DataTableRow[];
};

/**
 * Declarative data table. Columns and rows are typed data; the component maps
 * them onto a real `<table>` so the markup keeps native table semantics. There
 * is no sorting, selection or pagination: the Pen master's toolbar, footer and
 * leading select column are intentionally out of scope.
 */
export const DataTable = ({ columns, rows, className, ...props }: DataTableProps) => {
    const styles = dataTable();

    return (
        <table {...props} className={cx(styles.root, className)}>
            <thead className={styles.head}>
                <tr>
                    {columns.map((column) => (
                        <th
                            key={column.key}
                            scope="col"
                            className={cx(styles.headCell, column.align === "end" && styles.cellEnd)}
                            style={column.width === undefined ? undefined : { width: column.width, }}
                        >
                            {column.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <tr key={row.id ?? index} className={styles.row}>
                        {columns.map((column) => (
                            <td
                                key={column.key}
                                className={cx(
                                    styles.cell,
                                    column.emphasis === "primary" && styles.cellLead,
                                    column.align === "end" && styles.cellEnd,
                                )}
                            >
                                {row.cells[column.key] ?? ""}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
