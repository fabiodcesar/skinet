import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brands';
import { IProduct } from '../shared/models/product';
import { IProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: true}) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  productTypes: IProductType[];
  shopParams = new ShopParams();
  totalCount: number;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'},
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getProductTypes();
  }

  // tslint:disable-next-line: typedef
  getProducts() {
    this.shopService.getProducts(this.shopParams)
    .subscribe(response => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
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
    this.shopParams.brandId = brandId;
    this.getProducts();
  }

   // tslint:disable-next-line: typedef
   onProductTypeSelected(typeId: number)
   {
     this.shopParams.typeId = typeId;
     this.shopParams.pageNumber = 1;
     this.getProducts();
   }

   // tslint:disable-next-line: typedef
   onSortSelected(sort: string) {
     this.shopParams.sort = sort;
     this.shopParams.pageNumber = 1;
     this.getProducts();
   }

   // tslint:disable-next-line: typedef
   onPageChanged(event: any) {
     if (this.shopParams.pageNumber !== event)
     {
        this.shopParams.pageNumber = event;
        this.getProducts();
      }
   }

   // tslint:disable-next-line: typedef
   onSearch()
   {
     this.shopParams.search = this.searchTerm.nativeElement.value;
     this.shopParams.pageNumber = 1;
     this.getProducts();
   }

    // tslint:disable-next-line: typedef
    onReset(){
      this.searchTerm.nativeElement.value = '';
      this.shopParams = new ShopParams();
      this.shopParams.pageNumber = 1;
      this.getProducts();
    }
}
