import React from 'react';

const bookingList = props => (
    <ul className="bookings">
        {props.bookings.map(booking => (
            <li key={booking._id} className="bookings__item">
                <div>
                    <h1>{booking.event.title}</h1>
                    <p>{new Date(booking.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                    <button onClick={props.onCancel.bind(this, booking._id)} className="button">Cancel</button>
                </div>
            </li>
        ))}
    </ul>
);

export default bookingList;