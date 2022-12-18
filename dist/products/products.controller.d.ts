import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    addProduct(prodTitle: string, prodDesc: string, prodPrice: number): Promise<{
        product: import("mongoose").Document<unknown, any, import("./products.model").Product> & import("./products.model").Product & {
            _id: import("mongoose").Types.ObjectId;
        };
        message: string;
    }>;
    getProducts(): Promise<{
        id: any;
        title: string;
        description: string;
        price: number;
    }[]>;
    getSingleProduct(prodId: string): Promise<{
        id: any;
        title: any;
        description: any;
        price: any;
    }>;
    updateProduct(prodId: string, prodTitle: string, prodDesc: string, prodPrice: number): Promise<{
        message: string;
    }>;
    deleteProduct(prodId: string): Promise<{
        message: string;
    }>;
}
