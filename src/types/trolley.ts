
type TrolleyProduct = {
    name: string,
    price: number
};

type TrolleyQuantity = {
    name: string,
    quantity: number
};

type TrolleySpecials = {
    quantities: TrolleyQuantity[],
    total: number
};

export type Trolley = {
    products: TrolleyProduct[],
    specials: TrolleySpecials[],
    quantities: TrolleyQuantity[]
}