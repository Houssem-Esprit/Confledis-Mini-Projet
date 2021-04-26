import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/state/app.state';
import { Product } from '../product.model';
import * as fromProduct from '../state/product.reducer';
import * as ProductActions from '../state/product.actions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  currentProduct$: Observable<Product>;
  showProductDeleted$: Observable<Boolean>;
  showProductNotFound$: Observable<Boolean>;
  showSearchInit$: Observable<Boolean>;
  showSearchDone$: Observable<Boolean>;


  constructor(private store: Store<State>, private router: Router) { }

  ngOnInit(): void {

    this.currentProduct$ = this.store.select(fromProduct.getCurrentProduct);

    this.showProductDeleted$ = this.store.select(fromProduct.getShowProductDeleted);

    this.showProductNotFound$ = this.store.select(fromProduct.getSearchedTextFailed);

    this.showSearchInit$ = this.store.select(fromProduct.getSearchInit);

    this.showSearchDone$ = this.store.select(fromProduct.getSearchDone);
  }


  deleteProduct(product: Product): void {
    if (product && product.id) {
      if (confirm(`Vous ete sur pour supprimer le produit: ${product.nom}?`)) {
        this.store.dispatch(ProductActions.clearCurrentProduct({ id: product.id }))
      }
    } else {
      return;
    }
  }

  GoToEditProduct(): void {
    this.router.navigate([{ outlets: { second: 'product/edit' } }]);
  }
}
