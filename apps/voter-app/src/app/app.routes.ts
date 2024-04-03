import { Route } from '@angular/router'

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./components/voting-container/voting-container.component').then(
        (m) => m.VotingContainerComponent
      ),
  },
]
