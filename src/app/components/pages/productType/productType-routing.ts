import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductTypeComponent } from './productType.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ProductTypeComponent }
	])],
	exports: [RouterModule]
})
export class ProductTypeRoutingModule { }
