/**Parent component
 * AppLayout is included here
 */
import React, { Component } from 'react';


import AppLayout from './AppLayout/AppLayout';


class App extends Component {
  render() {
    return (
      <AppLayout style={{fontFamily:"Roboto"}}/>
    )
  }
}
export default App;
