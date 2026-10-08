export function getTodayUTC() {
    const now = new Date();

    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, "0");
    const day = String(now.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export function createUTCDate(date, time) {
    return new Date(`${date}T${time}:00.000Z`);
}

export function toUTCISOString(date, time) {
    return createUTCDate(date, time).toISOString();
}

export function formatUTCDate(dateTime) {
    return new Date(dateTime).toLocaleDateString(
        "pt-PT",
        {
            timeZone: "UTC",
        }
    );
}

export function formatUTCTime(dateTime) {
    return new Date(dateTime).toLocaleTimeString(
        "pt-PT",
        {
            timeZone: "UTC",
            hour: "2-digit",
            minute: "2-digit",
        }
    );
}

export function formatUTCDateTime(dateTime) {
    const date = formatUTCDate(dateTime);
    const time = formatUTCTime(dateTime);

    return `${date} ${time}`;
}