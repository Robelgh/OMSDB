interface InventoryStatus {
    label: string;
    value: string;
}
export interface CreateOrder {
    productId?: string;
    price?: number;
    quantity?: number;
    CreatedBy?:string;
}

export interface order {
    orderCode?: string;
    orderStatus?: number;
    price?: number;
    quantity?: number;
    CreatedBy?:string;
}