/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import HomeModal from '../../homeC/HomeModal';
import { Home } from '../../../model/HomeModel';
import '../Home.scss';

interface NoHomeProps {
  onHomeCreated: (value: Home) => void;
};

interface NoHomeState {
  open: boolean;
};

class NoHome extends React.Component<NoHomeProps, NoHomeState> {
  constructor(props: NoHomeProps) {
    super(props);

    this.state = {
      open: false
    };
  }
  
  handleOpen = async (): Promise<any> => {
    this.setState({...this.state, open: true});
  }

  handleClose = async (value: Home | undefined): Promise<any> => {
    if(value) {
      this.props.onHomeCreated(value);
    }
    this.setState({...this.state, open: false});
  }
  
  render() {
    return (
      <div className="home-container">
        <Button className="new-room-button" color="primary" onClick={this.handleOpen}>
          <Add fontSize="large"/>
        </Button>
        <HomeModal 
          onOpen={this.handleOpen}
          onClose={this.handleClose}
          open={this.state.open} />
      </div>
    );
  }
}

export default NoHome;