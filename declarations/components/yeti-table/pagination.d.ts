import Component from '@glimmer/component';
import type { PaginationActions, PaginationData, Theme } from '../../types.ts';
/**
  Simple pagination controls component that is included to help you get started quickly.

  @class Pagination
*/
export interface PaginationSignature {
    Element: HTMLDivElement;
    Args: {
        theme?: Theme;
        paginationData: PaginationData;
        paginationActions: PaginationActions;
        disabled?: boolean;
        pageSizes?: number[];
        showInfo?: boolean;
        showPageSizeSelector?: boolean;
        showButtons?: boolean;
    };
    Blocks: {
        default: [];
    };
}
export default class Pagination extends Component<PaginationSignature> {
    isPaginationNumberSelected: import("@ember/component/helper").FunctionBasedHelper<{
        Args: {
            Positional: [number];
            Named: object;
        };
        Return: boolean;
    }>;
    get shouldDisablePrevious(): boolean;
    get shouldDisableNext(): boolean;
    pageSizes: number[];
    showInfo: boolean;
    showPageSizeSelector: boolean;
    showButtons: boolean;
    changePageSize(ev: Event): void;
}
//# sourceMappingURL=pagination.d.ts.map