import { useState } from "react";
import Button from "../../../shared/components/Button";

export default function NutritionistSearchForm({ onSearch }) {
    const [query, setQuery] = useState("");
    const [location, setLocation] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        onSearch({
            query,
            location,
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-end gap-4">
                {/* Name / Service */}
                <div className="flex-1">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Name or Service"
                        title="Search by nutritionist name or service"
                        className="
                            h-12 w-full rounded-lg
                            border-0 bg-white px-4
                            text-gray-800
                            shadow-sm
                            outline-none
                            placeholder:text-gray-400
                            focus:ring-2
                            focus:ring-white/60
                        "
                    />
                </div>

                {/* Location */}
                <div className="flex-1">
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Location"
                        title="Search by location"
                        className="
                            h-12 w-full rounded-lg
                            border-0 bg-white px-4
                            text-gray-800
                            shadow-sm
                            outline-none
                            placeholder:text-gray-400
                            focus:ring-2
                            focus:ring-white/60
                        "
                    />
                </div>

                {/* Search */}
                <Button
                    type="submit"
                    variant="orange"
                    className="flex h-12 items-center gap-2 px-12"
                >
                    Search
                </Button>
            </div>
        </form>
    );
}
