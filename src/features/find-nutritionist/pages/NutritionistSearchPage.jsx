import NutritionistSearchForm from "../components/NutritionistSearchForm";
import NutritionistList from "../components/NutritionistList";
import Loading from "../../../shared/components/Loading";
import PageContainer from "../../../shared/layout/PageContainer";
import useNutritionists from "../hooks/useNutritionists";

export default function NutritionistSearchPage() {
    const {
        nutritionists,
        loading,
        search,
    } = useNutritionists();

    return (
        <>
            {/* Search section */}
            <section className="bg-[rgb(61,170,141)]">
                <PageContainer>
                    <div className="pb-10 pt-6">
                        <h1 className="mb-6 text-3xl font-bold text-white">
                            Find a Nutritionist
                        </h1>

                        <NutritionistSearchForm onSearch={search} />
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
