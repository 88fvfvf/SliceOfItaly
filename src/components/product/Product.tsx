import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useFetchProductByTitleQuery } from "../../store/api/api.pizza";
import ProductsBlock from "../productsBlock/ProductsBlock";
import './product.scss';
import NotFound from "../../page/NotFound/NotFound";
import LoadSpin from "../loadSpin/LoadSpin";
import Footer from "../footer/Footer";

const Product = () => {
    const { title } = useParams<{ title: string }>()
    const { data: products, isLoading, isError } = useFetchProductByTitleQuery(title || "");

    const productData = products && products.length > 0 ? products.find(product => product.title === title) : null;

    if (isLoading) return <LoadSpin />;
    if (isError || !productData) return <NotFound />;

    return (
        <div className="Product">
            <Helmet>
                <title>{productData.title} — SliceOfItaly</title>
                <meta name="description" content={productData.description} />
                <meta property="og:title" content={`${productData.title} — SliceOfItaly`} />
                <meta property="og:description" content={productData.description} />
                <meta property="og:image" content={productData.images[0]} />
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
                        <li>{productData.category}</li>
                        <span>/</span>
                        <li className="active">{productData.title}</li>
                    </ol>
                </div>
                <ProductsBlock productData={productData} />
            </div>
            <Footer />
        </div>
    )
}

export default Product