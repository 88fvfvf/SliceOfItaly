export interface IPizza {
    id: number;
    images: string[];
    title: string;
    types: string[];
    sizes: number[];
    weight: number[];
    price: number;
    rating: number;
    description: string;
}

interface IProduct {
    id: number;
    title: string;
    images: string[];
    description: string;
    price: number;
    servings: number[]; // Переименовано из units для ясности
    weight: number[];
    rating: number;
}

export interface IDrinks {
    id: number;
    title: string;
    images: string[];
    weight: number;
    price: number;
    rating: number;
}
export interface IBreakfast extends IProduct { }
export interface ISnacks extends IProduct { }
export interface ICocktails extends IProduct { }
export interface IDesserts extends IProduct { }

export type Item = IPizza | IBreakfast | ISnacks | ICocktails | IDrinks | IDesserts;

export interface ICategories {
    id: number
    categories: string
}