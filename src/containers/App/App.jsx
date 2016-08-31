import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { IndexLink } from 'react-router';

import { Link } from 'react-router';

import config from '../../config';

import '../../assets/base.scss';

function mapStateToProps() {
  return {
  };
}

class App extends PureComponent {
  static propTypes = {
    children: PropTypes.object.isRequired,
    dispatch: React.PropTypes.func,
    info: PropTypes.object,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  renderNav() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to="/">
              <img alt="MLab" src="/img/mlab_logo_white.png" />
              <span>vis</span>
            </IndexLink>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <IndexLinkContainer to="/"><NavItem eventKey={1}>Home</NavItem></IndexLinkContainer>
          <LinkContainer to="/park/acadia"><NavItem eventKey={2}>Acadia</NavItem></LinkContainer>
          <LinkContainer to="/park/arches"><NavItem eventKey={3}>Arches</NavItem></LinkContainer>
        </Nav>
      </Navbar>
    );
  }


  render() {
    return (
      <div>
        <Helmet {...config.app.head} />
        {this.renderNav()}
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
