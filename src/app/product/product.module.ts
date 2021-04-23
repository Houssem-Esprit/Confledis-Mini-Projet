import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { productReducer } from './state/product.reducer';
import { ProductEffects } from './state/product.effects';



@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([ProductEffects]),
  ]
})
export class ProductModule { }