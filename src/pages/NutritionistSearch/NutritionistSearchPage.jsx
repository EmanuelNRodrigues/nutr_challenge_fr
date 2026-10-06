import { useState } from "react";
import NutritionistSearchForm from "../../components/nutritionists/NutritionistSearchForm";
import NutritionistList from "../../components/nutritionists/NutritionistList";
import Loading from "../../components/common/Loading";
import { searchNutritionists } from "../../services/nutritionistService";

export default function NutritionistSearchPage() {
    const [nutritionists, setNutritionists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    async function handleSearch({ query, location }) {
        setLoading(true);
        setHasSearched(true);

        try {
            const results = await searchNutritionists({
                query,
                location,
            });

            setNutritionists(results);
        } catch (error) {
            console.error("Error searching nutritionists:", error);
            setNutritionists([]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-[rgb(61,170,141)]">
                <div className="mx-auto flex max-w-7xl items-center px-6 py-4">
                    <div className="flex items-center gap-3 text-white">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                            <span className="text-2xl">✚</span>
                        </div>

                        <span className="text-2xl font-bold">
                            nutrium
                        </span>
                    </div>
                </div>
            </header>

            {/* Search section */}
            <section className="bg-[rgb(61,170,141)]">
                <div className="mx-auto max-w-7xl px-6 pb-10 pt-6">
                    <h1 className="mb-6 text-3xl font-bold text-white">
                        Find a Nutritionist
                    </h1>

                    <NutritionistSearchForm
                        onSearch={handleSearch}
                    />
                </div>
            </section>

            {/* Results section */}
            <main className="bg-white">
                <div className="mx-auto max-w-7xl px-6 py-8">
                    {loading ? (
                        <div className="flex justify-center py-16">
                            <Loading />
                        </div>
                    ) : (
                        <NutritionistList
                            nutritionists={nutritionists}
                            hasSearched={hasSearched}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}
