import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TickTestComponent } from './tick-test/tick-test.component';
import { ZoneTestComponent } from './zone-test/zone-test.component';
import { SolutionComponent } from './solution/solution.component';

@NgModule({
  declarations: [
    AppComponent,
    TickTestComponent,
    ZoneTestComponent,
    SolutionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
