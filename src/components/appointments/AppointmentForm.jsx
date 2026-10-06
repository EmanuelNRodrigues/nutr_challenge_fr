import { useState } from "react";
import { createAppointment } from "../../services/appointmentService";

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

    const timeSlots = generateTimeSlots();

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setIsSubmitting(true);

        try {
            await createAppointment ({
                guest_name: name,
                guest_email: email,
                start_appointment_date_time: `${date}T${time}:00`,
                nutritionist_email: nutritionist.email,
                service_name: service?.name,
            });

            onSuccess();
        } catch (error) {
            console.error("Failed to schedule appointment:", error);
            setError("Could not schedule the appointment. Please try again.");
        } finally {
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
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="h-11 w-full rounded-lg border border-gray-300 px-4"
            />

            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="h-11 w-full rounded-lg border border-gray-300 px-4"
            />

            <div className="grid grid-cols-2 gap-4">
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="h-11 rounded-lg border border-gray-300 px-4"
                />

                <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    className="h-11 rounded-lg border border-gray-300 px-4"
                >
                    <option value="">
                        Select time
                    </option>

                    {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                            {slot}
                        </option>
                    ))}
                </select>
            </div>

            {error && (
                <p className="text-sm text-red-600">
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="
                    h-11 w-full rounded-lg
                    bg-[rgb(228,150,108)]
                    font-semibold text-white
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
            >
                {isSubmitting
                    ? "Scheduling..."
                    : "Request Appointment"}
            </button>
        </form>
    );
}