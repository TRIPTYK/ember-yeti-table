import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class THeadCell extends Component {
  static {
    setComponentTemplate(precompileTemplate("{{#if this.column.visible}}\n  <th class=\"{{@class}} {{@theme.theadCell}}\" ...attributes>\n    {{yield}}\n  </th>\n{{/if}}", {
      strictMode: true
    }), this);
  }
  // Assigned when the cell is registered
  column = undefined;
  constructor() {
    super(...arguments);
    this.column = this.args.parent?.registerCell(this);
  }
  willDestroy() {
    super.willDestroy(...arguments);
    this.args.parent?.unregisterCell(this);
  }
}

export { THeadCell as default };
//# sourceMappingURL=cell.js.map
