import { action } from '@ember/object';
import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import TBodyCell from './row/cell.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime-esm';

class TBodyRow extends Component {
  cells = [];
  registerCell(cell) {
    const index = this.cells.length;
    this.cells.push(cell);
    return index;
  }
  unregisterCell(cell) {
    const cells = this.cells;
    const index = cells.indexOf(cell);
    cells.splice(index, 1);
  }
  handleClick(event) {
    this.args.onClick?.(event);
  }
  static {
    n(this.prototype, "handleClick", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("{{!-- template-lint-disable no-invalid-interactive --}}\n<tr class=\"{{@theme.tbodyRow}} {{@theme.row}}\" {{on \"click\" this.handleClick}} role={{if @onClick \"button\"}} ...attributes>\n  {{yield (hash cell=(component Cell theme=@theme parent=this columns=@columns))}}\n</tr>", {
      strictMode: true,
      scope: () => ({
        on,
        hash,
        Cell: TBodyCell
      })
    }), this);
  }
}

export { TBodyRow as default };
//# sourceMappingURL=row.js.map
