interface IToTasty {
    id: number,
    title: string,
    image: string,
    addPrice: number
}

export interface IProducts {
    id: number;
    images: string[];
    title: string;
    types?: string[];
    sizes?: string[];
    weight: string[];
    prices: number[];
    finalPrice: number
    category: string;
    rating: number;
    description?: string;
    units?: string[];
    toTasty?: IToTasty[]
    count: number;
    size?: string
    type?: string
    weightProduct?: string
    tasty: string[]
    unit: number
}
export interface IIngredients {
    id: number,
    ingredients: string
}

// Data Type for OrderHistory

export interface IUserData {
    name: string;
    email: string;
    address: string;
    extraInfo: string;
    status: string;
    timestamp: string;
    totalPrice: number;
}

export interface DataType {
    id: string;
    basket?: IProducts[];
    timestamp: string;
    userData: IUserData;
}
// Data Type for ProcessingOrders
export interface IProcessingOrders {
    id: string;
    userId: string;
    basket: IProducts[];
    totalPrice?: string;
    status?: string;
}