import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/state/app.state';
import { Product } from '../product.model';
import * as fromProduct from '../state/product.reducer';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  currentProduct$: Observable<Product>;

  constructor(private store: Store<State>,) { }

  ngOnInit(): void {

    this.currentProduct$ = this.store.select(fromProduct.getCurrentProduct);
  }

}
