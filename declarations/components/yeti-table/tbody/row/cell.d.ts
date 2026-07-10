import Component from '@glimmer/component';
import type Owner from '@ember/owner';
import type { ColumnDefinition, Theme } from '../../../../types.ts';
/**
  @class TBodyCell

  Renders a `<td>` element (if its corresponding column definition has `@visible={{true}}`).
  ```hbs
  <row.cell>
    {{person.firstName}}
  </row.cell>

  If the prop name was used when the column header was defined, it is yielded in a hash
  ```hbs
  <row.cell as |column|>
    {{get person column.prop}}
  </row.cell>
  ```
*/
export interface TBodyCellParent {
    registerCell(cell: TBodyCell): number;
    unregisterCell(cell: TBodyCell): void;
}
export interface TBodyCellSignature {
    Element: HTMLTableCellElement;
    Args: {
        class?: string;
        theme?: Theme;
        parent?: TBodyCellParent;
        columns?: ColumnDefinition[];
    };
    Blocks: {
        default: [{
            prop: string | undefined;
        }];
    };
}
export default class TBodyCell extends Component<TBodyCellSignature> {
    index: number | undefined;
    get column(): ColumnDefinition;
    constructor(owner: Owner, args: TBodyCellSignature['Args']);
    willDestroy(): void;
}
//# sourceMappingURL=cell.d.ts.map