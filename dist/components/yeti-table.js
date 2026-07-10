import { getOwner } from '@ember/application';
import { action, notifyPropertyChange } from '@ember/object';
import { scheduleOnce, later, schedule } from '@ember/runloop';
import { isPresent, isEmpty } from '@ember/utils';
import Component from '@glimmer/component';
import { cached, tracked } from '@glimmer/tracking';
import Helper from '@ember/component/helper';
import merge from 'deepmerge';
import { use } from 'ember-resources';
import { trackedFunction } from 'reactiveweb/function';
import { keepLatest } from 'reactiveweb/keep-latest';
import { localCopy, dedupeTracked } from 'tracked-toolbox';
import { hash } from '@ember/helper';
import defaultTheme from '../themes/default-theme.js';
import filterData from '../utils/filtering-utils.js';
import { sortMultiple, compareValues, mergeSort } from '../utils/sorting-utils.js';
import Table from './yeti-table/table.js';
import Header from './yeti-table/header.js';
import THeadComponent from './yeti-table/thead.js';
import Body from './yeti-table/body.js';
import TBody from './yeti-table/tbody.js';
import TFoot from './yeti-table/tfoot.js';
import Pagination from './yeti-table/pagination.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime-esm';

const TASK_CANCELATION_NAME = 'TaskCancelation';
const didCancel = function (e) {
  return !!e && e.name === TASK_CANCELATION_NAME;
};
function getConfigWithDefault(key, defaultValue) {
  return function () {
    return this.config[key] ?? defaultValue;
  };
}
class UpdateTotalRows extends Helper {
  compute(positional, {
    context
  }) {
    context.totalRows = positional[0];
    notifyPropertyChange(context, 'normalizedTotalRows');
    notifyPropertyChange(context, 'paginationData');
    return '';
  }
}
class UpdateFilter extends Helper {
  compute(positional, {
    context
  }) {
    context.filter = positional[0] || '';
    return '';
  }
}
class ProcessedData extends Helper {
  compute(_positional, {
    loadData,
    context
  }) {
    const data = context.latestData ?? [];
    if (!loadData) {
      context.processData(data);
    } else {
      context.processedData = data;
    }
    return '';
  }
}
class YetiTable extends Component {
  publicApi = {
    previousPage: () => this.previousPage(),
    nextPage: () => this.nextPage(),
    goToPage: n => this.goToPage(n),
    changePageSize: n => this.changePageSize(n),
    reloadData: () => this.reloadData()
  };
  static {
    g(this.prototype, "pagination", [localCopy('args.pagination', getConfigWithDefault('pagination', false))]);
  }
  #pagination = (i(this, "pagination"), void 0);
  static {
    g(this.prototype, "pageSize", [localCopy('args.pageSize', getConfigWithDefault('pageSize', 15))]);
  }
  #pageSize = (i(this, "pageSize"), void 0);
  static {
    g(this.prototype, "pageNumber", [localCopy('args.pageNumber', 1)]);
  }
  #pageNumber = (i(this, "pageNumber"), void 0);
  totalRows;
  static {
    g(this.prototype, "filter", [dedupeTracked], function () {
      return '';
    });
  }
  #filter = (i(this, "filter"), void 0);
  static {
    g(this.prototype, "sortable", [localCopy('args.sortable', getConfigWithDefault('sortable', true))]);
  }
  #sortable = (i(this, "sortable"), void 0);
  static {
    g(this.prototype, "sortFunction", [localCopy('args.sortFunction', () => sortMultiple)]);
  }
  #sortFunction = (i(this, "sortFunction"), void 0);
  static {
    g(this.prototype, "compareFunction", [localCopy('args.compareFunction', () => compareValues)]);
  }
  #compareFunction = (i(this, "compareFunction"), void 0);
  static {
    g(this.prototype, "sortSequence", [localCopy('args.sortSequence', getConfigWithDefault('sortSequence', ['asc', 'desc']))]);
  }
  #sortSequence = (i(this, "sortSequence"), void 0);
  static {
    g(this.prototype, "ignoreDataChanges", [localCopy('args.ignoreDataChanges', getConfigWithDefault('ignoreDataChanges', false))]);
  }
  #ignoreDataChanges = (i(this, "ignoreDataChanges"), void 0);
  static {
    g(this.prototype, "renderTableElement", [localCopy('args.renderTableElement', true)]);
  }
  #renderTableElement = (i(this, "renderTableElement"), void 0);
  get mergedTheme() {
    const configTheme = this.config.theme || {};
    const localTheme = this.args.theme || {};
    return merge.all([defaultTheme, configTheme, localTheme]);
  }
  static {
    n(this.prototype, "mergedTheme", [cached]);
  }
  get visibleColumns() {
    return this.columns.filter(c => c.visible === true);
  }
  static {
    n(this.prototype, "visibleColumns", [cached]);
  }
  config = getOwner(this)?.resolveRegistration?.('config:environment')?.['ember-yeti-table'] || {};
  get normalizedTotalRows() {
    if (!this.args.loadData) {
      return this.processedDataRows?.length || 0;
    } else {
      if (this.totalRows === undefined) {
        return this.previousResolvedData.length || 0;
      } else {
        return this.totalRows;
      }
    }
  }
  get normalizedRows() {
    if (!this.args.loadData) {
      return this.processedDataRows;
    } else {
      return this.processedData;
    }
  }
  get paginationData() {
    const pageSize = this.pageSize;
    let pageNumber = this.pageNumber;
    const totalRows = this.normalizedTotalRows;
    let isLastPage;
    let totalPages;
    if (totalRows) {
      totalPages = Math.ceil(totalRows / pageSize);
      pageNumber = Math.min(pageNumber, totalPages);
      isLastPage = pageNumber === totalPages;
    }
    const isFirstPage = pageNumber === 1;
    const pageStart = (pageNumber - 1) * pageSize + 1;
    let pageEnd = pageStart + pageSize - 1;
    if (totalRows) {
      pageEnd = Math.min(pageEnd, totalRows);
    }
    return {
      pageSize,
      pageNumber,
      pageStart,
      pageEnd,
      isFirstPage,
      isLastPage,
      totalRows,
      totalPages
    };
  }
  static {
    g(this.prototype, "columns", [tracked], function () {
      return [];
    });
  }
  #columns = (i(this, "columns"), void 0);
  previousResolvedData = [];
  static {
    g(this.prototype, "processedData", [tracked]);
  }
  #processedData = (i(this, "processedData"), void 0);
  static {
    g(this.prototype, "processedDataRows", [tracked]);
  }
  #processedDataRows = (i(this, "processedDataRows"), void 0);
  resolvedData = trackedFunction(this, async () => {
    let data = this.args.data;
    if (this.columns.length == 0) {
      if (typeof this.args.loadData === 'function') {
        return this.previousResolvedData;
      }
      return [];
    }
    if (typeof this.args.loadData === 'function') {
      const params = this.computeLoadDataParams();
      try {
        data = await this.args.loadData(params);
      } catch (e) {
        console.log(e);
        if (!didCancel(e)) {
          throw e;
        }
      }
    } else if (data && typeof data.then === 'function') {
      data = await data;
    }
    if (this.isDestroyed) {
      return;
    }
    const resolved = data || [];
    this.previousResolvedData = resolved;
    return resolved;
  });
  static {
    g(this.prototype, "latestData", [use], function () {
      return keepLatest({
        value: () => this.resolvedData.value ?? [],
        when: () => this.resolvedData.isPending
      });
    });
  }
  #latestData = (i(this, "latestData"), void 0);
  constructor(owner, args) {
    super(owner, args);
    if (typeof this.args.registerApi === 'function') {
      // eslint-disable-next-line ember/no-runloop
      scheduleOnce('actions', null, this.args.registerApi, this.publicApi);
    }
  }
  processData(data) {
    const columns = this.columns.filter(c => c.filterable && isPresent(c.prop));
    const sortableColumns = this.columns.filter(c => !isEmpty(c.sort));
    const sortings = sortableColumns.map(c => ({
      prop: c.prop,
      direction: c.sort
    }));
    const filterFunction = this.args.filterFunction;
    const filterUsing = this.args.filterUsing;
    const filter = this.filter;
    const processTheData = () => {
      let working = filterData(data, columns, filter, filterFunction, filterUsing);
      if (sortings.length > 0) {
        working = mergeSort(working, (itemA, itemB) => {
          return this.sortFunction(itemA, itemB, sortings, this.compareFunction);
        });
      }
      this.processedDataRows = working;
      if (this.pagination) {
        const {
          pageStart,
          pageEnd
        } = this.paginationData;
        working = working.slice(pageStart - 1, pageEnd);
      }
      this.processedData = working;
    };
    if (this.ignoreDataChanges) {
      // eslint-disable-next-line ember/no-runloop
      later(processTheData, 0);
    } else {
      processTheData();
    }
  }
  computeLoadDataParams() {
    const params = {
      sortData: this.columns.filter(c => !isEmpty(c.sort)).map(c => ({
        prop: c.prop,
        direction: c.sort
      })),
      filterData: {
        filter: this.filter,
        filterUsing: this.args.filterUsing,
        columnFilters: this.columns.map(c => ({
          prop: c.prop,
          filter: c.filter,
          filterUsing: c.filterUsing
        }))
      }
    };
    if (this.pagination) {
      params.paginationData = this.paginationData;
    }
    return params;
  }
  paginateData(data) {
    if (this.pagination) {
      const {
        pageStart,
        pageEnd
      } = this.paginationData;
      data = data.slice(pageStart - 1, pageEnd);
    }
    return data;
  }
  async reloadData() {
    return await this.resolvedData.retry();
  }
  static {
    n(this.prototype, "reloadData", [action]);
  }
  onColumnSort(column, e) {
    if (column.isSorted) {
      let direction = column.sort;
      const sortSequence = column.normalizedSortSequence;
      direction = sortSequence[(sortSequence.indexOf(direction) + 1) % sortSequence.length];
      if (direction === 'unsorted') {
        direction = null;
      }
      column.sort = direction;
      if (!e.shiftKey) {
        const columns = this.columns.filter(c => c !== column);
        columns.forEach(c => c.sort = null);
      }
    } else {
      const direction = column.normalizedSortSequence[0];
      column.sort = direction;
      if (!e.shiftKey) {
        const columns = this.columns.filter(c => c !== column);
        columns.forEach(c => c.sort = null);
      }
    }
  }
  static {
    n(this.prototype, "onColumnSort", [action]);
  }
  previousPage() {
    if (this.pagination) {
      this.pageNumber = Math.max(this.pageNumber - 1, 1);
    }
  }
  static {
    n(this.prototype, "previousPage", [action]);
  }
  nextPage() {
    if (this.pagination) {
      const {
        isLastPage
      } = this.paginationData;
      if (!isLastPage) {
        this.pageNumber = this.pageNumber + 1;
      }
    }
  }
  static {
    n(this.prototype, "nextPage", [action]);
  }
  goToPage(pageNumber) {
    if (this.pagination) {
      const {
        totalPages
      } = this.paginationData;
      pageNumber = Math.max(pageNumber, 1);
      if (totalPages) {
        pageNumber = Math.min(pageNumber, totalPages);
      }
      this.pageNumber = pageNumber;
    }
  }
  static {
    n(this.prototype, "goToPage", [action]);
  }
  changePageSize(pageSize) {
    if (this.pagination) {
      this.pageSize = parseInt(String(pageSize));
    }
  }
  static {
    n(this.prototype, "changePageSize", [action]);
  }
  registerColumn(column) {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', this, function () {
      if (typeof this.args.isColumnVisible === 'function') {
        column.visible = this.args.isColumnVisible(column);
      }
      if (!this.columns.includes(column)) {
        this.columns = [...this.columns, column];
      }
    });
  }
  unregisterColumn(column) {
    if (this.columns.includes(column)) {
      this.columns = this.columns.filter(c => c !== column);
    }
  }
  static {
    setComponentTemplate(precompileTemplate("{{#let (hash table=(component Table theme=this.mergedTheme parent=this) header=(component HeaderComponent columns=this.columns onColumnClick=this.onColumnSort sortable=this.sortable sortSequence=this.sortSequence parent=this theme=this.mergedTheme) thead=(component THead columns=this.columns onColumnClick=this.onColumnSort sortable=this.sortable sortSequence=this.sortSequence theme=this.mergedTheme parent=this) body=(component Body data=this.processedData columns=this.columns theme=this.mergedTheme parent=this) tbody=(component TBody data=this.processedData columns=this.columns theme=this.mergedTheme parent=this) tfoot=(component TFoot columns=this.columns theme=this.mergedTheme parent=this) pagination=(component Pagination disabled=this.resolvedData.isPending theme=this.mergedTheme paginationData=this.paginationData paginationActions=(hash previousPage=this.previousPage nextPage=this.nextPage goToPage=this.goToPage changePageSize=this.changePageSize)) actions=this.publicApi paginationData=this.paginationData isLoading=this.resolvedData.isPending columns=this.columns visibleColumns=this.visibleColumns rows=this.normalizedRows totalRows=this.normalizedTotalRows visibleRows=this.processedData theme=this.mergedTheme) as |api|}}\n  {{UpdateTotalRows @totalRows context=this}}\n  {{UpdateFilter @filter context=this}}\n  {{ProcessedData loadData=@loadData context=this}}\n\n  {{#if this.renderTableElement}}\n    <Table @theme={{this.mergedTheme}} @parent={{this}} ...attributes>\n      {{yield api}}\n    </Table>\n  {{else}}\n    {{yield api}}\n  {{/if}}\n\n{{/let}}", {
      strictMode: true,
      scope: () => ({
        hash,
        Table,
        HeaderComponent: Header,
        THead: THeadComponent,
        Body,
        TBody,
        TFoot,
        Pagination,
        UpdateTotalRows,
        UpdateFilter,
        ProcessedData
      })
    }), this);
  }
}

export { YetiTable as default };
//# sourceMappingURL=yeti-table.js.map
