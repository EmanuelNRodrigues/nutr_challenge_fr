import Button from "../common/Button";

export default function Modal({ children, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative w-[520px] rounded-xl bg-white p-6 shadow-xl">
                {/*Top right close button*/}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-gray-700"
                    aria-label="Close"
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
}