import { Component, OnInit } from '@angular/core'; 
import { IProduct, ProductsResolved } from './product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';

@Component({ 
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
    pageTitle: string = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    _listFilter: string;
    errorMessage:string;

    public get listFilter(): string {
        return this._listFilter;
    }
    public set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: IProduct[];
    products: IProduct[] = [];

    constructor(private route: ActivatedRoute) {
    }
    
    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1); // array filter function -- look into MDN for details
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
        this.showImage = this.route.snapshot.queryParamMap.get('showImage') === 'true';
        
        //changed to route resolved data using observable
        this.route.data.subscribe(
        data => { 
            const resolvedData: ProductsResolved = data['resolvedProducts'];
            this.products = resolvedData.products;
            this.filteredProducts = this.performFilter(this.listFilter);
            this.errorMessage = resolvedData.error;
            }
        );  
        //this.filteredProducts = this.products; moved to subscriber method
    }
}
