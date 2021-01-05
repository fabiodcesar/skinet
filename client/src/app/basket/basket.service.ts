import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { map } from 'rxjs/operators';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl;
  // Observable do tipo behaviour precisa sempre de valor inicial
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();

  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  getBasket(id: string)
  {
    return this.http.get<IBasket>(this.baseUrl + 'basket?id=' + id)
    .pipe(
      // Mapeia objeto retornado em IBasket
      map((basket: IBasket) => {
        // Atualiza objeto "behaviour"
        this.basketSource.next(basket);
        this.calculateTotals();
      })
    );
  }

  // tslint:disable-next-line: typedef
  setBasket(basket: IBasket) {
    return this.http.post(this.baseUrl + 'basket', basket).subscribe((response: IBasket) => {
      // Atualiza objeto "behaviour"
      this.basketSource.next(response);
      this.calculateTotals();
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  getCurrentBasketValue()
  {
    return this.basketSource.value;
  }

  // tslint:disable-next-line: typedef
  public incrementItemToBasket(id: number)
  {
    this.incrementDecrementItemToBasket(id, 1);
  }

  // tslint:disable-next-line: typedef
  public decrementItemToBasket(id: number)
  {
    this.incrementDecrementItemToBasket(id, -1);
  }

  // tslint:disable-next-line: typedef
  public deleteItemFromBasket(id: number)
  {
    const basket = this.getCurrentBasketValue();
    const index = basket.items.findIndex(i => i.id === id);
    basket.items.splice(index, 1);
    this.setBasket(basket);
  }

  // tslint:disable-next-line: typedef
  private incrementDecrementItemToBasket(id: number, increment: number)
  {
    const basket = this.getCurrentBasketValue();
    const index = basket.items.findIndex(i => i.id === id);
    if ((increment < 0) && (basket.items[index].quantity === 1))
    {
      basket.items.splice(index, 1);
    }
    else
    {
      basket.items[index].quantity = basket.items[index].quantity + increment;
    }
    this.setBasket(basket);
  }

  // tslint:disable-next-line: typedef
  addItemToBasket(item: IProduct, quantity = 1)
  {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity);

    const basket = this.getCurrentBasketValue() ?? this.createBasket();

    // OBSERVAÇÃO: O operador "coalescing" faz o equivalente a:
    // let basket = this.getCurrentBasketValue();
    // if (basket === null)
    // {
    //   basket = this.createBasket();
    // }

    basket.items = this.AddOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  // tslint:disable-next-line: typedef
  private calculateTotals()
  {
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    // Parâmetro "a" representa o número que está sendo retornado
    // Parâmetro "b" representa o item
    // Valor inicial definido como "0" no último parâmetro
    const subtotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + shipping;
    this.basketTotalSource.next({shipping, total, subtotal});
  }

  private AddOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[]
  {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if (index === -1)
    {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    else
    {
      items[index].quantity += quantity;
    }
    return items;
  }

  private createBasket(): IBasket
  {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem
  {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType
    };
  }
}
