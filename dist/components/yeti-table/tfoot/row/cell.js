import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i } from 'decorator-transforms/runtime-esm';

class TFootCell extends Component {
  static {
    g(this.prototype, "index", [tracked]);
  }
  #index = (i(this, "index"), void 0);
  get column() {
    return this.args.columns?.[this.index ?? -1];
  }
  constructor(owner, args) {
    super(owner, args);
    this.index = this.args.parent?.registerCell(this);
  }
  willDestroy() {
    super.willDestroy();
    this.args.parent?.unregisterCell(this);
  }
  static {
    setComponentTemplate(precompileTemplate("{{#if this.column.visible}}\n  <td class=\"{{@class}} {{@theme.tfootCell}}\" ...attributes>\n    {{yield}}\n  </td>\n{{/if}}", {
      strictMode: true
    }), this);
  }
}

export { TFootCell as default };
//# sourceMappingURL=cell.js.map
