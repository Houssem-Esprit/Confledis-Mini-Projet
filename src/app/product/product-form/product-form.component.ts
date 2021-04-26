import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GenericValidator } from 'src/app/shared/generic-validator';
import { State } from 'src/app/state/app.state';
import { Product } from '../product.model';
import * as fromProduct from '../state/product.reducer';
import * as ProductActions from '../state/product.actions';
import { ProductUpdateDto } from '../product-update.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  addProductError$: Observable<string>;
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  addProductForm: FormGroup;
  private genericValidator: GenericValidator;
  productUpdateDto: ProductUpdateDto;



  constructor(private formBuilder: FormBuilder, private store: Store<State>, private router: Router) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      nom: {
        required: 'Nom de produit est obligatoire.',
        minlength: 'Le nom du produit doit comporter au moins trois caractères.',
        maxlength: 'Le nom du produit ne peut pas dépasser 50 caractères.'
      },
      prixUnitaire: {
        required: 'Prix unitaire est obligatoire.'
      },
      quantite: {
        required: 'Quantite est obligatoire'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {

    this.addProductForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      prixUnitaire: ['', Validators.required],
      quantite: ['', Validators.required]
    });


    this.addProductForm.valueChanges.subscribe(
      () => this.displayMessage = this.genericValidator.processMessages(this.addProductForm)
    );

    this.addProductError$ = this.store.select(fromProduct.getAddProductError);

    this.store.select(fromProduct.getShowNewProduct).subscribe(
      (showNewProduct) => showNewProduct == true ? this.router.navigate([{ outlets: { second: 'product' } }]) : null
    );
  }

  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.addProductForm);
  }

  parseObj = (arg) => {
    return {
      nom: arg.nom,
      prixUnitaire: parseInt(arg.prixUnitaire),
      quantite: parseInt(arg.quantite)
    }
  }

  onSubmit() {

    if (this.addProductForm.valid && this.addProductForm.dirty) {
      this.productUpdateDto = this.parseObj(this.addProductForm.value)
      console.log('[ProductForm] productUpdateDto: ', this.productUpdateDto);
      this.store.dispatch(ProductActions.addProduct({ productUpdateDto: this.productUpdateDto }));
    }
  }





}
