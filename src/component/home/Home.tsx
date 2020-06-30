import React from 'react';
import './Home.scss';
import { withServer, WithServerProps } from '../../context/server';
import { withSnacks, SnackProps } from '../../context/snacking';
import NoHome from './NoHome/NoHome';
import { Home } from '../../model/HomeModel';
import { Typography, Button } from '@material-ui/core';
import { Create } from '@material-ui/icons';
import HomeModal from '../homeC/HomeModal';

interface HomeProps extends SnackProps, WithServerProps {
};

interface HomeState {
  home?: Home,
  open: boolean
}

class HomeComponent extends React.Component<HomeProps, HomeState> {
  
  constructor(props: HomeProps) {
    super(props);

    this.state = {
      open: false
    }
  }

  async componentDidMount() {
    try {
      const res = await (await fetch(this.props.url + '/home/')).json();
      this.setState({home: res && res.length > 0 ? res[0] : undefined });
    } catch (error) {
      this.props.notify!(error.message, 'error');
    }
  }

  handleHomeCreated = (value: Home): void => {
    this.setState({...this.state, home: value});
    value.rooms.forEach(room => {
      
    });
  }

  handleOpen = async (): Promise<any> => {
    this.setState({...this.state, open: true});
  }

  handleClose = async (value: Home | undefined): Promise<any> => {
    if(value) {
      this.handleHomeCreated(value);
    }
    this.setState({...this.state, open: false});
  }

  render() {
    return (
    <div className="home-container">
      {!this.state?.home && <NoHome onHomeCreated={this.handleHomeCreated}/>}
      { this.state?.home && 
        <div style={{marginTop:"50px"}}>
          <Typography variant="h6" color='inherit' noWrap>{this.state.home.name}</Typography>
          <Button onClick={this.handleOpen}><Create></Create></Button >
        </div>
      }
      <HomeModal 
        open={this.state.open}
        home={this.state.home}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
      ></HomeModal>
    </div>)
  }
}

export default withServer(withSnacks(HomeComponent));
