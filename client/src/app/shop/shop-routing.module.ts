import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {path: '', component: ShopComponent},
  // Em "data" nome do o alias do serviço de breadcrumb está sendo definido, que será acessado em "product-details.component"
  {path: ':id', component: ProductDetailsComponent, data: {breadcrumb: {alias: 'productDetails'}}}
];

@NgModule({
  declarations: [],
  imports: [
    // As rotas não ficarão disponíveis para o "app-module" mas apenas para "shop-module"
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ShopRoutingModule { }