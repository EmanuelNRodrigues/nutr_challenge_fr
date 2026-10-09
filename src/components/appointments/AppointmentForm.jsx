import { useMemo, useState } from "react";
import { createAppointment } from "../../services/appointmentService";
import Button from "../common/Button.jsx";
import {
    createUTCDate,
    getTodayUTC,
    toUTCISOString,
} from "../../utils/dateUtils";

function generateTimeSlots() {
    const slots = [];

    for (let hour = 8; hour <= 20; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            if (hour === 20 && minute > 0) {
                continue;
            }

            slots.push(
                `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
            );
        }
    }

    return slots;
}

export default function AppointmentForm({
                                            nutritionist,
                                            service,
                                            onSuccess,
                                        }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const timeSlots = useMemo(
        () => generateTimeSlots(),
        []
    );

    const today = useMemo(
        () => getTodayUTC(),
        []
    );

    const availableTimeSlots = useMemo(() => {
        if (!date) {
            return timeSlots;
        }

        const now = new Date();

        const minimumAllowedTime = new Date(
            now.getTime() + 60 * 60 * 1000
        );

        const durationInMinutes =
            service?.duration_in_minutes ?? 0;

        const filledSlots =
            nutritionist?.filled_slots ?? [];

        return timeSlots.filter((slot) => {
            const slotStart = createUTCDate(
                date,
                slot
            );

            if (slotStart < minimumAllowedTime) {
                return false;
            }

            const slotEnd = new Date(
                slotStart.getTime() +
                durationInMinutes * 60 * 1000
            );

            const overlaps = filledSlots.some(
                (filledSlot) => {
                    const filledStart = new Date(
                        filledSlot.start_date_time
                    );

                    const filledEnd = new Date(
                        filledSlot.end_date_time
                    );

                    return (
                        slotStart < filledEnd &&
                        slotEnd > filledStart
                    );
                }
            );

            return !overlaps;
        });
    }, [
        date,
        timeSlots,
        service?.duration_in_minutes,
        nutritionist?.filled_slots,
    ]);

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setIsSubmitting(true);

        try {
            await createAppointment({
                guest_name: name,
                guest_email: email,
                start_appointment_date_time:
                    toUTCISOString(date, time),
                nutritionist_email: nutritionist.email,
                service_name: service?.name,
            });

            onSuccess();
        } catch (error) {
            setError( error.message || "Could not schedule the appointment. Please try again." );
        }

        finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
        >
            <input
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
                placeholder="Your name"
                required
                className="
                    h-11 w-full rounded-lg
                    border border-gray-300 px-4
                "
            />

            <input
                type="email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
                placeholder="Your email"
                required
                className="
                    h-11 w-full rounded-lg
                    border border-gray-300 px-4
                "
            />

            <div className="grid grid-cols-2 gap-4">
                <input
                    type="date"
                    value={date}
                    min={today}
                    onChange={(e) => {
                        setDate(e.target.value);
                        setTime("");
                    }}
                    required
                    className="
                        h-11 rounded-lg
                        border border-gray-300 px-4
                    "
                />

                <select
                    value={time}
                    onChange={(e) =>
                        setTime(e.target.value)
                    }
                    required
                    disabled={!date}
                    className="
                        h-11 rounded-lg
                        border border-gray-300 px-4
                    "
                >
                    <option value="">
                        Select time
                    </option>

                    {availableTimeSlots.map(
                        (slot) => (
                            <option
                                key={slot}
                                value={slot}
                            >
                                {slot}
                            </option>
                        )
                    )}
                </select>
            </div>

            {error && (
                <p className="text-sm text-red-600">
                    {error}
                </p>
            )}

            <Button
                type="submit"
                variant="orange"
                disabled={isSubmitting}
            >
                {isSubmitting
                    ? "Scheduling..."
                    : "Request Appointment"}
            </Button>
        </form>
    );
}