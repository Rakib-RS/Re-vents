import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { createEvent, updateEvent } from "../eventActions";
import cuid from "cuid";
const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {
    title: "",
    date: "",
    city: "",
    venue: "",
    hostedBy: ""
  };
  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }
  return {
    event
  };
};
const actions = {
  createEvent,
  updateEvent
};
class EventForm extends Component {
  state = {
    ...this.props.event
  };
  componentDidMount() {
    if (this.props.selectedEvent !== null) {
      this.setState({
        ...this.props.selectedEvent
      });
    }
  }
  handleFormSubmit = evt => {
    evt.preventDefault();
    if (this.state.id) {
      this.props.updateEvent(this.state);
      this.props.history.push(`/events/${this.state.id}`);
    } else {
      const newEvent ={
        ...this.state,
        id: cuid(),
        hostPhotoURL : '/assets/user.png'

      }
      
      this.props.createEvent(newEvent);
      this.props.history.push(`/events`);
    }
    //console.log(this.state);
  };
  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  render() {
    const { title, date, city, venue, hostedBy } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.handleFormSubmit} autoComplete='on'>
          <Form.Field>
            <label>Event Title</label>
            <input
              placeholder='First Name'
              name='title'
              onChange={this.handleInputChange}
              value={title}
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              type='date'
              placeholder='Event Date'
              name='date'
              onChange={this.handleInputChange}
              value={date}
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              placeholder='City event is taking place'
              name='city'
              onChange={this.handleInputChange}
              value={city}
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              placeholder='Enter the Venue of the event'
              name='venue'
              onChange={this.handleInputChange}
              value={venue}
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              placeholder='Enter the name of person hosting'
              name='hostedBy'
              onChange={this.handleInputChange}
              value={hostedBy}
            />
          </Form.Field>
          <Button positive type='submit'>
            Submit
          </Button>
          <Button onClick={this.props.history.goBack} type='button'>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}
export default connect(mapState, actions)(EventForm);
