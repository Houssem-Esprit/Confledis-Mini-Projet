import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/state/app.state';
import { Product } from '../product.model';
import * as fromProduct from '../state/product.reducer';
import * as ProductActions from '../state/product.actions';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductUpdateDto } from '../product-update.dto';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {
  updateProductForm: FormGroup;
  productUpdateDto: ProductUpdateDto;
  currentProduct$: Observable<Product>;
  updateProductError$: Observable<string>;
  formError: string;


  constructor(private store: Store<State>, private router: Router, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.currentProduct$ = this.store.select(fromProduct.getCurrentProduct);

    this.updateProductForm = this.formBuilder.group({
      nom: '',
      prixUnitaire: '',
      quantite: ''
    });

    this.updateProductError$ = this.store.select(fromProduct.getUpdateProductError);
  }

  onSubmit(originalProduct: Product): void {
    let parseObj = (arg) => {
      return {
        nom: arg.nom,
        prixUnintaire: parseInt(arg.prixUnitaire),
        quantite: parseInt(arg.quantite)
      }
    }
    if (this.updateProductForm.valid && this.updateProductForm.dirty) {
      const productBody: Product = { ...originalProduct, ...parseObj(this.updateProductForm.value) };
      console.log('productBody: ', productBody);

      this.productUpdateDto = productBody;

      this.store.dispatch(ProductActions.updateProduct({ id: productBody.id, updateProductDto: this.productUpdateDto }));
    } else {
      this.formError = 'tous les champs doivent etre remplie'
    }

  }
}
