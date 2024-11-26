import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';
import { environment } from '../../environments/environment';

const baseUrl = `${environment.apiUrl}/Order`;

@Injectable()
export class OrderService {

    constructor(private http: HttpClient) { }

    addOrder(productType:any) {
        return this.http.post<any>(baseUrl,productType)
            .toPromise()
            .then(res => res)
            .then(data => data);
    }

    getAllOrder() {
        return this.http.get<any>(baseUrl)
            .toPromise()
            .then(res => res)
            .then(data => data);
    }

    updateOrder(productType:any) {
        return this.http.put<any>(baseUrl,productType)
            .toPromise()
            .then(res => res)
            .then(data => data);
    }
    deleteOrder(id:any) {
        return this.http.delete<any>(baseUrl + "/" + id)
            .toPromise()
            .then(res => res)
            .then(data => data);
    }
    getAllPendingOrder(productType:any) {
        return this.http.post<any>(baseUrl,productType)
            .toPromise()
            .then(res => res)
            .then(data => data);
    }

    getAllDeliveredOrder(productType:any) {
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
