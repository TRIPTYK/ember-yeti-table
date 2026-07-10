import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import TBodyRow from './tbody/row.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
class TBody extends Component {
  static {
    setComponentTemplate(precompileTemplate("<tbody class={{@theme.tbody}} ...attributes>\n  {{yield (hash row=(component TBodyRow theme=@theme onClick=@onRowClick columns=@columns)) @data}}\n</tbody>", {
      strictMode: true,
      scope: () => ({
        hash,
        TBodyRow
      })
    }), this);
  }
}

export { TBody as default };
//# sourceMappingURL=tbody.js.map
