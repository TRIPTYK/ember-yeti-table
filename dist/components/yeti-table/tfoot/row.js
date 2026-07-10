import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import TFootCell from './row/cell.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class TFootRow extends Component {
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
  static {
    setComponentTemplate(precompileTemplate("<tr class=\"{{@class}} {{@theme.tfootRow}} {{@theme.row}}\" ...attributes>\n  {{yield (hash cell=(component Cell theme=@theme parent=this columns=@columns))}}\n</tr>", {
      strictMode: true,
      scope: () => ({
        hash,
        Cell: TFootCell
      })
    }), this);
  }
}

export { TFootRow as default };
//# sourceMappingURL=row.js.map
