import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/brands';
import { IProductType } from '../shared/models/productType';

@Injectable({providedIn: 'root'})

export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

   // tslint:disable-next-line: typedef
   getProducts() {
    return this.http.get<IPagination>(this.baseUrl + 'products?PageSize=50');
  }

  // tslint:disable-next-line: typedef
  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

   // tslint:disable-next-line: typedef
   getTypes() {
    return this.http.get<IProductType[]>(this.baseUrl + 'products/types');
  }
}
