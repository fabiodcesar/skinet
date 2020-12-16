import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
  baseUrl = environment.apiUrl;

  // Armazena mensagens de erro de validação para serem exibidas em lista
  validationErrors: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  // TODO: Revisar porque a mensagem de erro não está sendo retornada como esperado
  // tslint:disable-next-line: typedef
  get404Error()
  {
    console.log(this.baseUrl + 'products/42');
    this.http.get(this.baseUrl + 'products/42').subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  get500Error()
  {
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  get400Error()
  {
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  get400ValidationError()
  {
    this.http.get(this.baseUrl + 'products/fortyTwo').subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
      this.validationErrors = error.errors;
    });
  }
}
