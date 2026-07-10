import { action } from '@ember/object';
import Component from '@glimmer/component';
import { get, fn, hash } from '@ember/helper';
import TBodyRow from './tbody/row.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime-esm';

class Body extends Component {
  handleRowClick(rowData) {
    this.args.onRowClick?.(rowData);
  }
  static {
    n(this.prototype, "handleRowClick", [action]);
  }
  asContent = value => {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'number' || typeof value === 'boolean') {
      return String(value);
    }
    try {
      return JSON.stringify(value);
    } catch {
      return '';
    }
  };
  static {
    setComponentTemplate(precompileTemplate("<tbody class={{@theme.tbody}} ...attributes>\n  {{#if (has-block)}}\n\n    {{#each @data as |rowData index|}}\n      {{yield (hash row=(component TBodyRow theme=@theme onClick=@onRowClick columns=@columns)) rowData index}}\n    {{/each}}\n\n  {{else}}\n\n    {{#each @data as |rowData|}}\n      <TBodyRow @theme={{@theme}} @onClick={{if @onRowClick (fn this.handleRowClick rowData)}} @columns={{@columns}} as |row|>\n\n        {{#each @columns as |column|}}\n          <row.cell @class={{column.columnClass}}>\n            {{#if column.prop}}\n              {{this.asContent (get rowData column.prop)}}\n            {{else}}\n              {{this.asContent rowData}}\n            {{/if}}\n          </row.cell>\n        {{/each}}\n      </TBodyRow>\n    {{/each}}\n  {{/if}}\n</tbody>", {
      strictMode: true,
      scope: () => ({
        hash,
        TBodyRow,
        fn,
        get
      })
    }), this);
  }
}

export { Body as default };
//# sourceMappingURL=body.js.map
