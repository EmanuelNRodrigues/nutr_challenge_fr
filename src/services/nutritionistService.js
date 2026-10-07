const API_URL = "/api/v1/guest/nutritionist_service";

export async function searchNutritionists({ query = "", location = "" }) {
    const params = new URLSearchParams();

    if (query.trim()) {
        params.append("query", query.trim());
    }

    if (location.trim()) {
        params.append("location_address", location.trim());
    }

    const response = await fetch(`${API_URL}?${params.toString()}`);

    if (!response.ok) {
        throw new Error("Failed to fetch nutritionists");
    }

    return response.json();
}