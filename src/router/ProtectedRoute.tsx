import { AccessDenied, IconEmailVerified } from "../../public/svg/icone";
import LoadingWrapper from "../hooks/LoadingWrapper";
import { useUserRole } from "../hooks/useUserRole";
import NotFound from "../page/NotFound/NotFound";

const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string }) => {
    const { user, role, loading } = useUserRole();

    return (
        <LoadingWrapper loading={loading && role === undefined}>
            {!user ? (
                <NotFound
                    title="Доступ запрещён"
                    paragraph="Данная страница доступна только для авторизованных пользователей."
                    SvgIcon={<AccessDenied />}
                />
            ) : !user.emailVerified ? (
                <NotFound
                    title="Подтвердите ваш E-Mail"
                    paragraph="Вы не можете получить доступ к этой странице, пока не подтвердите вашу почту."
                    SvgIcon={<IconEmailVerified />}
                />
            ) : requiredRole && role !== requiredRole ? (
                <NotFound
                    title="Доступ запрещён"
                    paragraph={`Данная страница доступна только для пользователей с ролью "${requiredRole}".`}
                    SvgIcon={<AccessDenied />}
                />
            ) : (
                children
            )}
        </LoadingWrapper>
    );
};

export default ProtectedRoute