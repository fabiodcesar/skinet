import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute, private breadcrumbService: BreadcrumbService) { }

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
}
