import { useEffect, useState } from "react";
import NutritionistSearchForm from "../../components/nutritionists/NutritionistSearchForm";
import NutritionistList from "../../components/nutritionists/NutritionistList";
import Loading from "../../components/common/Loading";
import PageContainer from "../../components/layout/PageContainer";
import { searchNutritionists } from "../../services/nutritionistService";

export default function NutritionistSearchPage() {
    const [nutritionists, setNutritionists] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchNutritionists({ query = "", location = "" } = {}) {
        setLoading(true);

        try {
            const results = await searchNutritionists({
                query,
                location,
            });

            setNutritionists(results);
        } catch (error) {
            console.error("Error fetching nutritionists:", error);
            setNutritionists([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNutritionists();
    }, []);

    async function handleSearch({ query, location }) {
        await fetchNutritionists({
            query,
            location,
        });
    }

    return (
        <>
            {/* Search section */}
            <section className="bg-[rgb(61,170,141)]">
                <PageContainer>
                    <div className="pb-10 pt-6">
                        <h1 className="mb-6 text-3xl font-bold text-white">
                            Find a Nutritionist
                        </h1>

                        <NutritionistSearchForm
                            onSearch={handleSearch}
                        />
                    </div>
                </PageContainer>
            </section>

            {/* Results section */}
            <section className="bg-white">
                <PageContainer>
                    <div className="py-8">
                        {loading ? (
                            <div className="flex justify-center py-16">
                                <Loading />
                            </div>
                        ) : (
                            <NutritionistList
                                nutritionists={nutritionists}
                            />
                        )}
                    </div>
                </PageContainer>
            </section>
        </>
    );
}