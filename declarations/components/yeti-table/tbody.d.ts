import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';
import TBodyRow from './tbody/row';
import type { ColumnDefinition, Row, RowClickHandler, Theme } from '../../types.ts';
/**
  Renders a `<tbody>` element and yields the row component and data. You must iterate each row.

  @class TBody
*/
export interface TBodySignature {
    Element: HTMLTableSectionElement;
    Args: {
        theme?: Theme;
        data?: Row[];
        columns?: ColumnDefinition[];
        onRowClick?: RowClickHandler;
    };
    Blocks: {
        default: [
            {
                row: WithBoundArgs<typeof TBodyRow, 'theme' | 'onClick' | 'columns'>;
            },
            Row[] | undefined
        ];
    };
}
export default class TBody extends Component<TBodySignature> {
}
//# sourceMappingURL=tbody.d.ts.map