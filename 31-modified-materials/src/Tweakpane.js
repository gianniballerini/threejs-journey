import * as EssentialsPlugin from '@tweakpane/plugin-essentials';
import { Pane } from 'tweakpane';
import { Settings } from './Settings';

class TweakPane
{
  constructor(parent)
  {
    this.parent = parent
    this.pane = new Pane({
      title: 'Shader settings',
      expanded: true
    });
    this.pane.registerPlugin(EssentialsPlugin);


    this.pane.addBinding(Settings, 'angle', { min: 0, max: 2, step: 0.01 })
    this.pane.addBinding(Settings, 'sine')
  }
}


export { TweakPane };
