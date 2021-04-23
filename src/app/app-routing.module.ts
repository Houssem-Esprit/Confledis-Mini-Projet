import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductListComponent } from './product/product-list/product-list.component';


const routes: Routes = [
  { path: 'bienvenu', component: ProductListComponent },
  { path: '', redirectTo: 'bienvenu', pathMatch: 'full' },
  {
    path: 'product', component: ProductDetailsComponent, outlet: 'second'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
