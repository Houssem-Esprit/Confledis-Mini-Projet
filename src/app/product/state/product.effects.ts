import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ProductService } from '../product.service';
import * as productActions from './product.actions';

@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions,
        private productService: ProductService, private router: Router) { }



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

    /*   deleteProduct$ = createEffect(() => {
           return this.actions$.pipe(
               ofType(productActions.clearCurrentProduct),
               exhaustMap(action =>
                   this.productService.deleteProduct$(action.id)
                       .pipe(
                           map(() => productActions.getProducts(),
                               productActions.clearCurrentProductSuccess()),
                           catchError(error => {
                               console.log('error', error.error.message);
                               return of(productActions.clearCurrentProductFailure({ error: error.error.message }))
                           }),
                       ))
           )
       });  */

    deleteProduct$$ = createEffect(() => {
        return this.actions$.pipe
            (
                ofType(productActions.clearCurrentProduct),
                exhaustMap(action => this.productService.deleteProduct$(action.id)),
                mergeMap(res => [
                    productActions.clearCurrentProductSuccess(),
                    productActions.getProducts()
                ]),
                catchError(error => {
                    console.log('error', error.error.message);
                    return of(productActions.clearCurrentProductFailure({ error: error.error.message }))
                }),
            )
    });


    updateProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(productActions.updateProduct),
            switchMap(action =>
                this.productService.updateProduct$(action.id, action.updateProductDto)
                    .pipe(
                        map(action =>
                            productActions.getProducts(),
                            //this.router.navigate([{ outlets: { second: 'product' } }]),
                        ),
                        catchError(error => {
                            console.log('error', error.error.message);
                            return of(productActions.updateProductFailure({ error: error.error.message }))
                        }),
                    ))
        )
    });


    addProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(productActions.addProduct),
            mergeMap(action => this.productService.AddProduct$(action.productUpdateDto)),
            mergeMap(res => [
                productActions.getProducts(),
                productActions.addProductSuccess({ newProduct: res })
            ]),
            catchError(error => {
                console.log('error', error.error.message);
                return of(productActions.addProductFailure({ error: error.error.message }))
            }),

        )
    })
}