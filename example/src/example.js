import React, { Component } from 'react';
import Balloon from '../../src';

export default class Example extends Component {
  render() {
    return (
      <Balloon
         marker={ <i className="fa fa-comment" style={{ fontSize: '18px' }}/> }
      />
    );
  }
}
