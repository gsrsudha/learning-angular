export interface IProduct {
    id: number;
    productName: string;
    productCode: string;
    category: string;
    tags?: string[];
    releaseDate: string;
    description: string;
    price: number;
    starRating: number;
    imageUrl: string;
}

export interface ProductResolved {
    product: IProduct;
    error?: any;
}

export interface ProductsResolved {
    products : IProduct[],
    error?: any;
}