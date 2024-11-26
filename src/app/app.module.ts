import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductService } from './service/product.service';
import { ProductTypeService } from './service/productType.service';
import { OrderService } from './service/order.service';
import { MessageService } from 'primeng/api';

import { PhotoService } from './service/photo.service';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        PhotoService, ProductService,ProductTypeService,MessageService,OrderService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
