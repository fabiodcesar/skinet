import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { IBasket } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;

  constructor(private basketService: BasketService) { }

    ngOnInit(): void {
      this.basket$ = this.basketService.basket$;
    }

    // tslint:disable-next-line: typedef
    public incrementItemToBasket(id: number)
    {
      this.basketService.incrementItemToBasket(id);
    }

    // tslint:disable-next-line: typedef
    public decrementItemToBasket(id: number)
    {
      this.basketService.decrementItemToBasket(id);
    }

    // tslint:disable-next-line: typedef
    public deleteItemFromBasket(id: number)
    {
      this.basketService.deleteItemFromBasket(id);
    }
}
