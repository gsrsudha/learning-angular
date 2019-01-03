import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';

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
              private router: Router, private productService: ProductService) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id') ;
    this.pageTitle += `: ${id}`;
    this.productService.getProduct(id)
    .subscribe(
      (product: IProduct) => this.displayProduct(product),
      (error: any) => this.errorMessage = <any>error
    );
  }

  displayProduct(product: IProduct): void {
    this.product = {
      id: product.id,
      productName: product.productName,
      productCode: product.productCode,
      releaseDate: product.releaseDate,
      starRating: product.starRating,
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price
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
