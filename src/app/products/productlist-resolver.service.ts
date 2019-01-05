import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ProductsResolved } from './product';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductlistResolverService implements Resolve<ProductsResolved> {

  constructor(private productService: ProductService) { }

  resolve(): Observable<ProductsResolved> {
       
    return this.productService.getProducts()
      .pipe(
        map((products => ({products : products}))),
        catchError(error => {
          const message = `Retrieval error: ${error}`;
          console.error(message); 
          return of({ products: null, error: message});
        })
      );
  }
}
