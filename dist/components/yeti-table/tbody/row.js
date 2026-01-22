import { action } from '@ember/object';
import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import TBodyCell from './row/cell.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime-esm';

class TBodyRow extends Component {
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
  /**
  * Adds a click action to the row.
  *
  * @argument onClick
  * @type Function
  */
  cells = [];
  registerCell(cell) {
    let index = this.cells.length;
    this.cells.push(cell);
    return index;
  }
  unregisterCell(cell) {
    let cells = this.cells;
    let index = cells.indexOf(cell);
    cells.splice(index, 1);
  }
  handleClick() {
    this.args.onClick?.(...arguments);
  }
  static {
    n(this.prototype, "handleClick", [action]);
  }
}

export { TBodyRow as default };
//# sourceMappingURL=row.js.map
