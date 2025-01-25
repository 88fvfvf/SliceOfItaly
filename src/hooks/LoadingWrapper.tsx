import LoadSpin from "../components/loadSpin/LoadSpin";

const LoadingWrapper = ({ loading, children }: { loading: boolean; children: React.ReactNode }) => {
    if (loading) {
        return <LoadSpin />;
    }
    return <>{children}</>;
};

export default LoadingWrapper