import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotfoundComponent } from './home/page-notfound.component';
import { ProductModule } from './products/product.module';
import { AppRoutingModule } from './/app-routing.module';


@NgModule({
  declarations: [
    AppComponent, WelcomeComponent, PageNotfoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,   
    ProductModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]  
})
export class AppModule { }
