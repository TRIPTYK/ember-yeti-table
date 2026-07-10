import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';
import TFootRow from './tfoot/row';
import type { ColumnDefinition, Theme } from '../../types.ts';
/**
  Renders a `<tfoot>` element and yields the row component.

  @class TTFoot
*/
export interface TFootSignature {
    Element: HTMLTableSectionElement;
    Args: {
        theme?: Theme;
        columns?: ColumnDefinition[];
        parent?: unknown;
    };
    Blocks: {
        default: [
            {
                row: WithBoundArgs<typeof TFootRow, 'columns' | 'theme' | 'parent'>;
            }
        ];
    };
}
export default class TFoot extends Component<TFootSignature> {
}
//# sourceMappingURL=tfoot.d.ts.map