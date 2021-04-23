import { Component, NgZone, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../product.model';
import { State } from '../state/product.reducer';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products$: Observable<Product[]>;
  productsError$: Observable<string>;
  selectedProduct$: Observable<Product>;
  constructor(private store: Store<State>, private router: Router, private ngZone: NgZone) { }

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
    this.selectedProduct$ = this.store.select(fromProduct.getCurrentProduct);
  }


  productSelected(product: Product) {
    console.log('[ProductListComponent] Product Selected');
    this.store.dispatch(productActions.setCurrentProduct({ product }));
    this.router.navigate([{ outlets: { second: 'product' } }]);
  }

}
