import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';
import Column from './thead/row/column';
import type { ColumnParent } from './thead/row/column';
import type { ColumnDefinition, SortDirection, Theme } from '../../types.ts';
/**
  Renders a `<thead>` element and yields the column component.

  @class Header
*/
export interface HeaderSignature {
    Element: HTMLTableSectionElement;
    Args: {
        trClass?: string;
        theme?: Theme;
        sortable?: boolean;
        sortSequence?: SortDirection[] | string;
        columns?: ColumnDefinition[];
        onColumnClick?: (column: Column, e: MouseEvent) => void;
        parent?: ColumnParent;
    };
    Blocks: {
        default: [
            {
                column: WithBoundArgs<typeof Column, 'sortable' | 'sortSequence' | 'onClick' | 'parent' | 'theme'>;
            }
        ];
    };
}
export default class Header extends Component<HeaderSignature> {
    onColumnClickHeader(column: Column, e: MouseEvent): void;
}
//# sourceMappingURL=header.d.ts.map