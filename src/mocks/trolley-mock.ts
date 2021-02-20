import { Trolley } from "../types/trolley";

export const mockTrolleyTotal = 20;

export const mockTrolley: Trolley = {
    "products": [
        {
            "name": "A",
            "price": 10
        }
    ],
    "specials": [
        {
            "quantities": [
                {
                    "name": "A",
                    "quantity": 20
                }
            ],
            "total": 0
        }
    ],
    "quantities": [
        {
            "name": "A",
            "quantity": 2
        }
    ]
};