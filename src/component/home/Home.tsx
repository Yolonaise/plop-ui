import React from 'react';
import './Home.scss';
import { withServer, WithServerProps } from '../../context/server';
import { withSnacks, SnackProps } from '../../context/snacking';
import NoHome from './NoHome/NoHome';
import { Home } from '../../model/HomeModel';
import { Typography, Button, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import { Create, Delete, ExpandMore } from '@material-ui/icons';
import HomeModal from '../homeC/HomeModal';
import Floors from '../floor/Floors';

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

  handleDelete = async (): Promise<any>=> {
    try {
      const res = await fetch(this.props.url + `/home/${this.state.home?._id?.$oid}`, {method: 'DELETE'});
      if(res.status === 204)
        this.setState({home: undefined});
    } catch (error) {
      this.props.notify!(error.message, 'error');
    }
  }

  handleFloorChange = async (floors: string[]): Promise<any> => {
    try {
      const res = await (await fetch(this.props.url + `/home/`, {
        method: 'PUT',
        body: JSON.stringify({...this.state.home, floors: floors}),
        headers: { 'Content-Type': 'application/json' },
      })).json();
      
      this.setState({
        ...this.state,
        home: res
      });
    } catch (error) {
      this.props.notify!(error.message, 'error');
    }
  }
  render() {
    console.log(this.state?.home !== undefined);
    return (
    <div>
      { this.state?.home !== undefined ?
        <div className="home-container">
          <div style={{position: "relative", paddingTop: "50px", margin: "10px"}}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6" color='inherit' noWrap>{this.state.home.name.toUpperCase()}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Button onClick={this.handleOpen}><Create/></Button >
                <Button onClick={this.handleDelete}><Delete/></Button >
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <Floors
              floors={this.state.home.floors}
              onFloorUpdated={this.handleFloorChange}/>
          </div>
        </div> :
        <NoHome onHomeCreated={this.handleHomeCreated}/>
      }
      {
        this.state.open && 
        <HomeModal 
          open={this.state.open}
          home={this.state.home}
          onClose={this.handleClose}
          onOpen={this.handleOpen} />
      }
    </div>)
  }
}

export default withServer(withSnacks(HomeComponent));
