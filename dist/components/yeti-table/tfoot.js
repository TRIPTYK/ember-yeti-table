import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import TFootRow from './tfoot/row.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class TFoot extends Component {
  static {
    setComponentTemplate(precompileTemplate("<tfoot class={{@theme.tfoot}} ...attributes>\n  {{yield (hash row=(component TFootRow columns=@columns theme=@theme parent=@parent))}}\n</tfoot>", {
      strictMode: true,
      scope: () => ({
        hash,
        TFootRow
      })
    }), this);
  }
}

export { TFoot as default };
//# sourceMappingURL=tfoot.js.map
