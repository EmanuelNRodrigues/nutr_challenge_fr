import { useMemo, useState } from "react";
import NutritionistCard from "./NutritionistCard";

const ITEMS_PER_PAGE = 10;

export default function NutritionistList({
                                             nutritionists,
                                             hasSearched,
                                         }) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(
        nutritionists.length / ITEMS_PER_PAGE
    );

    const currentNutritionists = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;

        return nutritionists.slice(
            start,
            start + ITEMS_PER_PAGE
        );
    }, [nutritionists, currentPage]);

    if (!hasSearched) {
        return (
            <div className="py-16 text-center text-gray-500">
                Search for a nutritionist to get started.
            </div>
        );
    }

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
                {currentNutritionists.map((nutritionist) => (
                    <NutritionistCard
                        key={nutritionist.id}
                        nutritionist={nutritionist}
                    />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                    <button
                        onClick={() =>
                            goToPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        ‹
                    </button>

                    {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                    ).map((page) => (
                        <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`
                                h-10 min-w-10 rounded-lg px-3
                                font-medium
                                ${
                                currentPage === page
                                    ? "bg-[rgb(61,170,141)] text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                            }
                            `}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() =>
                            goToPage(
                                Math.min(
                                    totalPages,
                                    currentPage + 1
                                )
                            )
                        }
                        disabled={currentPage === totalPages}
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        ›
                    </button>
                </div>
            )}
        </section>
    );
}