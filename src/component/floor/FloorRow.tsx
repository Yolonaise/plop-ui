import React from 'react';
import { WithServerProps, withServer } from '../../context/server';
import { Floor } from '../../model/FloorModel';
import { Button } from '@material-ui/core';

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

  render() {
    return (
      <div style={{width: '100%'}}>
        <label>{this.state?.floor?.name}</label>
        <Button variant="contained" onClick={this.handleRemoveFloor}>Remove</Button>
      </div>
    );
  }
}

export default withServer(FloorRow);