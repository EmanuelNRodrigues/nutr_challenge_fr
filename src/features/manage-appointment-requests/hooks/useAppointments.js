import { useCallback, useEffect, useState } from "react";
import {
    formatUTCDate,
    formatUTCTime,
} from "../../../shared/utils/dateUtils";

const API_URL = "/api/v1";

export default function useAppointments(nutritionistId) {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAppointments = useCallback(async () => {
        if (!nutritionistId) {
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await fetch(
                `${API_URL}/nutritionist/${nutritionistId}/pending_appointments`
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to fetch appointments"
                );
            }

            const data = await response.json();

            const formattedAppointments = data.map(
                (appointment) => ({
                    id: appointment.id,
                    guestName: appointment.guest_name,
                    guestEmail: appointment.guest_email,

                    serviceName: appointment.service_name,
                    servicePrice: appointment.service_price,
                    serviceDuration:
                    appointment.service_duration,

                    date: formatUTCDate(
                        appointment.start_date_time
                    ),
                    time: formatUTCTime(
                        appointment.start_date_time
                    ),

                    status: appointment.status,
                })
            );

            setAppointments(formattedAppointments);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [nutritionistId]);

    useEffect(() => {
        // Fetch requests when the nutritionist ID changes.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchAppointments();
    }, [fetchAppointments]);

    async function acceptAppointment(appointmentId) {
        const response = await fetch(
            `${API_URL}/nutritionist/${nutritionistId}/appointment/${appointmentId}/accept`,
            {
                method: "POST",
            }
        );

        if (!response.ok) {
            throw new Error(
                "Failed to accept appointment"
            );
        }

        // Refresh pending appointments from backend
        await fetchAppointments();
    }

    async function rejectAppointment(appointmentId) {
        try {
            const response = await fetch(
                `${API_URL}/nutritionist/${nutritionistId}/appointment/${appointmentId}/reject`,
                {
                    method: "POST",
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to reject appointment"
                );
            }

            // Refresh pending appointments from backend
            await fetchAppointments();
        } catch (error) {
            // This should be a message to the user

            console.error(
                "Failed to reject appointment:",
                error
            );

            throw error;
        }
    }

    return {
        appointments,
        loading,
        error,
        acceptAppointment,
        rejectAppointment,
        fetchAppointments,
    };
}