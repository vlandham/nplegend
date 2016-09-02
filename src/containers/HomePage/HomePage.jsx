import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
// import * as SearchActions from '../../redux/search/actions';
import * as SymbolsActions from '../../redux/symbols/actions';
// import * as SearchSelectors from '../../redux/search/selectors';
import * as SymbolsSelectors from '../../redux/symbols/selectors';

import { SymbolParks, SymbolForce } from '../../components';

import './HomePage.scss';

function mapStateToProps(state) {
  return {
    // parkIds: SearchSelectors.getParkSearch(state),
    symbolInfo: SymbolsSelectors.getSymbols(state),
  };
}

class HomePage extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
    // parkIds: PropTypes.object,
    symbolInfo: PropTypes.object,
  }

  static defaultProps = {
    symbolInfo: {},
  }

  constructor(props) {
    super(props);

    // bind handlers
    this.onSearchQueryChange = this.onSearchQueryChange.bind(this);
  }

  componentDidMount() {
    this.fetchData(this.props);
  }

  fetchData(props) {
    const { dispatch } = props;
    // dispatch(SearchActions.fetchParkSearchIfNeeded());
    dispatch(SymbolsActions.fetchSymbolsIfNeeded());
  }

  /**
   * Callback for when viewMetric changes - updates URL
   */
  onSearchQueryChange() {
    // noop
  }

  renderSymbolParks(symbol, parks) {
    return (
      <SymbolParks
        symbol={symbol}
        parks={parks}
        key={symbol.id}
      />
    );
  }

  renderAllSymbolParks(symbols, parks) {
    if (symbols) {
      return (
        <div>
          {symbols.map((s) => this.renderSymbolParks(s, parks[s.id]))}
        </div>
      );
    }
    return null;
  }

  renderTreemap(counts) {
    return (
      <SymbolForce
        width={920}
        height={300}
        symbolCounts={counts}
      />
    );
  }

  render() {
    const { symbolInfo } = this.props;

    return (
      <div className="home-page">
        <Helmet title="Home" />
        <h1>NP Legends</h1>
        <p><strong>What?</strong></p>
        <p>Exploring the symbols National Park Service maps with image processing. Which symbols are used most at your beloved park? Which is the least used symbols? Find out here!</p>
        <p className="pull-right"><Link to="about">Learn More</Link></p>
        <div className="symbol-treemap-container">
          {this.renderTreemap(symbolInfo.totals)}
        </div>

        <h2 className="banner">Symbols</h2>
        <div className="symbol-list-container">
          {this.renderAllSymbolParks(symbolInfo.totals, symbolInfo.parks)}
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps)(HomePage);
