import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

/**
  A simple component that just renders the `<table>` element with the correct
  theme classes.

  @class Table
*/
const Table = setComponentTemplate(precompileTemplate("<table class={{@theme.table}} ...attributes>\n  {{yield}}\n</table>", {
  strictMode: true
}), templateOnly());

export { Table as default };
//# sourceMappingURL=table.js.map
