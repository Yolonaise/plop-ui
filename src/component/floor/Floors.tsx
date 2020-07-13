import React from 'react';
import { withServer, WithServerProps } from '../../context/server';
import { Button, Grid } from '@material-ui/core';
import { Floor } from '../../model/FloorModel';
import { withSnacks, SnackProps } from '../../context/snacking';
import FloorRow from './FloorRow';
import FloorModal from './FloorModal';

interface FloorsProps extends SnackProps, WithServerProps {
  floors: string[];
  onFloorUpdated: (floors: string[]) => Promise<any>;
}

interface FloorsState {
  open: boolean
}

class Floors extends React.Component<FloorsProps, FloorsState> {

  constructor(props: FloorsProps) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleAddFloor = async (): Promise<any> => {
    this.setState({...this.state, open: true});
  }

  handleRemoveFloor = async (id: string): Promise<any> => {
    this.props.onFloorUpdated(this.props.floors.filter(v => v !== id));
  }
  handleClose = (value: Floor | undefined): void => {
    if(value?._id?.$oid !== undefined)
      this.props.onFloorUpdated([...this.props.floors, value._id?.$oid]);
    
    this.setState({...this.state, open: false});
  }
  handleOpen= (): void => {
    this.setState({...this.state, open: false});
  }

  render() {
    const { floors } = this.props;
    return (
      <>  
        <div style={{marginTop:"10px"}}>
          <Grid 
            container 
            spacing={3}
            direction="column"
            justify="flex-start" >
          {
            floors.map((v, i) => {
              return (
                <Grid item xs={12}>
                  <FloorRow
                    floorId={v}
                    removeFloor={(id) => this.handleRemoveFloor(id)} />
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
        {
          this.state.open && 
          <FloorModal
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen} />
        }
      </>
    );
  }
}

export default withSnacks(withServer(Floors));