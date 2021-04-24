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
    updateProductError: string;
    addProductError: string;
    showNewProduct: boolean;
    showProductDeleted: boolean;

}

const initialState: ProductState = {
    products: [],
    productsError: '',
    currentProductId: 0,
    currentProduct: null,
    updateProductError: '',
    addProductError: '',
    showNewProduct: false,
    showProductDeleted: false,
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

export const getUpdateProductError = createSelector(
    getDemandeInscriptionFeatureState,
    state => state.updateProductError,
);

export const getAddProductError = createSelector(
    getDemandeInscriptionFeatureState,
    state => state.addProductError,
);

export const getShowNewProduct = createSelector(
    getDemandeInscriptionFeatureState,
    state => state.showNewProduct,
);

export const getShowProductDeleted = createSelector(
    getDemandeInscriptionFeatureState,
    state => state.showProductDeleted,
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
            currentProduct: action.product,
            //products: updateProducts(state, action),
        }
    }),
    on(productActions.updateProductFailure, (state, action): ProductState => {
        return {
            ...state,
            updateProductError: action.error
        }
    }),
    on(productActions.addProductSuccess, (state, action): ProductState => {
        return {
            ...state,
            currentProduct: action.newProduct,
            showNewProduct: true
        }
    }),
    on(productActions.addProductFailure, (state, action): ProductState => {
        return {
            ...state,
            addProductError: action.error
        }
    }),
    on(productActions.clearCurrentProductSuccess, (state): ProductState => {
        return {
            ...state,
            showProductDeleted: true,
            currentProduct: null,
        }
    }),

)

let updateProducts = (state, action) => {
    let index: number = state.products.indexOf(state.products.find(p => p.id === action.product.id));
    return state.products[index] = action.product;
}


