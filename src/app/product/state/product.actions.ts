import { createAction, props } from '@ngrx/store';
import { ProductUpdateDto } from '../product-update.dto';
import { Product } from '../product.model';

export const getProducts = createAction(
    '[Product] Get Products',
);

export const getProductsSuccess = createAction(
    '[Product] Get Products Success',
    props<{ products: Product[] }>()
);

export const getProductsFailure = createAction(
    '[Product] Get Products Failure',
    props<{ error: string }>()
);

export const setCurrentProduct = createAction(
    '[Product] Set Current Product',
    props<{ product: Product }>() // the props are the data associated with the action for triggering a specific state needs those data to work with.
);

export const clearCurrentProduct = createAction(
    '[Product] Clear Current Product',
    props<{ id: number }>()
);

export const clearCurrentProductFailure = createAction(
    '[Product] Clear Current Product Failure',
    props<{ error: string }>()
);

export const updateProduct = createAction(
    '[Product] Update Product',
    props<{ id: number, updateProductDto: ProductUpdateDto }>()
);

export const updateProductFailure = createAction(
    '[Product] Update Product Failure',
    props<{ error: string }>()
);

export const initializeCurrentProduct = createAction(
    '[Product] Initialize Current Product'
);
