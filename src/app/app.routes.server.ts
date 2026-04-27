import {RenderMode, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'services/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        {id: 'solar-installation'},
        {id: 'wiring-setup'},
        {id: 'battery-supply'},
        {id: 'volt-switch-panels'},
        {id: 'solar-panel-supply'},
        {id: 'maintenance-repair'}
      ];
    }
  },
  {
    path: 'products/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        {id: 'mono-crystalline-550w'},
        {id: 'lithium-battery-10kwh'},
        {id: 'smart-volt-switch-v2'}
      ];
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
