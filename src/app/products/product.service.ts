import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { catchError, tap, map } from 'rxjs/operators';

import { IProduct } from "./product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    private productUrl = 'api/products'; //or baseUrl

    constructor(private http: HttpClient) {}

    getProducts() : Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
                    tap(data => console.log('All: ' + JSON.stringify(data))),
                    catchError(this.handleError)
        );
    }

    getProduct(id: number) : Observable<IProduct> {
      if(id === 0) {
        return of(this.initializeProduct());
      }

      const url = `${this.productUrl}/${id}`;
      
      return this.http.get<IProduct>(url).pipe(
        tap(data => console.log('getProduct ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
    }

    createProduct(product: IProduct): Observable<IProduct> {
      return of(this.initializeProduct());
    }

    updateProduct(product: IProduct): Observable<IProduct>  {
      const headers = new HttpHeaders({'Content-Type': 'application/json'});

      const url = `${this.productUrl}/${product.id}`;
      return this.http.put<IProduct>(url, product, {headers: headers})
          .pipe(
            tap(() => console.log('update product: ' + product.id)),
            //Return the product on an update
            map(() => product),
            catchError(this.handleError)
          );
    }

    private handleError(err: HttpErrorResponse) {
      let errorMessage = '';
      if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occured: ${err.error.message}`;
      } else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      }
      console.error(errorMessage);
      return throwError(errorMessage);
    }


    private initializeProduct(): IProduct {
      return {
        id: 0,
        productName: '',
        productCode: '',
        tags: [''],
        releaseDate: null,
        description: null,
        price: null,
        starRating: null,
        imageUrl: ''
      };
    }
}