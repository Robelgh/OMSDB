import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';
import { environment } from '../../environments/environment';

const baseUrl = `${environment.apiUrl}/ProductType`;

@Injectable()
export class ProductTypeService {

    constructor(private http: HttpClient) { }

    getAllProductType() {
        return this.http.get<any>(baseUrl)
            .toPromise()
            .then(res => res)
            .then(data => data);
    }
    addProductType(productType:any) {
        return this.http.post<any>(baseUrl,productType)
            .toPromise()
            .then(res => res)
            .then(data => data);
    }

    getProducts() {
        return this.http.get<any>('assets/demo/data/products.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }
}
