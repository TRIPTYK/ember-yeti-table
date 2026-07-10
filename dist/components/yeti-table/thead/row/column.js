import { action } from '@ember/object';
import { assert } from '@ember/debug';
import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import { localCopy } from 'tracked-toolbox';
import { on } from '@ember/modifier';
import { hash } from '@ember/helper';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime-esm';

class Column extends Component {
  get prop() {
    return this.args.prop;
  }
  static {
    g(this.prototype, "visible", [localCopy('args.visible', true)]);
  }
  #visible = (i(this, "visible"), void 0);
  static {
    g(this.prototype, "sortable", [localCopy('args.sortable', true)]);
  }
  #sortable = (i(this, "sortable"), void 0);
  static {
    g(this.prototype, "sort", [localCopy('args.sort')]);
  }
  #sort = (i(this, "sort"), void 0);
  static {
    g(this.prototype, "filterable", [localCopy('args.filterable', true)]);
  }
  #filterable = (i(this, "filterable"), void 0);
  get filter() {
    return this.args.filter;
  }
  get filterFunction() {
    return this.args.filterFunction;
  }
  get filterUsing() {
    return this.args.filterUsing;
  }
  get columnClass() {
    return this.args.columnClass;
  }
  static {
    g(this.prototype, "name", [localCopy('args.name')]);
  }
  #name = (i(this, "name"), void 0);
  get isAscSorted() {
    return this.sort === 'asc';
  }
  get isDescSorted() {
    return this.sort === 'desc';
  }
  get isSorted() {
    return this.isAscSorted || this.isDescSorted;
  }
  get normalizedSortSequence() {
    const sortSequence = this.args.sortSequence;
    assert('@sortSequence must be either a comma-separated string or an array. Got `${sortSequence}.`', Array.isArray(sortSequence) || typeof sortSequence === 'string');
    if (Array.isArray(sortSequence)) {
      return sortSequence;
    } else if (typeof sortSequence === 'string') {
      return sortSequence.split(',').map(s => s.trim());
    } else {
      return [];
    }
  }
  constructor(owner, args) {
    super(owner, args);
    this.args.parent?.registerColumn(this);
  }
  willDestroy() {
    super.willDestroy();
    this.args.parent?.unregisterColumn(this);
  }
  updateName = modifier(element => {
    if (!this.args.name) {
      this.name = element.textContent?.trim();
    }
  });
  handleClick(e) {
    if (this.sortable && this.args.onClick) {
      this.args.onClick(this, e);
    }
  }
  static {
    n(this.prototype, "handleClick", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("{{!-- template-lint-disable no-invalid-interactive --}}\n{{#if this.visible}}\n  <th role={{if this.sortable \"button\"}} class=\"{{@class}}\n      {{@theme.theadCell}}\n      {{if this.sortable @theme.sorting.columnSortable}}\n      {{if this.isSorted @theme.sorting.columnSorted}}\n      {{if this.isAscSorted @theme.sorting.columnSortedAsc}}\n      {{if this.isDescSorted @theme.sorting.columnSortedDesc}}\" {{on \"click\" this.handleClick}} {{this.updateName}} ...attributes>\n    {{yield (hash isSorted=this.isSorted isAscSorted=this.isAscSorted isDescSorted=this.isDescSorted)}}\n  </th>\n{{/if}}", {
      strictMode: true,
      scope: () => ({
        on,
        hash
      })
    }), this);
  }
}

export { Column as default };
//# sourceMappingURL=column.js.map
