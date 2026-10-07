import { Outlet } from "react-router-dom";
import NutriumBar from "./NutriumBar";

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-white">
            <NutriumBar />

            <main>
                <Outlet />
            </main>
        </div>
    );
}