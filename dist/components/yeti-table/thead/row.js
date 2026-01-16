import Component from '@glimmer/component';
import Column from './row/column.js';
import THeadCell from './row/cell.js';
import { hash } from '@ember/helper';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class THeadRow extends Component {
  static {
    setComponentTemplate(precompileTemplate("<tr class=\"{{@trClass}} {{@theme.theadRow}} {{@theme.row}}\" ...attributes>\n  {{yield (hash column=(component Column sortable=@sortable sortSequence=@sortSequence onClick=@onColumnClick theme=@theme parent=@parent) cell=(component Cell theme=@theme parent=this))}}\n</tr>", {
      strictMode: true,
      scope: () => ({
        hash,
        Column,
        Cell: THeadCell
      })
    }), this);
  }
  cells = [];
  registerCell(cell) {
    let column;
    if (cell.prop) {
      column = this.args.columns.findBy('prop', cell.prop);
      cell.column = column;
    } else {
      let index = this.cells.length;
      column = this.args.columns[index];
      return column;
    }
    this.cells.push(cell);
    return column;
  }
  unregisterCell(cell) {
    let cells = this.cells;
    let index = cells.indexOf(cell);
    cells.splice(index, 1);
  }
}

export { THeadRow as default };
//# sourceMappingURL=row.js.map
