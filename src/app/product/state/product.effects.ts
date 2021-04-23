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
}