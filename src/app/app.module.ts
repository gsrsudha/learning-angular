import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotfoundComponent } from './home/page-notfound.component';
import { ProductModule } from './products/product.module';


@NgModule({
  declarations: [
    AppComponent, WelcomeComponent, PageNotfoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'welcome', component: WelcomeComponent},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: '**', component: PageNotfoundComponent}
    ]),
    ProductModule
  ],
  bootstrap: [AppComponent]  
})
export class AppModule { }
