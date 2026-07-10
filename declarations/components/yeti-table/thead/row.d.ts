import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';
import Column from './row/column';
import type { ColumnParent } from './row/column';
import Cell from './row/cell';
import type { ColumnDefinition, SortDirection, Theme } from '../../../types.ts';
/**
  Renders a `<tr>` element and yields the column and cell component.
  ```hbs
  <table.thead as |head|>
    <head.row as |row|>
      <row.column @prop="firstName" as |column|>
        First name
        {{if column.isAscSorted "(sorted asc)"}}
        {{if column.isDescSorted "(sorted desc)"}}
      </row.column>
    </head.row>
  </table.thead>
  ```

  @class THeadRow
  @yield {Component} column
  @yield {Component} cell
*/
interface THeadCellLike {
    prop?: string;
    column?: ColumnDefinition;
}
export interface THeadRowSignature {
    Element: HTMLTableRowElement;
    Args: {
        trClass?: string;
        theme?: Theme;
        sortable?: boolean;
        sortSequence?: SortDirection[] | string;
        onColumnClick?: (column: Column, e: MouseEvent) => void;
        columns: ColumnDefinition[];
        parent?: ColumnParent;
    };
    Blocks: {
        default: [
            {
                column: WithBoundArgs<typeof Column, 'sortable' | 'sortSequence' | 'onClick' | 'theme' | 'parent'>;
                cell: WithBoundArgs<typeof Cell, 'theme' | 'parent'>;
            }
        ];
    };
}
export default class THeadRow extends Component<THeadRowSignature> {
    cells: THeadCellLike[];
    registerCell(cell: THeadCellLike): ColumnDefinition | undefined;
    unregisterCell(cell: THeadCellLike): void;
}
export {};
//# sourceMappingURL=row.d.ts.map