/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Home } from '../../model/HomeModel';
import { Dialog, Slide, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { Room } from '../../model/RoomModel';
import { withServer, WithServerProps } from '../../context/server';
import { Autocomplete } from '@material-ui/lab';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface HomeModalProps extends WithServerProps {
  home?: Home;
  open: boolean;
  onOpen: () => Promise<any>;
  onClose: (value?: Home) => Promise<any>;
}

interface HomeModalState {
  home: Home;
  rooms: Room[];
}

class HomeModal extends React.Component<HomeModalProps, HomeModalState> {

  constructor(props: HomeModalProps) {
    super(props);
    this.state = {
      home: this.props.home ? this.props.home : { name: 'my house', floors: 1, rooms: []} as Home,
      rooms: []
    };
  }

  async componentDidMount() {
    let rooms : Room[] = [];
    try {
      rooms = await (await fetch(this.props.url + '/room/')).json();
    } catch(error) { }
    this.setState({
      ...this.state,
      rooms: rooms
    });
  }

  handleOpen = () => {
    this.props.onOpen();
  }
  
  handleClose = () => {
    this.props.onClose();
  }

  handleAdd = async () => {
    try {
      const res = await (await fetch(this.props.url + '/home/', {
        method: this.props.home?._id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state.home)
      })).json();

      if(res && res._id )
        this.props.onClose({...res} as Home);

    } catch (error)  { }
  }
  
  handleChange(value: Home) {
    this.setState({
      ...this.state, 
      home: value
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
              This is your new house, please do not be an idiot and give it a fancy name 🐱‍👤  
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              fullWidth
              defaultValue={this.state.home.name}
              onChange={(value) => this.handleChange({...this.state.home, name: value.target.value })}
            />
            <TextField
              margin="dense"
              id="floors"
              label="Number of floors"
              type="number"
              fullWidth
              defaultValue={this.state.home.floors}
              onChange={(value) => this.handleChange({...this.state.home, floors: parseInt(value.target.value)})}
            />
            <Autocomplete 
              multiple
              options={this.state.rooms} 
              getOptionLabel={(r: Room) => r.name }
              defaultValue={this.state.rooms.filter((v) => this.state.home.rooms.includes(v._id ? v._id.$oid : ''))}
              onChange={(_, value) => this.handleChange({...this.state.home, rooms: value.map((v) => v._id ? v._id.$oid : '')})}
              renderInput={(params) => 
                <TextField {...params}
                  label="Rooms"
                  margin="dense"
                  variant="standard"
                  fullWidth /> }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAdd} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
    )
  }
}

export default withServer(HomeModal);