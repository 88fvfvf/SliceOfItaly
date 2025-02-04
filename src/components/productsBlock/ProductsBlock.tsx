import { Rate, Segmented } from 'antd';
import { useState } from 'react';
import { IProducts } from '../../types/Types';
import './ProductBlock.scss';
import { useAppDispatch } from '../../hooks/hooks';
import { addBasket } from '../../store/basket/basket.slice';

interface propsData {
    productData: IProducts;
}

interface Itasty {
    id: number;
    title: string;
    image: string;
    addPrice: number;
}

const ProductsBlock = ({ productData }: propsData) => {
    const [size, setSize] = useState(0);
    const [units, setUnits] = useState(0);
    const [type, setType] = useState("Традиционное");
    const [dataSize, setDataSize] = useState<string>("25 см");
    const [toTasty, setToTasty] = useState<Itasty[]>([]); // Массив объектов ингредиентов
    const [tasty, setTasty] = useState<string[]>([]);
    const dispatch = useAppDispatch();

    const toggleActive = (taste: Itasty) => {
        setToTasty((prev) => {
            const isActive = prev.some((item) => item.id === taste.id);
            return isActive ? prev.filter((item) => item.id !== taste.id) : [...prev, taste];
        });
        setTasty((prev) => {
            const isAlreadySelected = prev.includes(taste.title);
            if (isAlreadySelected) {
                return prev.filter((item) => item !== taste.title);
            } else {
                return [...prev, taste.title];
            }
        });
    };

    const handleSizeClick = (sizeName: string) => {
        const index = productData.sizes?.indexOf(sizeName);
        if (index !== undefined && index >= 0) {
            setSize(index);
            setDataSize(sizeName);
        }
    };

    const handleUnits = (unitName: string) => {
        const index = productData?.units?.indexOf(unitName);
        if (index !== -1) {
            setUnits(index!);
        }
    };

    const totalPriceProduct = () => {
        const basePrice = productData?.prices[size | units] || 0; // Используем индекс размера
        const ingredientsPrice = toTasty.reduce((sum, ingredient) => sum + ingredient.addPrice, 0);
        return basePrice + ingredientsPrice;
    };

    if (!productData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="ProductsBlock">
            <div className="img_product">
                <div className="img" data-size={dataSize}>
                    <img src={productData?.images[size || units]} alt="no image" loading="lazy" />
                </div>
            </div>
            <div className="product_details">
                <div className="product_title">
                    <h1>{productData?.title}</h1>
                    <span><Rate disabled defaultValue={productData?.rating} /></span>
                    <div className="product_about">
                        {productData?.types && <span>{type}, </span>}
                        {productData?.sizes && <span>{productData?.sizes[size]}, </span>}
                        <span>{productData?.weight[size || units]}</span>
                    </div>
                </div>
                {productData?.types && productData?.sizes && (
                    <div className="product_segment">
                        <div className="segment_sizes">
                            <Segmented options={productData.sizes} onChange={(e) => handleSizeClick(e)} block />
                        </div>
                        <div className="segment_types">
                            <Segmented options={productData?.types} onChange={(t) => setType(t)} block />
                        </div>
                    </div>
                )}
                {productData?.units && (
                    <div className="product_segment">
                        <div>
                            <Segmented options={productData?.units} onChange={(unit) => handleUnits(unit)} block />
                        </div>
                    </div>
                )}
                {productData?.toTasty && (
                    <>
                        <h3>Добавить по вкусу</h3>
                        <div className="product_addIngredients">
                            {productData?.toTasty?.map((taste) => (
                                <div
                                    className={`addIngredients ${toTasty.some((i) => i.id === taste.id) ? 'active' : ''}`}
                                    key={taste.id}
                                    onClick={() => toggleActive(taste)}
                                >
                                    <div className="addIngredients_img">
                                        <img src={taste.image} alt="no-image" width={110} loading="lazy" />
                                    </div>
                                    <div className="addIngredients_name">
                                        <p>{taste.title}</p>
                                        <strong>{taste.addPrice} ₽</strong>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                <button
                    onClick={() => {
                        const updatedProduct = {
                            ...productData,
                            ...(productData.sizes && { size: dataSize }),
                            ...(productData.types && { type }),
                            ...(productData.weight && { weightProduct: productData.weight[size || units] }),
                            ...(productData.toTasty && { tasty }),
                            ...(productData.units && { unit: units }),
                            finalPrice: totalPriceProduct()
                        };
                        dispatch(addBasket(updatedProduct));
                    }}
                >
                    Добавить в корзину за {totalPriceProduct()}₽
                </button>
            </div>
        </div>
    );
};

export default ProductsBlock;
