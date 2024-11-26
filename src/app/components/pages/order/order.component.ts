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
    templateUrl: './order.component.html',
    providers: [MessageService]
})
export class OrderComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;
    isUpdate:boolean=false;

    products: Product[] = [];
    createOrder:any={};
    order:any={};
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
                private authService:AuthService,
                private mapto: MapTo,
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
            console.log(data)
            console.log(this.authService.getId())
            this.orderList=data.filter((x)=> x.createdBy === this.authService.getId());
            console.log(this.orderList)
        })
    }

    openNew() {
        this.product = {};
        this.createOrder={};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.createOrder = { ...product };
        this.productDialog = true;
        this.isUpdate=true;
    }

    deleteProduct(id: Product) {
        this.deleteProductDialog = true;
        this.order.id = id;
    }

    confirmDeleteSelected() {
       
        // this.deleteProductsDialog = false;
        // this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        // this.selectedProducts = [];
    }

    confirmDelete() {
        
        this.orderService.deleteOrder(this.order.id).then(data=>{
            if(data.success)
            {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: data.message, life: 3000 });
                this.ngzone.run(()=>{
                    this.populate();
                    this.deleteProductDialog  = false
                })
            }
            else{
                this.messageService.add({ severity: 'error', summary: 'error', detail: data.message, life: 3000 });
            }
        });
     
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
        this.isUpdate= false;
    }

    saveProduct() {
        this.submitted = true;
     
        if(this.isUpdate)
        {
            this.orderService.updateOrder(this.mapto.convertJsonToFormData(this.createOrder)).then(data=>{
                if(data.success)
                {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Order Created', life: 3000 });
                    this.ngzone.run(()=>{
                        this.populate();
                        this.hideDialog();
                        this.createOrder={};
                    })
                }
                else{
                    this.messageService.add({ severity: 'error', summary: 'error', detail: data.message, life: 3000 });
                }
            });
        }
        else{
            this.createOrder.productId=(this.product.inventoryStatus).toString();
            this.createOrder.CreatedBy=this.authService.getId();;

          
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
