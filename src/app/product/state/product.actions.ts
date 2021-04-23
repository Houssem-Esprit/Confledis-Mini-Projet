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
