import React from 'react';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert';
import { Snackbar, SnackbarOrigin } from '@material-ui/core';

export interface SnackProps {
  notify?: (message: string, severity: Color) => {}
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function withSnacks<P>(Component: React.ComponentType<P>) {
  return class WithSnacks extends React.Component<P> {
    state = {
      open: false,
      message: '',
      severity: undefined,
    };

    renderSnack(message: string, severity: Color) {
      this.setState({...this.state, open: true, message: message, severity: severity });
    }

    handleClose = () => {
      this.setState({...this.state, open: false});
    };

    render() {
      return (
        <>
          <Component {...this.props as P} notify={(m: string, s: Color) => this.renderSnack(m, s)}/>
          <Snackbar 
            open={this.state.open}
            onClose={this.handleClose}
            autoHideDuration={2000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right'} as SnackbarOrigin} >
              <Alert severity={this.state.severity}>{this.state.message}</Alert>
          </Snackbar>
        </>
      );
    }
  }
}