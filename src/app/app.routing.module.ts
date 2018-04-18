import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebouncedEchoComponent }  from './echo.debounced.component'
import { DelayedEchoComponent } from './echo.delayed.component';
import { XHREchoComponent } from './echo.xhr.component';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  {
    path: 'delayedEcho',
    component: DelayedEchoComponent,
  },
  {
    path: 'debouncedEcho',
    component: DebouncedEchoComponent,
  },
  {
    path: 'xhrEcho',
    component: XHREchoComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
