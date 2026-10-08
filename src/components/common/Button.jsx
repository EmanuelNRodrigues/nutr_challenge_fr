export default function Button({
                                   children,
                                   variant = "green",
                                   type = "button",
                                   onClick,
                                   className = "",
                                   ...props
                               }) {
    const variants = {
        lightorange:
            "bg-[rgb(248,229,224)] text-[rgb(248,150,108)] hover:brightness-95",

        orange:
            "bg-[rgb(228,150,108)] text-white hover:brightness-75",

        lightgreen:
            "bg-[rgb(221,249,239)] text-[rgb(61,170,141)] hover:brightness-95",

        green:
            "bg-[rgb(61,170,141)] text-white hover:brightness-75",

        pagination:
            "bg-transparent text-gray-600 hover:bg-gray-100",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`
                rounded-lg
                px-5 py-2.5
                font-semibold
                shadow-sm
                transition
                ${variants[variant]}
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}