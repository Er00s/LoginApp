import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { item } from '../interfaces/item-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(private http: HttpClient) {}

  //request GET 'http://churrasco.uk.to:3005/products' \--header 'Authorization: Bearer <token>'

  getItems() {
    const token: string = `Bearer ${localStorage.getItem('token')}`;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token ? token : '',
      }),
    };

    return this.http.get(`${base_url}/products`, httpOptions);
  }

  // POST 'http://localhost:3000/addproduct'
  postItem(itemForm: item) {
    const token: string = `Bearer ${localStorage.getItem('token')}`;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: token ? token : '',
      }),
    };

    return this.http.post(`${base_url}/addproduct`, itemForm, httpOptions);
  }
}
