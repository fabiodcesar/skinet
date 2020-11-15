import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/brands';
import { IProductType } from '../shared/models/productType';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

   // tslint:disable-next-line: typedef
   getProducts(brand?: number, typeId?: number, sort?: string) {
    let params = new HttpParams();

    if (brand) {
      params = params.append('brandId', brand.toString());
    }

    if (typeId) {
      params = params.append('typeId', typeId.toString());
    }

    if (sort)
    {
      params = params.append('sort', sort);
    }

    // Projects the "response" object and return its body. This is necessary because the function returns first a observable
    // and we need the body of this observable
    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
        })
      );
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
