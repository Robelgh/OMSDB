import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../service/auth/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService, private authService:AuthService) { }

    ngOnInit() {
        if(this.authService.getRole().toLocaleUpperCase() == "USER")
        {
            this.model = [
                {
                    label: 'Home',
                    items: [
                        { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                    ]
                },
                {
                    label: 'Pages',
                    icon: 'pi pi-fw pi-briefcase',
                    items: [
                        
                        {
                            label: 'Order',
                            icon: 'pi pi-fw pi-pencil',
                            routerLink: ['/pages/order']
                        }
                      
                    ]
                },
            
               
            ];
        }
        else{
            this.model = [
                {
                    label: 'Home',
                    items: [
                        { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                    ]
                },
                {
                    label: 'Pages',
                    icon: 'pi pi-fw pi-briefcase',
                    items: [
                        
                        {
                            label: 'Order',
                            icon: 'pi pi-fw pi-pencil',
                            routerLink: ['/pages/order']
                        },
                        {
                            label: 'Order List',
                            icon: 'pi pi-fw pi-list',
                            routerLink: ['/pages/orderlist']
                        },
                        {
                            label: 'Product Type',
                            icon: 'pi pi-fw pi-align-right',
                            routerLink: ['/pages/producttype']
                        },
                    ]
                },
            
               
            ];
        }
     
    }
}
