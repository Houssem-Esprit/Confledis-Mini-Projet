import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { Product } from '../product.model';
import * as ProductsActions from '../state/product.actions';

@Pipe({ name: 'appFilter' })

export class FilterPipe implements PipeTransform {
    /**
     * Transform
     *
     * @param {Product[]} products
     * @param {string} searchText
     * @returns {Product[]}
     */

    constructor(private store: Store<State>) { }
    transform(products: Product[], searchText: string): Product[] {
        if (!products) {
            return [];
        }
        if (!searchText) {
            return products;
        }
        searchText = searchText.toLocaleLowerCase();

        let productS: Product[] = products.filter(it => {
            return it.nom.toLocaleLowerCase().includes(searchText);
        });

        if (productS.length > 0) {
            return productS;
        } else {
            this.store.dispatch(ProductsActions.SearchedTextFailed());
        }

    }
}