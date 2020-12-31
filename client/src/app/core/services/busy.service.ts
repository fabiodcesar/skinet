import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  busyRequstCount = 0;

  constructor(private spinnerService: NgxSpinnerService) { }

  // tslint:disable-next-line: typedef
  busy()
  {
    this.busyRequstCount++;
    this.spinnerService.show(undefined, {
      type: 'timer',
      bdColor: 'rgba(255, 255, 255, 0.7)',
      color: '#333333'
    });
  }

  // tslint:disable-next-line: typedef
  idle()
  {
    this.busyRequstCount--;
    if (this.busyRequstCount <= 0)
    {
      this.busyRequstCount = 0;
      this.spinnerService.hide();
    }
  }
}
