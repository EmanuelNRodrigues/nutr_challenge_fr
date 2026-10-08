import Button from "../common/Button";

export default function NutritionistActions({
                                                onSchedule,
                                                onWebsite,
                                            }) {
    return (
        <div className="flex w-48 shrink-0 flex-col gap-3">
            <Button
                variant="lightorange"
                onClick={onSchedule}
            >
                Schedule Appointment
            </Button>

            <Button
                variant="lightgreen"
                onClick={onWebsite}
            >
                Website
            </Button>
        </div>
    );
}