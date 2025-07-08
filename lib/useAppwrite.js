import { useCallback, useEffect, useState } from "react"
import { Alert } from "react-native";

const useAppwrite = ({ fn, params = {}, skip = false }) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(!skip)
    const [error, setError] = useState(null);

    const fetchData = useCallback(
        async (fetchParams) => {
            setLoading(true);
            setError(null);

            try {
                const result = await fn({ ...fetchParams });
                setData(result);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
                setError(errorMessage);
                Alert.alert("Error", errorMessage);
            } finally {
                setLoading(false)
            }
        },
        [fn]
    );

    useEffect(() => {
        if (!skip) {
            fetchData(params)
        }
    }, []);

    const refetch = async (newParams = params) => {
        await fetchData(newParams);
    };
    return { data, loading, error, refetch }
}

export default useAppwrite;