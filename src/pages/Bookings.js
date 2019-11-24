import React, { Component } from 'react';
import AuthContext from '../context/auth-context';

import BookingList from '../components/Bookings/BookingList/BookingList';

class BookingsPage extends Component {
  state = {
    isLoading: false,
    bookings: []
  }

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings() {
    this.setState({ isLoading: true })

    const requestBody = {
      query: `
        query {
          bookings {
            _id
            createdAt
            event {
              _id
              title
              date
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
        'Authorization': `Bearer ${this.context.token}`
      }
    }).then(response => {
      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Failed');
      }
      return response.json();
    })
    .then(response => {
      console.log(response)
      const bookings = response.data.bookings;
      this.setState({
        bookings: bookings,
        isLoading: false
      })
    })
    .catch(err => {
      console.log(err);
      this.setState({
        isLoading: false
      })
    })
  }

  onCancel = bookingId => {

    this.setState({
      isLoading: true
    })

    const requestBody = {
      query: `
        mutation CancelBooking($id: ID!) {
          cancelBooking(bookingId: $id ) {
            _id
            title
          }
        }
      `,
      variables: {
        id: bookingId
      }
    }

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.context.token}`
      }
    }).then(response => {
      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Failed');
      }
      return response.json();
    })
    .then(response => {

      this.setState(prevState => {

        const updatedBookings = prevState.bookings.filter(booking => {
          return booking._id !== bookingId;
        })

        return {
          bookings: updatedBookings,
          isLoading: false
        }
      })
    })
    .catch(err => {
      console.log(err);
      this.setState({
        isLoading: false
      })
    })
  }

  render() {

    console.log(this.state.bookings)
    return (
        <div>
          <BookingList bookings={this.state.bookings} onCancel={this.onCancel}/>
        </div>
    );
  }
}

export default BookingsPage;
