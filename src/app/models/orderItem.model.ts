import { Product } from "./produto.model";
import {v4 as uuidv4} from 'uuid';

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string,
  order: OrderItem[];
}