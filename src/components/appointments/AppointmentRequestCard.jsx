export default function AppointmentRequestCard({
                                    appointment,
                                    onAccept,
                                    onReject,
                                }) {
    return (
        <article>
            <h2>{appointment.guestName}</h2>

            <p>{appointment.guestEmail}</p>

            <p>
                Requested:
                {" "}
                {appointment.date}
                {" "}
                at
                {" "}
                {appointment.time}
            </p>

            <button
                onClick={() => onAccept(appointment.id)}
            >
                Accept
            </button>

            <button
                onClick={() => onReject(appointment.id)}
            >
                Reject
            </button>
        </article>
    );
}