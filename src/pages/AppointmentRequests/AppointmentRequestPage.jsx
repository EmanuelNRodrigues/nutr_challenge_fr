import AppointmentRequestCard from "../../components/appointments/AppointmentRequestCard";
import Loading from "../../components/common/Loading";
import useAppointments from "../../hooks/useAppointments";

export default function AppointmentRequestsPage() {
    const {
        appointments,
        loading,
        acceptAppointment,
        rejectAppointment,
    } = useAppointments();

    if (loading) {
        return <Loading />;
    }

    return (
        <main>
            <h1>Pending Appointment Requests</h1>

            {appointments.map((appointment) => (
                <AppointmentRequestCard
                    key={appointment.id}
                    appointment={appointment}
                    onAccept={acceptAppointment}
                    onReject={rejectAppointment}
                />
            ))}
        </main>
    );
}