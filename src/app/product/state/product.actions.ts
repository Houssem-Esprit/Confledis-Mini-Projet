import { createAction, props } from '@ngrx/store';
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
    '[Product] Clear Current Product'
);

export const initializeCurrentProduct = createAction(
    '[Product] Initialize Current Product'
);
