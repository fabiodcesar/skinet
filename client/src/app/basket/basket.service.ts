import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBasket } from '../shared/models/basket';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl;
  // Observable do tipo behaviour precisa sempre de valor inicial
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  getBasket(id: string)
  {
    this.http.get<IBasket>(this.baseUrl + '/basket?id=' + id)
    .pipe(
      // Mapeia objeto retornado em IBasket
      map((basket: IBasket) => {
        // Atualiza objeto "behaviour"
        this.basketSource.next(basket);
      })
    );
  }

  // tslint:disable-next-line: typedef
  setBasket(basket: IBasket) {
    return this.http.post(this.baseUrl + 'basket', basket).subscribe((response: IBasket) => {
      // Atualiza objeto "behaviour"
      this.basketSource.next(response);
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  getCurrentBasketValue()
  {
    return this.basketSource.value;
  }
}
