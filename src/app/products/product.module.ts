import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './product-data';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { SharedModule } from '../shared/shared.module';
import { ProductRoutingModule } from './/product-routing.module';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductEditGuard } from './product-edit.guard';
import { ProductDetailGuard } from './product-detail.guard';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';


@NgModule({
  imports: [    
    SharedModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(ProductData)
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ConvertToSpacesPipe, ProductEditInfoComponent, ProductEditTagsComponent
  ],
  providers: [
    ProductDetailGuard,
    ProductEditGuard
  ]
})
export class ProductModule { }
