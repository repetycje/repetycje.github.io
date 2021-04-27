import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import {NewGameComponent} from "./new-game/new-game.component";

const routes: Routes = [
  { path: 'game', component: GameComponent },
  { path: 'new-game', component: NewGameComponent },
  { path: '**', redirectTo: 'new-game' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
