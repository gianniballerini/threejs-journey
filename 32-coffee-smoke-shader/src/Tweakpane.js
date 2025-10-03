import * as EssentialsPlugin from '@tweakpane/plugin-essentials';
import { Pane } from 'tweakpane';
import { Settings } from './Settings';

class TweakPane
{
  constructor(parent)
  {
    this.parent = parent
    this.pane = new Pane({
      title: 'Coffee settings',
      expanded: true
    });
    this.pane.registerPlugin(EssentialsPlugin);


    this.pane.addBinding(Settings, 'smokeSpeed', { min: 0, max: 0.2, step: 0.01 })
    this.pane.addBinding(Settings, 'smokeColor')
    this.pane.addBinding(Settings, 'smokeThreshold', { min: 0, max: 1, step: 0.01 })
    this.pane.addBinding(Settings, 'smokeWireframe')
    this.pane.addBinding(Settings, 'twistStrength', { min: 0, max: 20, step: 1 })
    this.pane.addBinding(Settings, 'twistFrequency', { min: 0, max: 4, step: 0.01 })
    this.pane.addBinding(Settings, 'twistSpeed', { min: 0, max: 0.2, step: 0.001 })

    this.pane.addBlade({
      view: 'separator',
    })

    this.pane.addBinding(Settings, 'leftEdge')
    this.pane.addBinding(Settings, 'rightEdge')
    this.pane.addBinding(Settings, 'topEdge')
    this.pane.addBinding(Settings, 'bottomEdge')
  }
}


export { TweakPane };
