import { useEffect, useMemo, useState } from "react";
import NutritionistCard from "./NutritionistCard";
import Button from "../common/Button";

const ITEMS_PER_PAGE = 10;

export default function NutritionistList({ nutritionists }) {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [nutritionists]);

    const totalPages = Math.ceil(
        nutritionists.length / ITEMS_PER_PAGE
    );

    const currentNutritionists = useMemo(() => {
        const start =
            (currentPage - 1) * ITEMS_PER_PAGE;

        return nutritionists.slice(
            start,
            start + ITEMS_PER_PAGE
        );
    }, [nutritionists, currentPage]);

    if (nutritionists.length === 0) {
        return (
            <div className="py-16 text-center text-gray-500">
                No nutritionists found.
            </div>
        );
    }

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