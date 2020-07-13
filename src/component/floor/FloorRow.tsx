import React from 'react';
import { WithServerProps, withServer } from '../../context/server';
import { Floor } from '../../model/FloorModel';
import { Button, Grid } from '@material-ui/core';
import { Delete, Add }  from '@material-ui/icons';

interface FloorProps extends WithServerProps {
  floorId: string;
  removeFloor: (id: string) => Promise<any>;
}

interface FloorState {
  floor?: Floor;
}

class FloorRow extends React.Component<FloorProps, FloorState> {

  async componentDidMount() {
    try{
      const floor = await (await fetch(this.props.url + `/floor/${this.props.floorId}`)).json();
      this.setState({ floor: floor});
    } catch(error) {

    }
  }

  handleRemoveFloor = async (): Promise<any> => {
    try{
      await fetch(this.props.url + `/floor/${this.props.floorId}`, {method: 'DELETE'});
      this.props.removeFloor(this.props.floorId);
    } catch (error) {
    }
  }

  addRoom = async (): Promise<any> => {
    try{
      await fetch(this.props.url + `/floor/${this.props.floorId}`, {method: 'DELETE'});
      this.props.removeFloor(this.props.floorId);
    } catch (error) {
    }
  }

  render() {
    return (
      <Grid
        container 
          spacing={3}
          direction="column"
          justify="flex-start"
          alignItems="flex-start" >
          <Grid item>
            <Button 
              variant="contained"
              onClick={this.addRoom}
              style={{height:"100%"}}><Add/></Button>
          </Grid>
          <Grid item>
            <Button 
              variant="contained"
              onClick={this.handleRemoveFloor}
              style={{height:"100%"}}><Delete/></Button>
          </Grid>
      </Grid>
    );
  }
}

export default withServer(FloorRow);