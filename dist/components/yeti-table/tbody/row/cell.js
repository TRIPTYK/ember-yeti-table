import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { hash } from '@ember/helper';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i } from 'decorator-transforms/runtime-esm';

class TBodyCell extends Component {
  static {
    setComponentTemplate(precompileTemplate("{{#if this.column.visible}}\n  <td class=\"{{@class}} {{this.column.columnClass}} {{@theme.tbodyCell}}\" ...attributes>\n    {{yield (hash prop=this.column.prop)}}\n  </td>\n{{/if}}", {
      strictMode: true,
      scope: () => ({
        hash
      })
    }), this);
  }
  static {
    g(this.prototype, "index", [tracked]);
  }
  #index = (i(this, "index"), void 0);
  get column() {
    return this.args.columns[this.index] || {};
  }
  constructor() {
    super(...arguments);
    this.index = this.args.parent?.registerCell(this);
  }
  willDestroy() {
    super.willDestroy(...arguments);
    this.args.parent?.unregisterCell(this);
  }
}

export { TBodyCell as default };
//# sourceMappingURL=cell.js.map
