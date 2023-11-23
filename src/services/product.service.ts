import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 url = 'https://localhost:7257/api';
  constructor(private httpclient: HttpClient) { }

  GetProducts() {
    return this.httpclient.get(this.url + '/products/get');
  }
}
