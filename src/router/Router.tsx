import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFoundIcon } from "../../public/svg/icone";
import App from "../page/home/App";
import NotFound from "../page/NotFound/NotFound";
import OrderPage from "../page/orderPage/OrderPage";
import ProductPage from "../page/productPage/ProductPage";
import ProfilePage from "../page/profilePage/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/product/:title" element={<ProductPage />} />
                    <Route
                        path="/order"
                        element={
                            <ProtectedRoute>
                                <OrderPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute requiredRole="admin">
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <NotFound
                                title="Страница не найдена"
                                paragraph="Проверьте корректность введённого адреса или повторите попытку позже"
                                SvgIcon={<NotFoundIcon />}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </HelmetProvider>
    );
};

export default Router;
