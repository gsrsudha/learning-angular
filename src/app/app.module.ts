import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotfoundComponent } from './home/page-notfound.component';
import { ProductModule } from './products/product.module';
import { AppRoutingModule } from './/app-routing.module';
import { MessagesModule } from './messages/messages.module';
import { UserModule } from './user/user.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './products/product-data';

@NgModule({
  declarations: [
    AppComponent, WelcomeComponent, PageNotfoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule, 
    InMemoryWebApiModule.forRoot(ProductData, {delay: 10}),
    UserModule,    
    AppRoutingModule,
    MessagesModule    
  ],
  bootstrap: [AppComponent]  
})
export class AppModule { }
