import React, { Component } from 'react';
import Balloon from '../../src';

export default class Example extends Component {
  render() {
    const center = {
      width: document.body.clientWidth / 2,
      height: document.body.clientHeight / 2,
    };
    console.log(document.body.clientHeight)
    return (
      <Balloon
         start={{
           box: { x: center.width - 180, y: center.height - 150, width: 300, height: 80 },
           destination: { x: center.width , y: center.height },
         }}
         style={{ borderRadius: '5px', position: 'relative' }}
         backgroundColor="#ECF0F1"
         className={ 'animated bounceInUp' }
         minWidth={ 250 }
         minHeight={ 40 }
         maxWidth={ 800 }
         maxHeight={ 400 }
      >
        <p style={{ textAlign: 'center' }}>Hello, World!!</p>
      </Balloon>
    );
  }
}
