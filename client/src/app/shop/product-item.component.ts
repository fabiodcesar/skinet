import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from '../basket/basket.service';
import { IProduct } from '../shared/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: IProduct;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
  }

  RouteProductDetails(productId: number): string {
    return '/shop/' + productId;
  }

  // tslint:disable-next-line: typedef
  addItemToBasket()
  {
    this.basketService.addItemToBasket(this.product);
  }
}
