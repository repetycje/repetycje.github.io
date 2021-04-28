import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GameComponent} from './components/game/game.component';
import {NewGameComponent} from './components/new-game/new-game.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxBootstrapIconsModule, arrowRight, plus} from 'ngx-bootstrap-icons';

@NgModule({
    declarations: [
        AppComponent,
        GameComponent,
        NewGameComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        NgbModule,
        NgxBootstrapIconsModule.pick({arrowRight, plus})
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
