import { Product } from "./product";

export type ProductPopularity = Product & {
    customers: number[]
}