import { createBrowserRouter } from "react-router-dom";
import NutritionistSearchPage from "../pages/NutritionistSearch/NutritionistSearchPage.jsx";
import AppointmentRequestsPage from "../pages/AppointmentRequests/AppointmentRequestPage.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <NutritionistSearchPage />,
    },
    {
        path: "nutritionist/:id/appointments/requests",
        element: <AppointmentRequestsPage />,
    },
]);