import { Rate, Segmented } from 'antd'
import { useState } from 'react'
import { IProducts } from '../../types/Types'
import './ProductBlock.scss'
import { useAppDispatch } from '../../hooks/hooks'
import { addBasket } from '../../store/basket/basket.slice'

interface propsData {
    productData: IProducts
}

const ProductsBlock = ({ productData }: propsData) => {
    const [size, setSize] = useState(0)
    const [units, setUnits] = useState(0)
    const [type, setType] = useState("Традиционное")
    const [dataSize, setDataSize] = useState<string>("25 см")
    const [toTasty, setToTasty] = useState<number[]>([])
    const [tasty, setTasty] = useState<string[]>([])
    const dispatch = useAppDispatch()

    const toggleActive = (id: number) => {
        setToTasty((prev) => (
            prev.includes(id)
                ? prev.filter((divId) => divId !== id)
                : [...prev, id]
        ))
    }

    const handleSizeClick = (e: string) => {
        const index = productData?.sizes?.indexOf(e)

        if (index !== undefined && index !== -1) {
            setSize(index)
            setDataSize(e)
        } else {
            console.log("sizes not found");
        }
    }
    const handleUnits = (units: string) => {
        const indexUnits = productData?.units?.indexOf(units)
        if (indexUnits !== undefined && indexUnits !== -1) {
            setUnits(indexUnits)
        } else {
            alert("Oopps...")
        }
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
                {productData?.types && productData?.sizes ? (
                    <div className="product_segment">
                        <div className="segment_sizes">
                            <Segmented options={productData.sizes} onChange={(e) => handleSizeClick(e)} block />
                        </div>
                        <div className="segment_types">
                            <Segmented options={productData?.types} onChange={(t) => setType(t)} block />
                        </div>
                    </div>
                ) : (
                    null
                )}
                {productData?.units?.length ? (
                    <div className='product_segment'>
                        <div>
                            <Segmented options={productData?.units} onChange={(units) => handleUnits(units)} block />
                        </div>
                    </div>
                ) : (
                    null
                )}
                {productData?.toTasty ? (
                    <>
                        <h3>Добавить по вкусу</h3>
                        <div className="product_addIngredients">
                            {productData?.toTasty?.map(taste => (
                                <div
                                    className={`addIngredients ${toTasty.includes(taste.id) ? 'active' : ''}`}
                                    key={taste.id}
                                    onClick={() => {
                                        toggleActive(taste.id),
                                            setTasty((prev) =>
                                                prev.includes(taste.title)
                                                    ? prev.filter((item) => item !== taste.title)
                                                    : [...prev, taste.title]
                                            );
                                    }}
                                >
                                    <div className="addIngredients_img">
                                        <img src={taste.image} alt="no-image" width={110} loading="lazy" />
                                    </div>
                                    <div className="addIngredients_name">
                                        <p>{taste.title}</p>
                                        <strong>{taste.price} ₽</strong>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    null
                )
                }
                <button
                    onClick={() => {
                        const updatedProduct = {
                            ...productData,
                            size: dataSize,
                            type,
                            weightProduct: productData?.weight[size || units],
                            tasty: tasty,
                            unit: units
                        }
                        dispatch(addBasket(updatedProduct))
                    }
                    }>
                    Добавить в корзину за {productData?.price}₽
                </button>
            </div>
        </div >
    )
}

export default ProductsBlock