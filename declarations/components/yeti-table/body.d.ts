import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';
import TBodyRow from './tbody/row';
import type { ColumnDefinition, Row, RowClickHandler, Theme } from '../../types.ts';
/**
  Renders a `<tbody>` element and yields the row component, row data and index.

  @class Body
*/
export interface BodySignature {
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
            Row,
            number
        ];
    };
}
export default class Body extends Component<BodySignature> {
    handleRowClick(rowData: Row): void;
    asContent: (value: unknown) => string;
}
//# sourceMappingURL=body.d.ts.map