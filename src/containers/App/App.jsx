import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
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

  render() {
    return (
      <div>
        <Helmet {...config.app.head} />
        <div className="nav">
          <div className="container">
            <ul className="list-inline">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/park/acadia">Acadia</Link></li>
              <li><Link to="/park/arches">Arches</Link></li>
            </ul>
          </div>
        </div>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
