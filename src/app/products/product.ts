export interface IProduct {
    id: number;
    productName: string;
    productCode: string;
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