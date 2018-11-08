import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, AbstractControl, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

function ratingRange(min: number, max: number) : ValidatorFn{
  return (c: AbstractControl): {[key: string]: boolean} | null => {
    if(c.value != undefined && (isNaN(c.value) || c.value < min || c.value > max))  {
      return {'range': true};    
    }
    return null;    
  };
}

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  pageTitle: string = 'Edit product';
  errorMessage: string;
  productForm: FormGroup;
  
  product: IProduct;
  private sub: Subscription;

  get tags(): FormArray {
    return <FormArray>this.productForm.get('tags');
  }

  constructor(private fb: FormBuilder, 
              private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) { }
 
  ngOnInit() {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      starRating: ['', ratingRange(1, 5)],
      tags: this.fb.array([]),
      description: '' 
    });

    // read the product Id from the route parameter
    this.sub = this.route.params.subscribe(
      params => {
        let id = +params['id'];
        this.getProduct(id);
      }
    );
  }
 
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  getProduct(id: number): void {
    this.productService.getProduct(id)
        .subscribe(
          (product: IProduct) => this.displayProduct(product),
          (error: any) => this.errorMessage = <any>error
        );
  }

  displayProduct(product: IProduct): void {
    if(this.productForm) {
      this.productForm.reset();
    }
    this.product = product;

    if(this.product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product : ${this.product.productName}`;
    }

    //update the data on the form
    this.productForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      description: this.product.description,
      starRating: this.product.starRating
    });
    this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
  }

  editProduct(product: IProduct): void {
    this.productService.updateProduct(product)
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any> error
        );
  }

  saveProduct() {
    if(this.productForm.valid) {
      if(this.productForm.dirty) {
        const p = {...this.product, ...this.productForm.value};

        if(p.id === 0) {
          this.productService.createProduct(p)
              .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any> error
              );
        } else {
          this.productService.updateProduct(p)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any> error
          );
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  deleteProduct(): void {
    if( this.product.id === 0 ) {
      //Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if(confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any> error
            );
      }
    }
  }

  onSaveComplete() {
    //reset the form to clear the flags
    this.productForm.reset();
    this.router.navigate(['/products']);
  }
}
