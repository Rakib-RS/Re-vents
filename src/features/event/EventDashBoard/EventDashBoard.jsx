import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import cuid from "cuid";
import {connect} from 'react-redux'
import {createEvent,updateEvent,deleteEvent} from '../eventActions'

const mapState =(state) =>({
  events : state.events
})
const actions = {
  createEvent,
  updateEvent,
  deleteEvent
}
class EventDashBoard extends Component {
   
  handleCreateEvent = newEvent => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = "/assets/user.png";
    this.props.createEvent(newEvent);
  };

  handleUpdateEvent = updatedEvent => {
    this.props.updateEvent(updatedEvent);
  };
  handleDeleteEvent = id => {
    this.props.deleteEvent(id);
  };
  render() {
    const {events} = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={events}
            deleteEvent={this.handleDeleteEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <h2>Activity Feed</h2>
        </Grid.Column>
      </Grid>
    );
  }
}
export default connect(mapState,actions)(EventDashBoard)
