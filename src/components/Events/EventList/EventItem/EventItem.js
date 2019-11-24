import React from 'react';

import './EventItem.css';

const eventItem = props => (
    <div className="events-list__item">
        <div key={props.id}>
            <h1>{props.title}</h1>
            <h2>{props.price} - {new Date(props.date).toLocaleDateString()}</h2>
        </div>
        <div>
            {props.authUserId !== props.creatorId &&
            <button onClick={props.onDetail.bind(this, props.id)} className="button">View Details</button>
            }
            {props.authUserId === props.creatorId &&
            <p>You're the owner of this event</p>
            }
        </div>
    </div>
)

export default eventItem;