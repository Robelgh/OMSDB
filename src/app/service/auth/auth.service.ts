import { Injectable } from "@angular/core";
import { Router, ActivatedRoute,NavigationExtras } from '@angular/router';
import { Observable, of } from "rxjs";
import { tap, delay } from "rxjs/operators";
import { jwtDecode } from "jwt-decode";

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const baseUrl = `${environment.apiUrl}/Account/login`;


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    reirectUrl: string|null = null;
    constructor(
        private router: Router,
        private http: HttpClient
    ){}

    auth(data:any) {
        return this.http.post<any>(baseUrl,data)
            .toPromise()
            .then(res => res)
            .then(data => data);
    }

    login(data: any) {
       
                const redirectUrl = "/";
                const navigationExtras: NavigationExtras = {
                  queryParamsHandling: "preserve",
                  preserveFragment: true,
                };
                localStorage.clear();
                 localStorage.setItem('token',data.token) 
                 this.router.navigate([redirectUrl], navigationExtras);  
    }
    isLoggedIn(): boolean{
        return (localStorage.getItem('token') == null ||  localStorage.getItem('token') == undefined)? false : true
    }

    logOut(): void {
        localStorage.clear();
        const redirectUrl = "/auth/login";
        this.router.navigate([redirectUrl]);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
      }
    
      isTokenExpired(): boolean {
        const token = this.getToken();
        if (!token) return true;
    
        const decoded: any = jwtDecode(token);
        for (let key in decoded) {
            if (key.includes('role')) {
              console.log(`Role: ${decoded[key]}`); // Output: Role: Admin
            }
          }
        const expirationDate = decoded.exp * 1000;
        return Date.now() > expirationDate;
      }

      getRole(): string{
        const token = this.getToken();
        let role='';
        const decoded: any = jwtDecode(token);
        for (let key in decoded) {
            if (key.includes('role')) {
               role= `${decoded[key]}`
            }
          }

          return role;
      }

      getId(){
        const token = this.getToken();
        let id='';
        const decoded: any = jwtDecode(token);
        for (let key in decoded) {
            if (key.includes('nameidentifier')) {
               id= `${decoded[key]}`
            }
          }
          return id;
      }
    
}