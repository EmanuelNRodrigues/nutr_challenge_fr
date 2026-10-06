import { useState } from "react";
import {
    MapPin,
    BriefcaseMedical,
    CircleDollarSign,
    CalendarDays,
    Globe,
} from "lucide-react";

import AppointmentModal from "../appointments/AppointmentModal";

export default function NutritionistCard({ nutritionist }) {
    const [selectedService, setSelectedService] = useState(
        nutritionist.services?.[0] || null
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
                            Dietitian
                        </p>

                        <div className="mt-3 flex items-center gap-2 text-gray-600">
                            <MapPin
                                size={18}
                                className="shrink-0 text-[rgb(61,170,141)]"
                            />

                            <span>
                                {nutritionist.locationAddress ||
                                    "Address unavailable"}
                            </span>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="w-64 shrink-0">
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                            <BriefcaseMedical
                                size={18}
                                className="text-[rgb(61,170,141)]"
                            />

                            Service
                        </label>

                        <select
                            value={
                                selectedService?.name || ""
                            }
                            onChange={(e) => {
                                const service =
                                    nutritionist.services.find(
                                        (item) =>
                                            item.name ===
                                            e.target.value
                                    );

                                setSelectedService(service);
                            }}
                            className="
                                h-11 w-full rounded-lg
                                border border-gray-300
                                bg-white px-3
                                text-sm text-gray-700
                                outline-none
                                focus:border-[rgb(61,170,141)]
                            "
                        >
                            {nutritionist.services.map(
                                (service) => (
                                    <option
                                        key={`${service.name}-${service.price}`}
                                        value={service.name}
                                    >
                                        {service.name}
                                    </option>
                                )
                            )}
                        </select>

                        {selectedService && (
                            <div className="mt-3 flex items-center gap-2 font-semibold text-gray-800">
                                <CircleDollarSign
                                    size={19}
                                    className="text-[rgb(61,170,141)]"
                                />

                                <span>
                                    €{Number(
                                    selectedService.price
                                ).toFixed(2)}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex w-48 shrink-0 flex-col gap-3">
                        <button
                            type="button"
                            onClick={() =>
                                setIsAppointmentOpen(true)
                            }
                            className="
                                flex h-12 items-center
                                justify-center gap-2
                                rounded-lg
                                bg-[rgb(248,229,224)]
                                font-semibold
                                text-[rgb(248,150,108)]
                                transition
                                hover:brightness-95
                            "
                        >
                            <CalendarDays size={18} />

                            Schedule Appointment
                        </button>

                        <button
                            type="button"
                            className="
                                flex h-11 items-center
                                justify-center gap-2
                                rounded-lg
                                bg-[rgb(221,249,239)]
                                font-semibold
                                text-[rgb(61,170,141)]
                                transition
                                hover:bg-[rgb(205,244,231)]
                            "
                        >
                            <Globe size={17} />

                            Website
                        </button>
                    </div>
                </div>
            </article>

            <AppointmentModal
                nutritionist={nutritionist}
                selectedService={selectedService}
                isOpen={isAppointmentOpen}
                onClose={() => setIsAppointmentOpen(false)}
            />
        </>
    );
}