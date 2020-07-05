/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { WithServerProps, withServer } from '../../context/server';
import { Floor } from '../../model/FloorModel';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Slide } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions/transition';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface FloorModalProps extends WithServerProps {
  open: boolean;
  floorId?: string;
  onOpen: ()=>void;
  onClose: (value: Floor | undefined)=>void;
}

interface FloorModalState {
  floor: Floor;
  isFetching: boolean;
}

class FloorModal extends React.Component<FloorModalProps, FloorModalState> {

  constructor(props: FloorModalProps) {
    super(props);

    this.state = {
      floor: {name: '', rooms: [], number: 0},
      isFetching: false,
    }
  }

  handleOpen = () => { this.props.onOpen(); }
  
  handleClose = () => { this.props.onClose(undefined); }

  handleSubmit = async () => {
    try {
      const res = await (await fetch(this.props.url + '/floor/', {
        method: this.props.floorId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state.floor)
      })).json();

      if(res && res._id)
        this.props.onClose({...res} as Floor);

    } catch (error)  { }
  }
  
  handleChange(value: Floor) {
    this.setState({
      ...this.state, 
      floor: value
    })
  }

  render() {
    const { open } = this.props;
    return (
      <Dialog 
          open={open}
          TransitionComponent={Transition}>
          <DialogTitle id="form-dialog-title">Create house</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Time to create a floor for the flourish space🐱‍👤  
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              fullWidth
              defaultValue={this.state.floor.name}
              placeholder="Your house name"
              onChange={(value) => this.handleChange({...this.state.floor, name: value.target.value })}
            />
             <TextField
              margin="dense"
              id="number"
              label="Number"
              type="number"
              fullWidth
              defaultValue={this.state.floor.number}
              placeholder="Your house name"
              onChange={(value) => this.handleChange({...this.state.floor, number: parseInt(value.target.value) })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" disabled={this.state.isFetching}>
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary" disabled={this.state.isFetching}>
              {this.state.floor?._id ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
    )
  }
}

export default withServer(FloorModal);