import type { TemplateOnlyComponent } from '@ember/component/template-only';
import type { WithBoundArgs } from '@glint/template';
import THeadRow from './thead/row';
import type Column from './thead/row/column';
import type { ColumnParent } from './thead/row/column';
import type { ColumnDefinition, SortDirection, Theme } from '../../types.ts';
/**
  Renders a `<thead>` element and yields the row component.

  @class THead
  @yield {object} head
  @yield {Component} head.row
*/
export interface THeadSignature {
    Element: HTMLTableSectionElement;
    Args: {
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
                row: WithBoundArgs<typeof THeadRow, 'sortable' | 'sortSequence' | 'onColumnClick' | 'columns' | 'theme' | 'parent'>;
            }
        ];
    };
}
declare const THeadComponent: TemplateOnlyComponent<THeadSignature>;
export default THeadComponent;
//# sourceMappingURL=thead.d.ts.map