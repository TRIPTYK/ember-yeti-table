import Component from '@glimmer/component';
import type Owner from '@ember/owner';
import Table from './yeti-table/table';
import HeaderComponent from './yeti-table/header';
import THead from './yeti-table/thead';
import Body from './yeti-table/body';
import TBody from './yeti-table/tbody';
import TFoot from './yeti-table/tfoot';
import Pagination from './yeti-table/pagination';
import type Column from './yeti-table/thead/row/column';
import type { LoadDataParams, PaginationData, Row, RowFilterFunction, SortDirection, Theme } from '../types.ts';
import type { Comparator } from '../utils/sorting-utils.ts';
import type { WithBoundArgs } from '@glint/template';
export type YetiTableLoadData = (params: LoadDataParams) => Row[] | Promise<Row[]>;
export interface YetiTableSignature {
    Element: HTMLElement;
    Args: {
        data?: Row[] | Promise<Row[]>;
        loadData?: YetiTableLoadData;
        theme?: Partial<Theme>;
        pagination?: boolean;
        pageSize?: number;
        pageNumber?: number;
        totalRows?: number;
        filter?: string;
        filterFunction?: RowFilterFunction;
        filterUsing?: unknown;
        sortable?: boolean;
        sortFunction?: (itemA: Row, itemB: Row, sorts: {
            prop: string;
            direction: SortDirection;
        }[], compareFn: Comparator) => number;
        compareFunction?: Comparator;
        sortSequence?: SortDirection[] | string;
        ignoreDataChanges?: boolean;
        renderTableElement?: boolean;
        isColumnVisible?: (column: Column) => boolean;
        registerApi?: (api: YetiTable['publicApi']) => void;
    };
    Blocks: {
        default: [
            {
                table: WithBoundArgs<typeof Table, 'theme' | 'parent'>;
                header: WithBoundArgs<typeof HeaderComponent, 'columns' | 'onColumnClick' | 'sortable' | 'sortSequence' | 'parent' | 'theme'>;
                thead: WithBoundArgs<typeof THead, 'columns' | 'onColumnClick' | 'sortable' | 'sortSequence' | 'theme' | 'parent'>;
                body: WithBoundArgs<typeof Body, 'data' | 'columns' | 'theme'>;
                tbody: WithBoundArgs<typeof TBody, 'data' | 'columns' | 'theme'>;
                tfoot: WithBoundArgs<typeof TFoot, 'columns' | 'theme' | 'parent'>;
                pagination: WithBoundArgs<typeof Pagination, 'disabled' | 'theme' | 'paginationData' | 'paginationActions'>;
                actions: YetiTable['publicApi'];
                paginationData: PaginationData;
                isLoading: boolean;
                columns: Column[];
                visibleColumns: Column[];
                rows: Row[] | undefined;
                totalRows: number;
                visibleRows: Row[] | undefined;
                theme: Theme;
            }
        ];
    };
}
export default class YetiTable extends Component<YetiTableSignature> {
    publicApi: {
        previousPage: () => void;
        nextPage: () => void;
        goToPage: (n: number) => void;
        changePageSize: (n: number | string) => void;
        reloadData: () => Promise<unknown>;
    };
    pagination: boolean;
    pageSize: number;
    pageNumber: number;
    totalRows: number | undefined;
    filter: string;
    sortable: boolean;
    sortFunction: YetiTableSignature['Args']['sortFunction'];
    compareFunction: Comparator;
    sortSequence: SortDirection[] | string;
    ignoreDataChanges: boolean;
    renderTableElement: boolean;
    get mergedTheme(): Theme;
    get visibleColumns(): Column[];
    config: Record<string, unknown>;
    get normalizedTotalRows(): number;
    get normalizedRows(): Row[] | undefined;
    get paginationData(): PaginationData;
    columns: Column[];
    previousResolvedData: Row[];
    processedData: Row[] | undefined;
    processedDataRows: Row[] | undefined;
    resolvedData: import("reactiveweb/function").State<Promise<Row[] | undefined>>;
    latestData: Row[];
    constructor(owner: Owner, args: YetiTableSignature['Args']);
    processData(data: Row[]): void;
    computeLoadDataParams(): LoadDataParams;
    paginateData(data: Row[]): Row[];
    reloadData(): Promise<unknown>;
    onColumnSort(column: Column, e: MouseEvent): void;
    previousPage(): void;
    nextPage(): void;
    goToPage(pageNumber: number): void;
    changePageSize(pageSize: number | string): void;
    registerColumn(column: Column): void;
    unregisterColumn(column: Column): void;
}
//# sourceMappingURL=yeti-table.d.ts.map