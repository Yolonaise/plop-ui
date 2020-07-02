/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Home } from '../../model/HomeModel';
import { Dialog, Slide, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { withServer, WithServerProps } from '../../context/server';

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
  isFectching: boolean,
}

class HomeModal extends React.Component<HomeModalProps, HomeModalState> {

  constructor(props: HomeModalProps) {
    super(props);
    this.state = {
      home: this.props.home ? this.props.home : { name: 'my house', floors: []} as Home,
      isFectching: false
    };
  }

  handleOpen = () => { this.props.onOpen(); }
  
  handleClose = () => { this.props.onClose(); }

  handleSubmit = async () => {
    try {
      const res = await (await fetch(this.props.url + '/home/', {
        method: this.props.home?._id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state.home)
      })).json();

      if(res && res._id)
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
              This is your home, please do not be an idiot and give it a fancy name 🐱‍👤  
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              fullWidth
              defaultValue={this.state.home.name}
              placeholder="Your house name"
              onChange={(value) => this.handleChange({...this.state.home, name: value.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" disabled={this.state.isFectching}>
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary" disabled={this.state.isFectching}>
              {this.state.home._id ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
    )
  }
}

export default withServer(HomeModal);