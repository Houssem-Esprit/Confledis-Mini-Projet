import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../product.model';
import { State } from '../state/product.reducer';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products$: Observable<Product[]>;
  productsError$: Observable<string>;
  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    /**
     * dispatch actions
     */
    this.store.dispatch(productActions.getProducts());


    /**
     * feed our UI with our fat Observables
     */

    this.products$ = this.store.select(fromProduct.getProducts);
    this.productsError$ = this.store.select(fromProduct.getProductsError);
  }

}
