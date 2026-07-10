import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';
import Cell from './row/cell';
import type { ColumnDefinition, Theme } from '../../../types.ts';
/**
  Renders a `<tr>` element and yields cell component.

  @class TFootRow
  @yield {object} row
  @yield {Component} row.cell
*/
interface TFootCellLike {
    index?: number;
}
export interface TFootRowSignature {
    Element: HTMLTableRowElement;
    Args: {
        class?: string;
        theme?: Theme;
        columns?: ColumnDefinition[];
        parent?: unknown;
    };
    Blocks: {
        default: [
            {
                cell: WithBoundArgs<typeof Cell, 'theme' | 'parent' | 'columns'>;
            }
        ];
    };
}
export default class TFootRow extends Component<TFootRowSignature> {
    cells: TFootCellLike[];
    registerCell(cell: TFootCellLike): number;
    unregisterCell(cell: TFootCellLike): void;
}
export {};
//# sourceMappingURL=row.d.ts.map