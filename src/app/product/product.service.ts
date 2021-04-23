import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'http://localhost:3015';
  constructor(private httpClient: HttpClient) { }


  getProducts$(): Observable<Product[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<Product[]>(`${this.baseUrl}/product/getProducts`, { headers }).pipe(
      tap(array => console.log('demandeInscri Array ' + JSON.stringify(array))),
    );
  }
}
