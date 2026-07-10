import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class THeadCell extends Component {
  // Assigned when the cell is registered
  column = undefined;
  constructor(owner, args) {
    super(owner, args);
    this.column = this.args.parent?.registerCell(this);
  }
  willDestroy() {
    super.willDestroy();
    this.args.parent?.unregisterCell(this);
  }
  get prop() {
    return this.args.prop;
  }
  static {
    setComponentTemplate(precompileTemplate("{{#if this.column.visible}}\n  <th class=\"{{@class}} {{@theme.theadCell}}\" ...attributes>\n    {{yield}}\n  </th>\n{{/if}}", {
      strictMode: true
    }), this);
  }
}

export { THeadCell as default };
//# sourceMappingURL=cell.js.map
