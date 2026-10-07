import AppointmentRequestCard from "../../components/appointments/AppointmentRequestCard";
import Loading from "../../components/common/Loading";
import useAppointments from "../../hooks/useAppointments";
import { useParams } from "react-router-dom";

export default function AppointmentRequestsPage() {
    const { id } = useParams();

    const {
        appointments,
        loading,
        acceptAppointment,
        rejectAppointment,
    } = useAppointments(id);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-white">
            <section className="mx-auto max-w-6xl px-6 py-10">
                <h1 className="text-3xl font-bold text-[rgb(61,170,141)]">
                    Pending Appointment Requests
                </h1>

                <div className="mt-8 space-y-4">
                    {appointments.length === 0 ? (
                        <p className="text-gray-500">
                            No pending appointment requests.
                        </p>
                    ) : (
                        appointments.map((appointment) => (
                            <AppointmentRequestCard
                                key={appointment.id}
                                appointment={appointment}
                                onAccept={acceptAppointment}
                                onReject={rejectAppointment}
                            />
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}