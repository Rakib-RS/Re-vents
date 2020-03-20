import React, { Component } from "react";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { createEvent, updateEvent } from "../eventActions";
import cuid from "cuid";
import { reduxForm, Field } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate'
import DateInput from "../../../app/common/form/DateInput";
const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {

  };
  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }
  return {
    initialValues: event
  };
};
const actions = {
  createEvent,
  updateEvent
};
const validate = combineValidators({
  title: isRequired({message:'the title is required'}),
  category: isRequired({message: 'the category is required'}),
  description: composeValidators(
    isRequired({message:'please enter a description'}),
    hasLengthGreaterThan(4)({message: 'description needs to be at least 5 charcters '})
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date')

})
const category = [
  { key: 'drinks', text: 'drinks', value: 'drinks' },
  { key: 'soft', text: 'soft', value: 'soft' }
]
class EventForm extends Component {
  handleFormSubmit = values => {
    console.log(values);

    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.push(`/events/${this.props.initialValues.id}`);
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostedBy: 'Rakib',
        hostPhotoURL: "/assets/user.png"
      };

      this.props.createEvent(newEvent);
      this.props.history.push(`/events/${newEvent.id}`);
    }
    //console.log(this.state);
  };
  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  render() {
    const { initialValues, history,invalid,submitting,pristine } = this.props;

    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Event Details' />
            <Form onSubmit={this.props.handleSubmit(this.handleFormSubmit)} autoComplete='on'>
              <Field
                name='title'
                component={TextInput}
                placeholder='Event Title'
              />
              <Field
                name='category'
                component={SelectInput}
                options={category}
                placeholder='Event about'
                multiple={true} />
              <Field
                name='description'
                component={TextArea}
                rows={3}
                placeholder='Event Description'
              />
              <Header sub color='teal' content='Event Location Details' />
              <Field
                name='city'
                component={TextInput}
                placeholder='Event City'
              />
              <Field
                name='venue'
                component={TextInput}
                placeholder='Event Venue'
              />
              <Field
                name='date'
                component={DateInput}
                placeholder='Event date'
                dateFormat = 'dd LLL yyyy h:mm a'
                showTimeSelect
                timeFormat="HH:mm"
              />
              <Button disabled={invalid || submitting || pristine} positive type='submit'>
                Submit
              </Button>
              <Button onClick={initialValues.id ? () => history.push(`/events/${initialValues.id}`) : () => history.push('/events')} type='button'>
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
export default connect(
  mapState,
  actions
)(reduxForm({ form: "eventForm",validate })(EventForm));
