import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import NutritionistSearchPage from "../pages/NutritionistSearch/NutritionistSearchPage";
import AppointmentRequestsPage from "../pages/AppointmentRequests/AppointmentRequestPage.jsx";

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