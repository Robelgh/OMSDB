import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderListComponent } from './orderList.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: OrderListComponent }
	])],
	exports: [RouterModule]
})
export class OrderListRoutingModule { }
