import React, { Component } from 'react';
import './main.css';

export default class CssSlider extends Component {
  render() {
    return (
      <div>
        <div id="main-content">Main Panel</div>
        <div id="slider-content">
          <div id="content-wrapper">
            <div id="sneek-peek">Sneek Peek</div>
            <div id="content">Content Content Content</div>
          </div>
          <div id="button-wrapper">
            <button>Show Content Show Content</button>
          </div>
        </div>
      </div>
    );
  }
}

