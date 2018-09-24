import './Post.scss';
import React from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Link } from "react-router-dom";

import { toPreview } from 'actions';
import { connect } from 'react-redux';

const mapDispatchtoProps = (dispatch) => {
  return {
    toPreview: () => dispatch(toPreview())
  };
}

const mapStateToProps = (state) => {
  return {
    id: state.app.id
  };
}

@connect(mapStateToProps, mapDispatchtoProps)
export default class Post extends React.Component {
  constructor(props) {
    super(props);

    this.article = null;
    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    this.article = require(`../../../articles/${this.props.id}.jsx`);
  }

  onClick() {
    this.props.toPreview();
  }

  render() {
    const Article = this.article.default;

    return <React.Fragment>
      <div className="article bg-white">
        <Article />
        <Router>
          <Link to="/#" onClick={this.onClick}>Назад</Link>
        </Router>
        <div className="article-info">
          <span>{ this.props.article.author }</span>
          <span>{ this.props.article.date }</span>
        </div>
      </div>
    </React.Fragment>;
  }
}

Post.propTypes = {
  article: PropTypes.object.isRequired
}
