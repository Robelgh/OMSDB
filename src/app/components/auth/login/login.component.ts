import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Login } from 'src/app/api/login';
import { AuthService } from '../../../service/auth/auth.service';
import { MapTo } from 'src/app/service/map.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute,NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];
    loginModel: Login = {};
    errorMessage:string=null;
    password!: string;

    constructor(public layoutService: LayoutService,private messageService:MessageService, private authService:AuthService,private mapto:MapTo, private router: Router) { }

    login(){
        this.authService.auth(this.mapto.convertJsonToFormData(this.loginModel)).then(data => {
            if(data.success)
            {
                this.authService.login(data)
            }
            else{
               this.errorMessage=data.message
            }
        });
        
    }
        
      
}
