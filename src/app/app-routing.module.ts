import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotfoundComponent } from './home/page-notfound.component';
import { SelectiveStrategyService } from './selective-strategy.service';
import { AuthGuard } from './user/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: 'products',
        canLoad: [AuthGuard],
        loadChildren: './products/product.module#ProductModule'
      },
      {path: 'welcome', component: WelcomeComponent},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: '**', component: PageNotfoundComponent}
    ], {preloadingStrategy: SelectiveStrategyService}),
  ],
  declarations: [],
  exports : [
    RouterModule
  ]
})
export class AppRoutingModule { }
