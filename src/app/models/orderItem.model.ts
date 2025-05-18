import { Product } from "./produto.model";

export interface OrderItems {
    orderItems: Map<number, OrderItem>;
}

export interface OrderItem{
    product: Product,
    quantity: number
}