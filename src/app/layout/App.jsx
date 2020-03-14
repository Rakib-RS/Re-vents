import React, { Component, Fragment } from "react";
import EventDashBoard from "../../features/event/EventDashBoard/EventDashBoard";
import NavBar from "../../features/nav/NavBar/NavBar";
import { Container } from "semantic-ui-react";
import { Route, withRouter, Switch } from "react-router-dom";
import EventDetailed from "../../features/event/EventDetailed/EventDetailed";
import PeopleDashBoard from "../../features/User/PeopleDashBoard/PeopleDashBoard";
import UserDetailedPage from "../../features/User/UserDetailed/UserDetailedPage";
import SettingsDashBoard from "../../features/User/Settings/SettingsDashBoard";
import EventForm from "../../features/event/eventForm/EventForm";
import { HomePage } from "../../features/Home/HomePage";
import TestComponent from "../../features/testArea/TestComponent";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path='/' component={HomePage} />
        <Route
          path='/(.+)'
          render={() => (
            <Fragment>
              <NavBar />
              <Container className='main'>
                <Switch key={this.props.location.key}>
                <Route exact path='/events' component={EventDashBoard} />
                <Route path='/events/:id' component={EventDetailed} />
                <Route path='/people' component={PeopleDashBoard} />
                <Route path='/profile/:id' component={UserDetailedPage} />
                <Route path='/settings' component={SettingsDashBoard} />
                <Route path={['/createEvent','/manage/:id']} component={EventForm} />
                <Route path='/test' component={TestComponent} />
                </Switch>
                
              </Container>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}

export default withRouter(App);
