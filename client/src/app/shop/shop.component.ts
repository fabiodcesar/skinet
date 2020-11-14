import { Component, OnInit } from '@angular/core';
import { IBrand } from '../shared/models/brands';
import { IProduct } from '../shared/models/product';
import { IProductType } from '../shared/models/productType';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: IProduct[];
  brands: IBrand[];
  productTypes: IProductType[];
  brandIdSelected: number;
  typeIdSelected: number;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getProductTypes();
  }

  // tslint:disable-next-line: typedef
  getProducts() {
    this.shopService.getProducts(this.brandIdSelected, this.typeIdSelected).subscribe(response => {
      this.products = response.data;
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  getBrands() {
    this.shopService.getBrands().subscribe(response => {
      // The three dots is a "spread operator" that joins 2 arrays
      this.brands = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  getProductTypes() {
    this.shopService.getTypes().subscribe(response => {
      // The three dots is a "spread operator" that joins 2 arrays
      this.productTypes = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  onBrandSelected(brandId: number)
  {
    this.brandIdSelected = brandId;
    this.getProducts();
  }

   // tslint:disable-next-line: typedef
   onProductTypeSelected(typeId: number)
   {
     this.typeIdSelected = typeId;
     this.getProducts();
   }
}
