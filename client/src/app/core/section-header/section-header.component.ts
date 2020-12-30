import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent implements OnInit {
  // By convention, all observables has a dollar sign on the end of it's name
  breadcrumb$: Observable<any[]>;

  constructor(private breadCrumbService: BreadcrumbService) {  }

  ngOnInit(): void {
    // Populating the observable to be used in the template
    this.breadcrumb$ = this.breadCrumbService.breadcrumbs$;
  }

}
