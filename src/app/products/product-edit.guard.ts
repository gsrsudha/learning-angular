import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ProductEditComponent } from './product-edit/product-edit.component';

@Injectable()
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {
  canDeactivate(component: ProductEditComponent): boolean {
    if(component.productForm.dirty) {
        let productName = component.productForm.get('productName').value || "New Product";
        return confirm(`Navigate away and lose all changes to ${productName}?`);
    }
    return true;
  }
}
