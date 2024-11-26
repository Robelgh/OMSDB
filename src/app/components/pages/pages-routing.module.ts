import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { authGuardGuard, roleGuard } from 'src/app/service/auth/auth-guard.guard';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'order', loadChildren: () => import('./order/order.module').then(m => m.OrderModule) },
         { path: 'producttype', loadChildren: () => import('./productType/productType.module').then(m => m.ProductTypeModule), canActivate: [roleGuard] },
         { path: 'orderlist', loadChildren: () => import('./orderList/orderList.module').then(m => m.OrderListModule), canActivate: [roleGuard] },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
