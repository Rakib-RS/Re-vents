import React, { Component, Fragment } from "react";
import EventDashBoard from "../../features/event/EventDashBoard/EventDashBoard";
import NavBar from "../../features/nav/NavBar/NavBar";
import { Container } from "semantic-ui-react";
import { Route } from "react-router-dom";
import { EventDetailed } from "../../features/event/EventDetailed/EventDetailed";
import PeopleDashBoard from "../../features/User/PeopleDashBoard/PeopleDashBoard";
import { UserDetailedPage } from "../../features/User/UserDetailed/UserDetailedPage";
import SettingsDashBoard from "../../features/User/Settings/SettingsDashBoard";
import EventForm from "../../features/event/eventForm/EventForm";
import { HomePage } from "../../features/Home/HomePage";

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
                <Route path='/events' component={EventDashBoard} />
                <Route path='/events/:id' component={EventDetailed} />
                <Route path='/people' component={PeopleDashBoard} />
                <Route path='/events' component={EventDashBoard} />
                <Route path='/profile/:id' component={UserDetailedPage} />
                <Route path='/settings' component={SettingsDashBoard} />
                <Route path='/createEvent' component={EventForm} />
              </Container>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}

export default App;
