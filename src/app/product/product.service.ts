import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { tap } from 'rxjs/operators';
import { ProductUpdateDto } from './product-update.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'http://localhost:3015';
  constructor(private httpClient: HttpClient) { }


  getProducts$(): Observable<Product[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<Product[]>(`${this.baseUrl}/product/getProducts`, { headers }).pipe(
      tap(array => console.log('Products Array ' + JSON.stringify(array))),
    );
  }

  deleteProduct$(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/product/delete/${id}`);
  }

  updateProduct$(id: string, updateProductDto: ProductUpdateDto): Observable<Product> {
    return this.httpClient.put<Product>(`${this.baseUrl}/product/delete/${id}`, updateProductDto).pipe(
      tap(obj => console.log('updated product ' + JSON.stringify(obj))),
    );
  }
}
