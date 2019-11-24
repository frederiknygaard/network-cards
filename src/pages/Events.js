import React, { Component } from 'react';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import AuthContext from '../context/auth-context';
import EventList from '../components/Events/EventList/EventList';
import './Events.css';

class EventPage extends Component {
  state = {
    creating: false,
    events: [],
    isLoading: false,
    selectedEvent: null
  };

  isActive = true;

  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.titleElm = React.createRef();
    this.priceElm = React.createRef();
    this.dateElm = React.createRef();
    this.descriptionElm = React.createRef();
  }

  componentDidMount() {
    this.fetchEvents();
  }

  startCreateEventHandler = () => {
    this.setState({creating: true});
  }

  modalConfirmHandler = () => {
    this.setState({creating: false});

    const title = this.titleElm.current.value;
    const price = +this.priceElm.current.value;
    const date = this.dateElm.current.value;
    const description = this.descriptionElm.current.value;

    if (title.trim().length === 0 || price <= 0 || date.trim().length === 0 || description.trim().length === 0) {
      return;
    };

    const requestBody = {
      query: `
        mutation {
          createEvent(eventInput: {title: "${title}", price: ${price}, date: "${date}", description: "${description}"}) {
            _id
            title
            description
            price
            date
          }
        }
      `
    }

    const token = this.context.token;

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Failed');
      }
      return response.json();
    })
    .then(response => {
      this.setState(prevState => {
        const updatedEvents = [...prevState.events];
        
        updatedEvents.push({
          ...response.data.createEvent,
          creator: {
            _id: this.context.userId
          }
        });

        return {
          events: updatedEvents
        }
      })
    })
    .catch(err => {
      console.log(err);
    })
  };

  modalCancelHandler = () => {
    this.setState({
      creating: false,
      selectedEvent: null
    });
  };

  fetchEvents() {

    this.setState({
      isLoading: true
    })

    const requestBody = {
      query: `
        query {
          events {
            _id
            title
            description
            date
            price
            creator {
              _id
              email
            }
          }
        }
      `
    }

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Failed');
      }
      return response.json();
    })
    .then(response => {
      const events = response.data.events;
      if (this.isActive) {
        this.setState({
          events: events,
          isLoading: false
        })
      }
    })
    .catch(err => {
      console.log(err);
      if (this.isActive) {
        this.setState({
          isLoading: false
        })
      }
    })
  }

  bookEventHandler = () => {
    if (!this.context.token) {
      this.setState({
        selectedEvent: null
      });
      return;
    }
    const requestBody = {
      query: `
        mutation {
          bookEvent(eventId: "${this.state.selectedEvent._id}") {
            _id
            createdAt
            updatedAt
          }
        }
      `
    }

    const token = this.context.token;

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Failed');
      }
      return response.json();
    })
    .then(response => {
      console.log(response)
      this.setState({
        selectedEvent: null
      });
    })
    .catch(err => {
      console.log(err);
    })
  }

  showDetailHandler = eventId => {
    console.log(eventId)
    this.setState(prevState => {
      const selectedEvent = prevState.events.find(event => event._id === eventId);
      return {selectedEvent: selectedEvent}
    })
  }

  componentWillUnmount() {
    this.isActive = false;
  }

  render() {

    return (
      <React.Fragment>
        {(this.state.creating || this.state.selectedEvent) && <Backdrop/>}
        {this.state.creating && 
        <React.Fragment>
          <Modal title="Add Event" confirmText="Confirm" canCancel canConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalConfirmHandler}>
            <form className="o-form">
              <div className="o-form__control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={this.titleElm}></input>
              </div>
              <div className="o-form__control">
                <label htmlFor="price">Price</label>
                <input type="number" id="price" ref={this.priceElm}></input>
              </div>
              <div className="o-form__control">
                <label htmlFor="date">Date</label>
                <input type="datetime-local" id="date" ref={this.dateElm}></input>
              </div>
              <div className="o-form__control">
                <label htmlFor="description">Description</label>
                <textarea id="description" rows="4" ref={this.descriptionElm}></textarea>
              </div>
            </form>
          </Modal>
        </React.Fragment>
        }
        {this.context.token &&
        <div className="events-control">
          <p>Share your own events</p>
          <button onClick={this.startCreateEventHandler} className="button">Create Event</button>
        </div>
        }
        {this.state.isLoading ? (
          <p>Loading...</p> 
        ) : (
        <EventList 
          events={this.state.events}
          authUserId={this.context.userId}
          onViewDetail={this.showDetailHandler}
        />
        )}
        {this.state.selectedEvent &&
        <Modal
          title={this.state.selectedEvent.title} 
          canCancel canConfirm 
          onCancel={this.modalCancelHandler}
          onConfirm={this.bookEventHandler}
          confirmText={this.context.token ? 'Book' : 'Confirm'}>
            
          <h1>{this.state.selectedEvent.title}</h1>
          <h2>{this.state.selectedEvent.price} - {new Date(this.state.selectedEvent.date).toLocaleDateString()}</h2>
          <p>{this.state.selectedEvent.description}</p>
          
        </Modal>
        }
      </React.Fragment>
    );
  }
}

export default EventPage;
