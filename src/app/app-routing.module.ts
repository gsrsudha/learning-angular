import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotfoundComponent } from './home/page-notfound.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path: 'welcome', component: WelcomeComponent},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: '**', component: PageNotfoundComponent}
    ]),
  ],
  declarations: [],
  exports : [
    RouterModule
  ]
})
export class AppRoutingModule { }
