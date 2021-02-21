import { ShopperHistory } from "src/types/shopper-history";

export const mockShopperHistory : ShopperHistory[] = [
    {
        customerId : 12,
        products : [
            {
                "name": "Test Product B",
                "price": 101.99,
                "quantity": 1
              }
        ]
    },
    {
        customerId : 34,
        products : [
            {
                "name": "Test Product B",
                "price": 101.99,
                "quantity": 1
              }
        ]
    },
    {
        customerId : 34,
        products : [
            {
                "name": "Test Product A",
                "price": 99.99,
                "quantity": 20
              }
        ]
    }
]