import { useMemo, useState } from "react";
import { createAppointment } from "../services/appointmentService";
import Button from "../../../shared/components/Button.jsx";
import {
    createUTCDate,
    getTodayUTC,
    toUTCISOString,
} from "../../../shared/utils/dateUtils";

const ALL_TIME_SLOTS = [
    "08:00", "08:15", "08:30", "08:45",
    "09:00", "09:15", "09:30", "09:45",
    "10:00", "10:15", "10:30", "10:45",
    "11:00", "11:15", "11:30", "11:45",
    "12:00", "12:15", "12:30", "12:45",
    "13:00", "13:15", "13:30", "13:45",
    "14:00", "14:15", "14:30", "14:45",
    "15:00", "15:15", "15:30", "15:45",
    "16:00", "16:15", "16:30", "16:45",
    "17:00", "17:15", "17:30", "17:45",
    "18:00", "18:15", "18:30", "18:45",
    "19:00", "19:15", "19:30", "19:45",
];

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

    const today = useMemo( () => getTodayUTC(), [] );

    const availableTimeSlots = useMemo(() => {
        if (!date) { return ALL_TIME_SLOTS; }

        const now = new Date();

        const minimumAllowedTime = new Date( now.getTime() + 60 * 60 * 1000 );

        return ALL_TIME_SLOTS.filter((slot) => {
            const slotStart = createUTCDate(
                date,
                slot
            );

            if (slotStart < minimumAllowedTime) {
                return false;
            }

            const slotEnd = new Date(
                slotStart.getTime() +
                service.duration_in_minutes * 60 * 1000
            );

            const overlaps = nutritionist.filled_slots.some(
                (filledSlot) => {
                    const filledStart = new Date(filledSlot.start_date_time);

                    const filledEnd = new Date(filledSlot.end_date_time);

                    return (slotStart < filledEnd && slotEnd > filledStart);
                }
            );

            return !overlaps;
        });
    }, [date, service, nutritionist]);

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