import { useState } from "react";
import { MapPin } from "lucide-react";
import NutritionistServiceSelector from "./NutritionistServiceSelector";
import NutritionistActions from "./NutritionistActions";
import AppointmentModal from "../appointments/AppointmentModal";

export default function NutritionistCard({
                                             nutritionist,
                                         }) {
    const [selectedService, setSelectedService] =
        useState(
            nutritionist.services?.[0] ?? null
        );

    const [isAppointmentOpen, setIsAppointmentOpen] =
        useState(false);

    const photo =
        nutritionist.photo ||
        "https://placehold.co/160x160?text=Photo";

    return (
        <>
            <article
                className="
                    rounded-xl bg-white p-5 shadow-sm
                    transition hover:shadow-md
                "
            >
                <div className="flex items-center gap-6">
                    {/* Photo */}
                    <div className="shrink-0">
                        <img
                            src={photo}
                            alt={nutritionist.name}
                            className="
                                h-28 w-28 rounded-full
                                object-cover
                            "
                        />
                    </div>

                    {/* Person information */}
                    <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold text-[rgb(61,170,141)]">
                            {nutritionist.name}
                        </h2>

                        <p className="mt-1 text-base font-medium text-gray-600">
                            Nutritionist
                        </p>

                        <div className="mt-3 flex items-center gap-2 text-gray-600">
                            <MapPin
                                size={18}
                                className="shrink-0 text-[rgb(61,170,141)]"
                            />

                            <span>
                                {selectedService?.location?.address ??
                                    "Address unavailable"}
                            </span>
                        </div>
                    </div>

                    {/* Service */}
                    <NutritionistServiceSelector
                        services={nutritionist.services}
                        selectedService={selectedService}
                        onChange={setSelectedService}
                    />

                    {/* Actions */}
                    <NutritionistActions
                        onSchedule={() =>
                            setIsAppointmentOpen(true)
                        }
                        onWebsite={() => null}
                    />
                </div>
            </article>

            <AppointmentModal
                nutritionist={nutritionist}
                selectedService={selectedService}
                isOpen={isAppointmentOpen}
                onClose={() =>
                    setIsAppointmentOpen(false)
                }
            />
        </>
    );
}