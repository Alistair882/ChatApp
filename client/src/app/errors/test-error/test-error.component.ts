import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-test-error',
  imports: [],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.scss',
})
export class TestErrorComponent {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  get500Error()
  {
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  };

  get401Error()
  {
    this.http.get(this.baseUrl + 'buggy/auth').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  };

  get404Error()
  {
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  };
  
  get400Error()
  {
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  };

  getBadRequestError()
  {
    this.http.post(this.baseUrl + 'account/login', {}).subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  };
}
