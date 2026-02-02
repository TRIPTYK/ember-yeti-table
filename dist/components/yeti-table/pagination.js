import { action } from '@ember/object';
import { helper } from '@ember/component/helper';
import Component from '@glimmer/component';
import { localCopy } from 'tracked-toolbox';
import { on } from '@ember/modifier';
import { guidFor } from '@ember/object/internals';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime-esm';

class Pagination extends Component {
  guid = guidFor(this);
  static {
    setComponentTemplate(precompileTemplate("<div class={{@theme.pagination.controls}} ...attributes>\n  {{#if this.showInfo}}\n    <div class={{@theme.pagination.info}}>\n      Showing\n      {{@paginationData.pageStart}}\n      to\n      {{@paginationData.pageEnd}}\n      of\n      {{@paginationData.totalRows}}\n      entries\n    </div>\n  {{/if}}\n\n  {{#if this.showPageSizeSelector}}\n    <div class={{@theme.pagination.pageSize}}>\n      <label for=\"page-size-select-{{this.guid}}\">Rows per page:</label>\n      <select id=\"page-size-select-{{this.guid}}\" disabled={{@disabled}} {{on \"change\" this.changePageSize}}>\n        {{#each this.pageSizes as |pageSize|}}\n          <option value={{pageSize}} selected={{this.isPaginationNumberSelected pageSize}}>{{pageSize}}</option>\n        {{/each}}\n      </select>\n    </div>\n  {{/if}}\n\n  {{#if this.showButtons}}\n    <button type=\"button\" class={{@theme.pagination.previous}} disabled={{this.shouldDisablePrevious}} {{on \"click\" @paginationActions.previousPage}}>\n      Previous\n    </button>\n\n    <button type=\"button\" class={{@theme.pagination.next}} disabled={{this.shouldDisableNext}} {{on \"click\" @paginationActions.nextPage}}>\n      Next\n    </button>\n  {{/if}}\n</div>", {
      strictMode: true,
      scope: () => ({
        on
      })
    }), this);
  }
  // theme;
  // paginationData;
  // paginationActions;
  // disabled;
  // helper function used, needed while working with ember <= 4.4. Works without helper function in ember > 4.4
  isPaginationNumberSelected = helper(([number]) => {
    return number === this.args.paginationData.pageSize;
  });
  get shouldDisablePrevious() {
    return this.args.paginationData.isFirstPage || this.args.disabled;
  }
  get shouldDisableNext() {
    return this.args.paginationData.isLastPage || this.args.disabled;
  }
  /**
  * Array of page sizes to populate the page size `<select>`.
  * Particularly useful with an array helper, e.g `@pageSizes={{array 10 12 23 50 100}}`
  * Defaults to `[10, 15, 20, 25]`.
  *
  * @argument pageSizes
  * @type {Number}
  */
  static {
    g(this.prototype, "pageSizes", [localCopy('args.pageSizes', [10, 15, 20, 25])]);
  }
  #pageSizes = (i(this, "pageSizes"), void 0);
  static {
    g(this.prototype, "showInfo", [localCopy('args.showInfo', true)]);
  }
  #showInfo = (i(this, "showInfo"), void 0);
  /**
  * Used to show/hide some textual information about the current page. Defaults to `true`.
  *
  * @argument showInfo
  * @type {Boolean}
  */
  static {
    g(this.prototype, "showPageSizeSelector", [localCopy('args.showPageSizeSelector', true)]);
  }
  #showPageSizeSelector = (i(this, "showPageSizeSelector"), void 0);
  /**
  * Used to show/hide the page size selector. Defaults to `true`.
  *
  * @argument showPageSizeSelector
  * @type {Boolean}
  */
  static {
    g(this.prototype, "showButtons", [localCopy('args.showButtons', true)]);
  }
  #showButtons = (i(this, "showButtons"), void 0);
  /**
  * Used to show/hide the previous and next page buttons. Defaults to `true`.
  *
  * @argument showButtons
  * @type {Boolean}
  */
  changePageSize(ev) {
    this.args.paginationActions.changePageSize(ev.target.value);
  }
  static {
    n(this.prototype, "changePageSize", [action]);
  }
}

export { Pagination as default };
//# sourceMappingURL=pagination.js.map
