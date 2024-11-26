import { Component, OnInit,NgZone } from '@angular/core';
import { Product } from 'src/app/api/product';
import { CreateOrder,order } from 'src/app/api/order';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/service/product.service';
import { ProductTypeService } from 'src/app/service/productType.service';
import { OrderService } from 'src/app/service/order.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MapTo } from 'src/app/service/map.service';

@Component({
    templateUrl: './orderList.component.html',
    providers: [MessageService]
})
export class OrderListComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];
    createOrder:any={};
    order:order={};
    orderList: any=[];
    product: Product = {};
    Listproducts:any=[];

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private productService: ProductService,
                private messageService: MessageService,
                private productType: ProductTypeService,
                private orderService: OrderService,
                private mapto: MapTo,
                private authService:AuthService,
                private ngzone: NgZone) { }

    ngOnInit() {
       this.populate();
        

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'quantity', header: 'Category' },
            { field: 'orderStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }
    populate()
    {
        this.productService.getProducts().then(data => this.products = data);
       
        this.productType.getAllProductType().then(data => {
            this.Listproducts = data
        });

        this.orderService.getAllOrder().then(data => {
            this.orderList=data;
            console.log(data)
        })
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.createOrder = { ...product };
        this.createOrder.commandApprove=1;
        this.orderService.updateOrder(this.mapto.convertJsonToFormData(this.createOrder)).then(data=>{
            if(data.success)
            {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Order Updated', life: 3000 });
                this.ngzone.run(()=>{
                    this.populate();
                    this.hideDialog();
                })
            }
            else{
                this.messageService.add({ severity: 'error', summary: 'error', detail: data.message, life: 3000 });
            }
        });
    }

    deleteProduct(product: Product) {
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
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;
            this.createOrder.productId=(this.product.inventoryStatus).toString();
            this.createOrder.CreatedBy=this.authService.getId();

            console.log(this.createOrder)
          
            this.orderService.addOrder(this.mapto.convertJsonToFormData(this.createOrder)).then(data=>{
                if(data.success)
                {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Order Created', life: 3000 });
                    this.ngzone.run(()=>{
                        this.populate();
                        this.hideDialog();
                    })
                }
                else{
                    this.messageService.add({ severity: 'error', summary: 'error', detail: data.message, life: 3000 });
                }
            });
           
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    getSelectedProductName(id: number): string {
        const selectedProduct = this.Listproducts.find(product => product.id === id);
        return selectedProduct ? selectedProduct.name : '';
      }
}
