import Modal from "../common/Modal";
import AppointmentForm from "./AppointmentForm";

export default function AppointmentModal({
                                             nutritionist,
                                             selectedService,
                                             isOpen,
                                             onClose,
                                         }) {
    if (!isOpen) {
        return null;
    }

    return (
        <Modal onClose={onClose}>
            <h2 className="text-2xl font-bold text-[rgb(61,170,141)]">
                Schedule with {nutritionist.name}
            </h2>

            {selectedService && (
                <p className="mt-2 text-gray-600">
                    {selectedService.name} — €
                    {Number(selectedService.price).toFixed(2)}
                </p>
            )}

            <AppointmentForm
                nutritionist={nutritionist}
                service={selectedService}
                onSuccess={onClose}
            />
        </Modal>
    );
}