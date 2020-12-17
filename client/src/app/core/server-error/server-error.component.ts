import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss']
})
export class ServerErrorComponent implements OnInit {
  error: any;

  // Importante: Navigation error só é visível nesse constructor. Se for passado em ngOInit será "undefined"
  constructor(private router: Router)
  {
    const navigation = router.getCurrentNavigation();
    this.error = navigation && navigation.extras && navigation.extras.state && navigation.extras.state.error;
  }

  ngOnInit(): void {
  }

}
