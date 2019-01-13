import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, AbstractControl, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct, ProductResolved } from '../product';
import { ProductService } from '../product.service';
import { MessagesService } from 'src/app/messages/messages.service';

function ratingRange(min: number, max: number) : ValidatorFn{
  return (c: AbstractControl): {[key: string]: boolean} | null => {
    if(c.value != undefined && (isNaN(c.value) || c.value < min || c.value > max))  {
      return {'range': true};    
    }
    return null;    
  };
}

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  pageTitle: string = 'Edit product';
  errorMessage: string;
  productForm: FormGroup;
  
  _product: IProduct;
  private dataIsValid: { [key: string]: boolean } = {};

  get isDirty(): boolean {
    return JSON.stringify(this.originalProduct) !== JSON.stringify(this.currentProduct);
  }

  private currentProduct: IProduct;
  private originalProduct: IProduct;

  get product(): IProduct {
    return this.currentProduct;
  }
  set product(value: IProduct) {
    this.currentProduct = value;
    // Clone the object to retain a copy
    this.originalProduct = value ? { ...value } : null;
  }

  get tags(): FormArray {
    return <FormArray>this.productForm.get('tags');
  }

  constructor(private fb: FormBuilder, 
              private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private messageService: MessagesService) { }
 
  ngOnInit() {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      starRating: ['', ratingRange(1, 5)],
      tags: this.fb.array([]),
      description: '' 
    });
    
    //changed to route resolved data using observable
    this.route.data.subscribe(
      data => { 
        const resolvedData: ProductResolved = this.product = data['product'];
        this.errorMessage = resolvedData.error;
        this.displayProduct(resolvedData.product);
      }
    );  
  }
 
  ngOnDestroy(): void {
    // this.sub.unsubscribe(); --- this is throwing error of undefined
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

    if (!this.product) {
      this.pageTitle = 'No product found';
    } else {
      if (this.product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
        //update the data on the form
        this.productForm.patchValue({
          productName: this.product.productName,
          productCode: this.product.productCode,
          description: this.product.description,
          starRating: this.product.starRating
        });
        this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
      }
    }   
  }

  editProduct(product: IProduct): void {
    this.productService.updateProduct(product)
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any> error
        );
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (this.dataIsValid &&
      Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
  }

  reset(): void {
    this.dataIsValid = null;
    this.currentProduct = null; 
    this.originalProduct = null;  
  }

  saveProduct() {
    if (this.isValid()) {
      if (this.product.id === 0) {
        this.productService.createProduct(this.product)
          .subscribe(
            () => this.onSaveComplete(`The new ${this.product.productName} was saved`),
            (error: any) => this.errorMessage = <any>error
          );
      } else {
        this.productService.updateProduct(this.product)
          .subscribe(
            () => this.onSaveComplete(`The updated ${this.product.productName} was saved`),
            (error: any) => this.errorMessage = <any>error
          );
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

  onSaveComplete(message?: string): void{
    if (message) {
      this.messageService.addMessage(message);
    }
    //reset the form to clear the flags
    this.reset(); //to not activate the canDeactivate guard on saveProduct

    this.router.navigate(['/products']);
  }

  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};

    if(this.product) {
      // 'info' tab
      if (this.product.productName &&
        this.product.productName.length >= 3 &&
        this.product.productCode) {
        this.dataIsValid['info'] = true;
      } else {
        this.dataIsValid['info'] = false;
      }

      // 'tags' tab
      if (this.product.category &&
        this.product.category.length >= 3) {
        this.dataIsValid['tags'] = true;
      } else {
        this.dataIsValid['tags'] = false;
      }
    }
  }
}
