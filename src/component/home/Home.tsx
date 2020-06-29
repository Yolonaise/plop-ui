import React from 'react';
import './Home.scss';
import { withServer } from '../../context/server';

class Home extends React.PureComponent<any> {
  render() {
    return (
    <div className="home-container">
      <button className="new-room-button">+</button>
    </div>)
  }
}

export default withServer(Home);
