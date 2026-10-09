import { useCallback, useEffect, useState } from "react";
import { searchNutritionists } from "../services/nutritionistService";

export default function useNutritionists() {
    const [nutritionists, setNutritionists] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNutritionists = useCallback(
        async ({ query = "", location = "" } = {}) => {
            setLoading(true);

            try {
                const results = await searchNutritionists({
                    query,
                    location,
                });

                setNutritionists(results);
            } catch (error) {
                // This should be a message to the user
                console.error("Error fetching nutritionists:", error);
                setNutritionists([]);
            } finally {
                setLoading(false);
            }
        },
        []
    );

    useEffect(() => {
        fetchNutritionists();
    }, [fetchNutritionists]);

    return {
        nutritionists,
        loading,
        search: fetchNutritionists,
    };
}
