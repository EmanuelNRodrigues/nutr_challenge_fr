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

                const response = await fetch(
                    `${API_URL}/nutritionist/${nutritionistId}/appointments`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch appointments");
                }

                const data = await response.json();
                setAppointments(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchAppointments();
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

        // Remove the accepted appointment from the pending list
        setAppointments((current) =>
            current.filter((appointment) => appointment.id !== appointmentId)
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

        // Remove the rejected appointment from the pending list
        setAppointments((current) =>
            current.filter((appointment) => appointment.id !== appointmentId)
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