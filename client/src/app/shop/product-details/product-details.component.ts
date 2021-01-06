import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity = 1;

  constructor(private shopService: ShopService,
              private basketService: BasketService,
              private activateRoute: ActivatedRoute,
              private breadcrumbService: BreadcrumbService) {
    // Evita que código do produto seja exibido no breadcrumb durante carregamento da página
    this.breadcrumbService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  // tslint:disable-next-line: typedef
  loadProduct()
  {
    // O sinal '+' faz o casting de string para number
    const productId: number = +this.activateRoute.snapshot.paramMap.get('id');
    this.shopService.getpProduct(productId).subscribe(product => {
      this.product = product;
      // Define como primeiro parâmetro do serviço de breadcrumb o nome do alias
      this.breadcrumbService.set('@productDetails', product.name);
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  incrementQuantity()
  {
    if (this.quantity < 10)
    {
    this.quantity++;
    }
  }

  // tslint:disable-next-line: typedef
  decrementQuantity()
  {
    if (this.quantity > 1)
    {
      this.quantity--;
    }
  }

  // tslint:disable-next-line: typedef
  addItemToBasket()
  {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }
}
