import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import Column from './row/column.js';
import THeadCell from './row/cell.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class THeadRow extends Component {
  cells = [];
  registerCell(cell) {
    let column;
    if (cell.prop) {
      column = this.args.columns.find(c => c.prop === cell.prop);
      cell.column = column;
    } else {
      const index = this.cells.length;
      column = this.args.columns[index];
      return column;
    }
    this.cells.push(cell);
    return column;
  }
  unregisterCell(cell) {
    const cells = this.cells;
    const index = cells.indexOf(cell);
    cells.splice(index, 1);
  }
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
}

export { THeadRow as default };
//# sourceMappingURL=row.js.map
