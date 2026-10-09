// services/appointmentService.js

const API_URL = "/api/v1/guest/appointment";

export async function createAppointment(data) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(
            responseData.message || "Failed to schedule appointment"
        );
    }

    return responseData;
}