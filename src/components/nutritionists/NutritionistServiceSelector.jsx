import {
    Briefcase,
    ChevronDown,
    CircleDollarSign,
} from "lucide-react";

export default function NutritionistServiceSelector({
                                                        services = [],
                                                        selectedService,
                                                        onChange,
                                                    }) {
    function handleChange(event) {
        const service = services.find(
            (item) => String(item.id) === event.target.value
        );

        onChange(service ?? null);
    }

    if (services.length === 0) {
        return (
            <div className="w-64 shrink-0 text-sm text-gray-500">
                No services available.
            </div>
        );
    }

    return (
        <div className="w-64 shrink-0">
            <div className="flex items-center gap-2">
                <Briefcase
                    size={18}
                    className="shrink-0 text-[rgb(61,170,141)]"
                />

                <div className="relative inline-flex items-center">
                    <select
                        value={selectedService?.id ?? ""}
                        onChange={handleChange}
                        className="
                            appearance-none
                            cursor-pointer
                            border-none
                            bg-transparent
                            p-0
                            pr-5
                            text-sm
                            font-medium
                            text-gray-700
                            outline-none
                            focus:outline-none
                            focus:ring-0
                        "
                    >
                        {services.map((service) => (
                            <option
                                key={service.id}
                                value={service.id}
                            >
                                {service.name}
                            </option>
                        ))}
                    </select>

                    <ChevronDown
                        size={16}
                        className="
                            pointer-events-none
                            absolute
                            right-0
                            text-gray-600
                        "
                    />
                </div>
            </div>

            {selectedService && (
                <div className="mt-3 flex items-center gap-2 font-semibold text-gray-800">
                    <CircleDollarSign
                        size={19}
                        className="text-[rgb(61,170,141)]"
                    />

                    <span>
                        €
                        {Number(selectedService.price).toFixed(2)}
                    </span>
                </div>
            )}
        </div>
    );
}