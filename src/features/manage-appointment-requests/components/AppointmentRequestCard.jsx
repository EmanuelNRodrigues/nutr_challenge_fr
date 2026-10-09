import { CalendarDays, Clock } from "lucide-react";
import Button from "../../../shared/components/Button";

export default function AppointmentRequestCard({
                                                   appointment,
                                                   onAccept,
                                                   onReject,
                                               }) {
    return (
        <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            {/* Guest */}
            <div>
                <h2 className="text-xl font-bold text-gray-800">
                    {appointment.guestName}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    {appointment.serviceName}
                </p>
            </div>

            {/* Appointment date and time */}
            <div className="mt-5 space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <CalendarDays
                        size={18}
                        className="text-[rgb(61,170,141)]"
                    />

                    <span>{appointment.date}</span>
                </div>

                <div className="flex items-center gap-2">
                    <Clock
                        size={18}
                        className="text-[rgb(61,170,141)]"
                    />

                    <span>{appointment.time}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-5 flex gap-3">
                <Button
                    variant="green"
                    onClick={() => onAccept(appointment.id)}
                >
                    Accept
                </Button>

                <Button
                    variant="lightorange"
                    onClick={() => onReject(appointment.id)}
                >
                    Reject
                </Button>
            </div>
        </article>
    );
}