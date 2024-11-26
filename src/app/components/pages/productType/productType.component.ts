import { Component, OnInit,NgZone } from '@angular/core';
import { ProductType } from 'src/app/api/productType';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductTypeService } from 'src/app/service/productType.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MapTo } from 'src/app/service/map.service';

@Component({
    templateUrl: './productType.component.html',
    providers: [MessageService]
})
export class ProductTypeComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: ProductType[] = [];

    product: ProductType = {};

    selectedProducts: ProductType[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private producttypeService: ProductTypeService,private authService:AuthService, private ngzone:NgZone, private mapto:MapTo, private messageService: MessageService) { }

    ngOnInit() {
       this.populate();
        

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    populate()
    {
        this.producttypeService.getAllProductType().then(data => {
            this.products = data
            console.log(this.products)
        });
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: ProductType) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: ProductType) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.Id !== this.product.Id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;
        if (this.product.Name?.trim()) {
            this.product.Id="00000000-0000-0000-0000-000000000000";
            this.product.CreatedBy=this.authService.getId();

            this.producttypeService.addProductType(this.mapto.convertJsonToFormData(this.product)).then(data=>{
                if(data.success)
                {
                    this.ngzone.run(()=>{
                        this.populate();
                        this.hideDialog();
                    })
                }
            });
           
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].Id === id) {
                index = i;
                break;
            }
        }

        return index;
    }



    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
