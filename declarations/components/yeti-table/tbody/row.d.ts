import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';
import Cell from './row/cell';
import type { ColumnDefinition, RowClickHandler, Theme } from '../../../types.ts';
/**
  Renders a `<tr>` element and yields the cell component.

  @class TBodyRow
  @yield {object} row
  @yield {Component} row.cell - the cell component
*/
interface TBodyCellLike {
    index?: number;
}
export interface TBodyRowSignature {
    Element: HTMLTableRowElement;
    Args: {
        theme?: Theme;
        columns?: ColumnDefinition[];
        onClick?: RowClickHandler;
    };
    Blocks: {
        default: [
            {
                cell: WithBoundArgs<typeof Cell, 'theme' | 'parent' | 'columns'>;
            }
        ];
    };
}
export default class TBodyRow extends Component<TBodyRowSignature> {
    cells: TBodyCellLike[];
    registerCell(cell: TBodyCellLike): number;
    unregisterCell(cell: TBodyCellLike): void;
    handleClick(event: MouseEvent): void;
}
export {};
//# sourceMappingURL=row.d.ts.map