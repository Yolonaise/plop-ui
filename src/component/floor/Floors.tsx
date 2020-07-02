import React from 'react';
import { withServer, WithServerProps } from '../../context/server';
import { Button, Grid } from '@material-ui/core';
import { Floor } from '../../model/FloorModel';
import { withSnacks, SnackProps } from '../../context/snacking';

interface FloorsProps extends SnackProps, WithServerProps {
  floors: string[];
  onFloorUpdated: (floors: string[]) => Promise<any>;
}

interface FloorsState {
}

class Floors extends React.Component<FloorsProps, FloorsState> {

  handleAddFloor = async (): Promise<any> => {
    const res = await (await fetch(this.props.url + `/floor/`, {
      method: 'POST',
      body: JSON.stringify({name: "swagg", number:0, rooms: []} as Floor),
      headers: { 'Content-Type': 'application/json' },
    })).json();

    this.props.onFloorUpdated([...this.props.floors, res._id.$oid]);
  }

  handleRemoveFloor = async (id: string): Promise<any> => {
    try{
      await fetch(this.props.url + `/floor/${id}`, {method: 'DELETE'});
      this.props.onFloorUpdated(this.props.floors.filter((v) => v !== id));
    } catch (error) {
      this.props.notify!(error.message, "error");
    }
  }

  render() {
    const { floors } = this.props;
    return (
      <div style={{marginTop:"10px"}}>
        <Grid container spacing={3}>
        {
          floors.map((v, i) => {
            return (
              <Grid item xs={12}>
                <Button variant="contained" onClick={() => this.handleRemoveFloor(v)}>Remove</Button>
              </Grid>)
          })
        }
          <Grid item xs={12}>
            <Button 
              variant="contained"
              color="primary"
              fullWidth
              onClick={this.handleAddFloor}> Add Floor </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withSnacks(withServer(Floors));