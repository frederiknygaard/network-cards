import React from 'react';

import EventItem from './EventItem/EventItem';

const eventList = props => {
    const events = props.events.map(event => {
        return (
            <EventItem 
            authUserId={props.authUserId}
            creatorId={event.creator._id}
            key={event._id}
            id={event._id}
            title={event.title}
            price={event.price}
            date={event.date}
            onDetail={props.onViewDetail}
            />
        )
    });

    return (
        <div className="events-list">
            {events}
        </div>
    );
}

export default eventList;