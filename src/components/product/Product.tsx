import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useFetchProductByTitleQuery } from "../../store/api/api.pizza";
import ProductsBlock from "../productsBlock/ProductsBlock";
import './product.scss';

const Product = () => {
    const { title } = useParams<{ title: string }>()
    const { data: allProducts } = useFetchProductByTitleQuery(undefined, {
        skip: !title
    })

    const productFromCache = allProducts?.find(
        (product) => product.title === title
    )

    const { data: product, isLoading, isError } = useFetchProductByTitleQuery(title!, {
        skip: !!productFromCache
    })

    if (isLoading) return <p>Loading product...</p>;
    if (isError) return <p>Error loading product!</p>;

    const productData = productFromCache || product;

    return (
        <div className="Product">
            <Helmet>
                <title>{productData?.title} — SliceOfItaly</title>
                <meta name="description" content={productData?.description} />
                <meta property="og:title" content={`${productData?.title} — SliceOfItaly`} />
                <meta property="og:description" content={productData?.description} />
                <meta property="og:image" content={productData?.images[0]} />
                <meta property="og:type" content="Pizza - Пиццы" />
            </Helmet>
            <div className="container">
                <Header />
                <div className="Breadcrumb">
                    <ol>
                        <Link to={'/'}>
                            <li>Главная</li>
                        </Link>
                        <span>/</span>
                        <li>{productData?.category}</li>
                        <span>/</span>
                        <li className="active">{productData?.title}</li>
                    </ol>
                </div>
                <ProductsBlock productData={productData!} />
            </div>
        </div>
    )
}

export default Product