import React from 'react';
import './Home.scss';
import { withServer } from '../../context/server';
import { withSnacks, SnackProps } from '../../context/snacking';

interface HomeProps extends SnackProps {
};

class Home extends React.PureComponent<HomeProps> {
  render() {
    return (
    <div className="home-container">
      <button className="new-room-button" onClick={() => this.props.notify!('salut', 'success')}>+</button>
    </div>)
  }
}

export default withServer(withSnacks(Home));
