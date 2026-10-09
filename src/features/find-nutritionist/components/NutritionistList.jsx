import { useMemo, useState } from "react";
import NutritionistCard from "./NutritionistCard";
import Button from "../../../shared/components/Button";

const ITEMS_PER_PAGE = 10;

export default function NutritionistList({ nutritionists }) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(
        nutritionists.length / ITEMS_PER_PAGE
    );

    const page = Math.min(
        currentPage,
        Math.max(1, totalPages)
    );

    const currentNutritionists = useMemo(() => {
        const start = (page - 1) * ITEMS_PER_PAGE;

        return nutritionists.slice(
            start,
            start + ITEMS_PER_PAGE
        );
    }, [nutritionists, page]);

    function goToPage(page) {
        setCurrentPage(page);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <section className="mt-8">
            <div className="space-y-4">
                {currentNutritionists.map(
                    (nutritionist) => (
                        <NutritionistCard
                            key={nutritionist.id}
                            nutritionist={nutritionist}
                        />
                    )
                )}
            </div>

            {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                    <Button
                        variant="pagination"
                        onClick={() =>
                            goToPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className="w-10 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        ‹
                    </Button>

                    {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                    ).map((page) => (
                        <Button
                            key={page}
                            variant={
                                currentPage === page
                                    ? "green"
                                    : "pagination"
                            }
                            onClick={() => goToPage(page)}
                        >
                            {page}
                        </Button>
                    ))}

                    <Button
                        variant="pagination"
                        onClick={() =>
                            goToPage(
                                Math.min(
                                    totalPages,
                                    currentPage + 1
                                )
                            )
                        }
                        disabled={currentPage === totalPages}
                        className="w-10 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        ›
                    </Button>
                </div>
            )}
        </section>
    );
}