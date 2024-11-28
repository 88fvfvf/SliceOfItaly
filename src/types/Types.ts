export interface IProducts {
    id: number;
    images: string[];
    title: string;
    types?: string[];
    sizes?: string[];
    weight: number[] | number;
    price: number;
    category: string;
    rating: number;
    description?: string;
    units?: number[];
}
export interface IIngredients {
    id: number,
    ingredients: string
}