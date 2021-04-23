import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductUpdateComponent } from './product/product-update/product-update.component';


const routes: Routes = [
  { path: 'bienvenu', component: ProductListComponent },
  { path: '', redirectTo: 'bienvenu', pathMatch: 'full' },
  {
    path: 'product', component: ProductDetailsComponent, outlet: 'second'
  },
  {
    path: 'product/edit', component: ProductUpdateComponent, outlet: 'second'
  },
  {
    path: 'product/add', component: ProductFormComponent, outlet: 'second'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
