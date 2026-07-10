import type { TemplateOnlyComponent } from '@ember/component/template-only';
import type { Theme } from '../../types.ts';
/**
  A simple component that just renders the `<table>` element with the correct
  theme classes.

  @class Table
*/
export interface TableSignature {
    Element: HTMLTableElement;
    Args: {
        theme?: Theme;
        parent?: unknown;
    };
    Blocks: {
        default: [];
    };
}
declare const Table: TemplateOnlyComponent<TableSignature>;
export default Table;
//# sourceMappingURL=table.d.ts.map