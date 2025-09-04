import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { TwoPlayerComponent } from './pages/two-player/two-player.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotAvailableYetComponent } from './pages/not-available-yet/not-available-yet.component';

export const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'two-player',
    component: TwoPlayerComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: 'not-available-yet',
    component: NotAvailableYetComponent,
  },
  {
    path: '**',
    redirectTo: 'main',
    pathMatch: 'full',
  },
];
