import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduct, ProductResolved } from './product';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  errorMessage: string;
  pageTitle: string = 'Product Detail';
  product: IProduct;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const resolvedData: ProductResolved = this.route.snapshot.data['product'] ;
    this.errorMessage = resolvedData.error;
    this.displayProduct(resolvedData.product);
  }

  displayProduct(product: IProduct): void {
    this.product = product;  
    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }

  onBack(): void {
    this.router.navigate(['/products'],
      {
        queryParamsHandling: 'preserve'
      }
    );
  }
}
