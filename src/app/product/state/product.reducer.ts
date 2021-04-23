import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { Product } from '../product.model';
import * as productActions from './product.actions';

export interface State extends AppState.State {
    products: ProductState,
}

export interface ProductState {
    products: Product[],
    productsError: string,
    currentProductId: number;
    currentProduct: Product;
}

const initialState: ProductState = {
    products: [],
    productsError: '',
    currentProductId: 0,
    currentProduct: null,
}


/**
 *  Dfine Selectors
 */

const getDemandeInscriptionFeatureState = createFeatureSelector<ProductState>('products');

export const getProducts = createSelector(
    getDemandeInscriptionFeatureState,
    state => state.products,
);

export const getProductsError = createSelector(
    getDemandeInscriptionFeatureState,
    state => state.productsError,
);

export const getCurrentProduct = createSelector(
    getDemandeInscriptionFeatureState,
    state => state.currentProduct,
);







export const productReducer = createReducer<ProductState>(
    initialState,

    on(productActions.getProductsSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: action.products,
            productsError: '',

        }
    }),
    on(productActions.getProductsFailure, (state, action): ProductState => {
        return {
            ...state,
            products: [],
            productsError: action.error,
        }
    }),
    on(productActions.setCurrentProduct, (state, action): ProductState => {
        return {
            ...state,
            currentProduct: action.product
        }
    }),
)