import * as EssentialsPlugin from '@tweakpane/plugin-essentials';
import { Pane } from 'tweakpane';

class TweakPane
{
  constructor(parent)
  {
    this.parent = parent
    this.pane = new Pane({
      title: 'Galaxy settings',
      expanded: true
    });
    this.pane.registerPlugin(EssentialsPlugin);

    // this.pane.addBinding(Settings, 'count', { min: 100, max: 1000000, step: 100 }).on('change', (ev) => {
    //     if (ev.last) {
    //       this.generateGalaxy()
    //     }
    //   });
  }
}


export { TweakPane };
