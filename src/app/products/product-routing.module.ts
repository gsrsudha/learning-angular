import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list.component';
import { ProductDetailGuard } from './product-detail.guard';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductEditGuard } from './product-edit.guard';
import { ProductResolverService } from './product-resolver.service';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';
import { ProductlistResolverService } from './productlist-resolver.service';
import { AuthGuard } from '../user/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'products',     
        canActivate: [AuthGuard],    
        children: [  
          /*start of component less route */
          {
            path: '',
            component: ProductListComponent,
            resolve: {resolvedProducts: ProductlistResolverService}
          },   
          /*end of component less route */
          //grouping routes  
          {
            path: ':id', 
            // canActivate: [ProductDetailGuard], NOT REQUIRED FOR ROUTING COURSE
            component: ProductDetailComponent,
            resolve: {product: ProductResolverService}
          },
          {
            path: ':id/edit', 
            component: ProductEditComponent,
            resolve: {product: ProductResolverService},
            canDeactivate: [ProductEditGuard],
            children: [
              {
                path: '', redirectTo: 'info', pathMatch: 'full'
              },
              {
                path: 'info', component: ProductEditInfoComponent
              },
              {
                path: 'tags', component: ProductEditTagsComponent
              }
            ]
          }
        ]
      }
    ])
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class ProductRoutingModule { }
