import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api/v1";

export default function useAppointments(nutritionistId) {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchAppointments() {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(
                    `${API_URL}/nutritionist/${nutritionistId}/pending_appointments`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch appointments");
                }

                const data = await response.json();

                const formattedAppointments = data.map((appointment) => {
                    const startDate = new Date(
                        appointment.start_date_time
                    );

                    return {
                        id: appointment.id,
                        guestName: appointment.guest_name,
                        guestEmail: appointment.guest_email,

                        serviceName: appointment.service_name,
                        servicePrice: appointment.service_price,
                        serviceDuration: appointment.service_duration,

                        date: startDate.toLocaleDateString("pt-PT"),
                        time: startDate.toLocaleTimeString("pt-PT", {
                            hour: "2-digit",
                            minute: "2-digit",
                        }),

                        status: appointment.status,
                    };
                });

                setAppointments(formattedAppointments);
            } catch (error) {
                console.error("Failed to fetch appointments:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        if (nutritionistId) {
            fetchAppointments();
        }
    }, [nutritionistId]);

    async function acceptAppointment(appointmentId) {
        const response = await fetch(
            `${API_URL}/nutritionist/${nutritionistId}/appointment/${appointmentId}/accept`,
            {
                method: "POST",
            }
        );

        if (!response.ok) {
            throw new Error("Failed to accept appointment");
        }

        setAppointments((current) =>
            current.filter(
                (appointment) => appointment.id !== appointmentId
            )
        );
    }

    async function rejectAppointment(appointmentId) {
        const response = await fetch(
            `${API_URL}/nutritionist/${nutritionistId}/appointment/${appointmentId}/reject`,
            {
                method: "POST",
            }
        );

        if (!response.ok) {
            throw new Error("Failed to reject appointment");
        }

        setAppointments((current) =>
            current.filter(
                (appointment) => appointment.id !== appointmentId
            )
        );
    }

    return {
        appointments,
        loading,
        error,
        acceptAppointment,
        rejectAppointment,
    };
}