import { action } from '@ember/object';
import Component from '@glimmer/component';
import Column from './thead/row/column.js';
import { hash } from '@ember/helper';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime-esm';

class Header extends Component {
  static {
    setComponentTemplate(precompileTemplate("<thead class={{@theme.thead}} ...attributes>\n  <tr class=\"{{@trClass}} {{@theme.theadRow}} {{@theme.row}}\">\n    {{yield (hash column=(component THead sortable=@sortable sortSequence=@sortSequence onClick=this.onColumnClickHeader parent=@parent theme=@theme))}}\n  </tr>\n</thead>", {
      strictMode: true,
      scope: () => ({
        hash,
        THead: Column
      })
    }), this);
  }
  onColumnClickHeader(column, e) {
    if (this.args.onColumnClick && column.sortable) {
      this.args.onColumnClick(column, e);
    }
  }
  static {
    n(this.prototype, "onColumnClickHeader", [action]);
  }
}

export { Header as default };
//# sourceMappingURL=header.js.map
