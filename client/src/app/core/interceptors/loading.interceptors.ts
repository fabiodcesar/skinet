import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { BusyService } from '../services/busy.service';

// Não esquecer de incluir "Injectable"
@Injectable()
export class LoadingInterceptor implements HttpInterceptor
{
    constructor(private busyService: BusyService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        if (!req.url.includes('emailexists'))
        {
            this.busyService.busy();
        }
        return next.handle(req).pipe(
            // Reativar delay para conferir como página se comporta com demora no carregamento
            // delay(500),
            finalize(() => {
                this.busyService.idle();
            }
        ));
    }
}
