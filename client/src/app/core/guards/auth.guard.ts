import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';

// Lição 203
// Como um serviço, injetável.
// É injetado no app module no start
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(
    // Estes são os roots que estão tentando ser ativados
    route: ActivatedRouteSnapshot,
    // Estado da rota atual, podemos usar isso para saber de onde o usuário está vindo
    // Pode retornar Observable, Promisse, Boolean ou UrlTree. Para o projeto precisamos apenas retornar Observable<bool>
    // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    state: RouterStateSnapshot): Observable<boolean> {

    // Quando ativas as rotas e queremos observar algo ou quando queremos checar o que está alí dentro
    // nós não precisamos nos inscrever (subscrive) porque o router já se inscreve por nós e também se desinscreve também.
    return this.accountService.currentUser$.pipe(
      map(auth => {
        if (auth) {
          return true;
        }
        this.router.navigate(['account/login'], {queryParams: {returnUrl: state.url}});
      })
    );
  }
}
