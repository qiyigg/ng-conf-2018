import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DebouncedEchoComponent } from './echo.debounced.component';
import { DelayedEchoComponent } from './echo.delayed.component';
import { XHREchoComponent } from './echo.xhr.component';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
  declarations: [
    AppComponent, DebouncedEchoComponent, DelayedEchoComponent, XHREchoComponent
  ],
  imports: [
    BrowserModule, FormsModule, AppRoutingModule, HttpClientModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
