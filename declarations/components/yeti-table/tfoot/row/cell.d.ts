import Component from '@glimmer/component';
import type Owner from '@ember/owner';
import type { ColumnDefinition, Theme } from '../../../../types.ts';
/**
  Renders a `<td>` element and yields for the developer to supply content.

  ```hbs
  <table.tfoot as |foot|>
    <foot.row as |row|>
      <row.cell>
        Footer content
      </row.cell>
    </foot.row>
  </table.tfoot>
  ```
  @class TFootCell
 */
export interface TFootCellParent {
    registerCell(cell: TFootCell): number;
    unregisterCell(cell: TFootCell): void;
}
export interface TFootCellSignature {
    Element: HTMLTableCellElement;
    Args: {
        class?: string;
        theme?: Theme;
        parent?: TFootCellParent;
        columns?: ColumnDefinition[];
    };
    Blocks: {
        default: [];
    };
}
export default class TFootCell extends Component<TFootCellSignature> {
    index: number | undefined;
    get column(): ColumnDefinition | undefined;
    constructor(owner: Owner, args: TFootCellSignature['Args']);
    willDestroy(): void;
}
//# sourceMappingURL=cell.d.ts.map