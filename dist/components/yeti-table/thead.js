import { hash } from '@ember/helper';
import THeadRow from './thead/row.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const THeadComponent = setComponentTemplate(precompileTemplate("<thead class={{@theme.thead}} ...attributes>\n  {{yield (hash row=(component THeadRow sortable=@sortable sortSequence=@sortSequence onColumnClick=@onColumnClick columns=@columns theme=@theme parent=@parent))}}\n</thead>", {
  strictMode: true,
  scope: () => ({
    hash,
    THeadRow
  })
}), templateOnly());

export { THeadComponent as default };
//# sourceMappingURL=thead.js.map
