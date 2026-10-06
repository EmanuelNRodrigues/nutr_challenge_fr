export async function searchNutritionists({ query, location }) {
    const API_URL = "/api/v1/guest/nutritionist_service";
    const params = new URLSearchParams();

    if (query.trim()) {
        params.append("query", query.trim());
    }

    if (location.trim()) {
        params.append("location_address", location.trim());
    } else {
        params.append("location_address", "Braga");
    }

    const response = await fetch(
        `${API_URL}?${params.toString()}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch nutritionists");
    }

    const data = await response.json();

    return groupNutritionists(data);
}

function groupNutritionists(rows) {
    const grouped = new Map();

    rows.forEach((row) => {
        if (!grouped.has(row.id)) {
            grouped.set(row.id, {
                id: row.id,
                name: row.name,
                email: row.email,
                photo: row.photo,
                locationAddress: row.location_address,
                services: [],
            });
        }

        const nutritionist = grouped.get(row.id);

        if (row.service_name) {
            nutritionist.services.push({
                name: row.service_name,
                price: row.service_price,
                duration: row.service_duration,
            });
        }
    });

    return Array.from(grouped.values());
}