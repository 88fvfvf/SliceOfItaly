interface IToTasty {
    id: number,
    title: string,
    image: string,
    price: number
}

export interface IProducts {
    id: number;
    images: string[];
    title: string;
    types?: string[];
    sizes?: string[];
    weight: string[];
    price: number;
    category: string;
    rating: number;
    description?: string;
    units?: string[];
    toTasty?: IToTasty[]
}
export interface IIngredients {
    id: number,
    ingredients: string
}