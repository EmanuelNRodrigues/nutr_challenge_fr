import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../shared/layout/MainLayout";
import NutritionistSearchPage from "../features/find-nutritionist/pages/NutritionistSearchPage";
import AppointmentRequestsPage from "../features/manage-appointment-requests/pages/AppointmentRequestPage.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <NutritionistSearchPage />,
            },
            {
                path: "nutritionist/:id",
                element: <AppointmentRequestsPage />,
            },
        ],
    },
]);