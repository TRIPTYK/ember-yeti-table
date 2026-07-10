import Component from '@glimmer/component';
import type Owner from '@ember/owner';
import type { ColumnDefinition, FilterFunction, SortDirection, Theme } from '../../../../types.ts';
/**
  An important component yielded from the header or head.row component that is used to define
  a column of the table.

  @class Column
*/
export interface ColumnParent {
    registerColumn(column: Column): void;
    unregisterColumn(column: Column): void;
}
export interface ColumnSignature {
    Element: HTMLTableCellElement;
    Args: {
        class?: string;
        theme?: Theme;
        prop?: string;
        visible?: boolean;
        sortable?: boolean;
        sort?: SortDirection | null;
        sortSequence?: SortDirection[] | string;
        filterable?: boolean;
        filter?: string;
        filterFunction?: FilterFunction;
        filterUsing?: unknown;
        columnClass?: string;
        name?: string;
        onClick?: (column: Column, e: MouseEvent) => void;
        parent?: ColumnParent;
    };
    Blocks: {
        default: [
            {
                isSorted: boolean;
                isAscSorted: boolean;
                isDescSorted: boolean;
            }
        ];
    };
}
export default class Column extends Component<ColumnSignature> implements ColumnDefinition {
    get prop(): string | undefined;
    visible: boolean;
    sortable: boolean;
    sort: SortDirection | null | undefined;
    filterable: boolean;
    get filter(): string | undefined;
    get filterFunction(): FilterFunction | undefined;
    get filterUsing(): unknown;
    get columnClass(): string | undefined;
    name: string | undefined;
    get isAscSorted(): boolean;
    get isDescSorted(): boolean;
    get isSorted(): boolean;
    get normalizedSortSequence(): string[];
    constructor(owner: Owner, args: ColumnSignature['Args']);
    willDestroy(): void;
    updateName: import("ember-modifier").FunctionBasedModifier<{
        Args: {
            Positional: unknown[];
            Named: import("ember-modifier/-private/signature").EmptyObject;
        };
        Element: Element;
    }>;
    handleClick(e: MouseEvent): void;
}
//# sourceMappingURL=column.d.ts.map