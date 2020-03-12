import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import EventForm from "../eventForm/EventForm";
import cuid from "cuid";


export default class EventDashBoard extends Component {
  state = {
    events: eventsDahsBoard,
    isOpen: false,
    selectedEvent: null
  };
  // handleIsOpenToggle = () => {
  //   this.setState(({ isOpen }) => ({
  //     isOpen: !isOpen
  //   }));
  // };
  handleCreateFormOpen = () => {
    this.setState({
      isOpen: true
    });
  };
  handleFormCancel = () => {
    this.setState({
      isOpen: false
      // selectedEvent: null
    });
  };
  handleCreateEvent = newEvent => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = "/assets/user.png";
    this.setState(({ events }) => ({
      events: [...events, newEvent],
      isOpen: false
    }));
  };
  handleSelectEvent = event => {
    this.setState({
      selectedEvent: event,
      isOpen: true
    });
  };
  handleUpdateEvent = updatedEvent => {
    this.setState(({ events }) => ({
      events: events.map(event => {
        if (event.id === updatedEvent.id) {
          return { ...updatedEvent };
        } else {
          return event;
        }
      }),
      isOpen: false,
      selectedEvent: null
    }));
  };
  handleDeleteEvent = id => {
    this.setState(({ events }) => ({
      events: events.filter(e => e.id !== id)
    }));
  };
  render() {
    const { events, isOpen, selectedEvent } = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={events}
            selectEvent={this.handleSelectEvent}
            deleteEvent={this.handleDeleteEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            onClick={this.handleCreateFormOpen}
            positive
            content='Create Event'
          />
          {isOpen && (
            <EventForm
              cancelFormOpen={this.handleFormCancel}
              createEvent={this.handleCreateEvent}
              selectedEvent={selectedEvent}
              updateEvent={this.handleUpdateEvent}
              key={selectedEvent ? selectedEvent.id : 0}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}
