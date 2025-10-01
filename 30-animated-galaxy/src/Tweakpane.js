import * as EssentialsPlugin from '@tweakpane/plugin-essentials';
import { Pane } from 'tweakpane';
import { Settings } from './Settings';

export class TweakPane
{
  constructor(generateGalaxy)
  {
    this.generateGalaxy = generateGalaxy
    this.parent = parent
    this.pane = new Pane({
      title: 'Galaxy settings',
      expanded: true
    });
    this.pane.registerPlugin(EssentialsPlugin);

    this.pane.addBinding(Settings, 'count', { min: 100, max: 1000000, step: 100 }).on('change', (ev) => {
        if (ev.last) {
          this.generateGalaxy()
        }
      });
    this.pane.addBinding(Settings, 'radius', { min: 0.01, max: 20, step: 0.01 }).on('change', (ev) => {
        if (ev.last) {
          this.generateGalaxy()
        }
      });
    this.pane.addBinding(Settings, 'branches', { min: 2, max: 20, step: 1 }).on('change', (ev) => {
        if (ev.last) {
          this.generateGalaxy()
        }
      });
    this.pane.addBinding(Settings, 'randomness', { min: 0, max: 2, step: 0.001 }).on('change', (ev) => {
        if (ev.last) {
          this.generateGalaxy()
        }
      });
    this.pane.addBinding(Settings, 'randomnessPower', { min: 1, max: 10, step: 0.001 }).on('change', (ev) => {
        if (ev.last) {
          this.generateGalaxy()
        }
      });
    this.pane.addBinding(Settings, 'insideColor').on('change', (ev) => {
        if (ev.last) {
          this.generateGalaxy()
        }
      });
    this.pane.addBinding(Settings, 'outsideColor').on('change', (ev) => {
        if (ev.last) {
          this.generateGalaxy()
        }
      });
  }
}
