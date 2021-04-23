import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProductService } from '../product.service';
import * as productActions from './product.actions';

@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions,
        private productService: ProductService) { }



    getProducts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(productActions.getProducts),
            switchMap(action =>
                this.productService.getProducts$()
                    .pipe(
                        map(products => productActions.getProductsSuccess({ products })),
                        catchError(error => {
                            console.log('error', error.error.message);
                            return of(productActions.getProductsFailure({ error: error.error.message }))
                        }),
                    ))
        )
    });

    deleteProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(productActions.clearCurrentProduct),
            switchMap(action =>
                this.productService.deleteProduct$(action.id)
                    .pipe(
                        map(() => productActions.getProducts()),
                        catchError(error => {
                            console.log('error', error.error.message);
                            return of(productActions.clearCurrentProductFailure({ error: error.error.message }))
                        }),
                    ))
        )
    });


    updateProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(productActions.updateProduct),
            switchMap(action =>
                this.productService.updateProduct$(action.id, action.updateProductDto)
                    .pipe(
                        map(() => productActions.getProducts()),
                        catchError(error => {
                            console.log('error', error.error.message);
                            return of(productActions.updateProductFailure({ error: error.error.message }))
                        }),
                    ))
        )
    });
}