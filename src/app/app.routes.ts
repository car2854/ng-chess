import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { TwoPlayerComponent } from './pages/two-player/two-player.component';

export const routes: Routes = [
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'two-player',
    component: TwoPlayerComponent
  },

];
