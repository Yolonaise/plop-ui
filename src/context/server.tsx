import React from 'react';
import packageJson from '../env.json';
import { CircularProgress } from '@material-ui/core';
import { Help } from '@material-ui/icons';

enum ServerStatus {
  Up,
  Down
}

export function withServer<P>(Component: React.ComponentType<P>) {
  return class WithServer extends React.Component<P> {
    state = {
      fecthingServer: false,
      status: ServerStatus.Down,
      url: packageJson.proxy
    }

    async componentDidMount() {
      try {
        this.setState({fecthingServer: true});
        const res = await (await fetch(this.state.url + "/status")).json();
        if(res && res.status === 'online')
          this.setState({...this.state, status: ServerStatus.Up});
        this.setState({fecthingServer: false});
      } catch(error) {
        this.setState({...this.state, status: ServerStatus.Down});
        console.log(error);
      }
      this.setState({...this.state, fecthingServer: false});
    }

    render () {
      return (
        <>
          { 
            !this.state.fecthingServer && this.state.status === ServerStatus.Up ? 
              <Component {...this.props as P }/> :
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateY(-50%)'}}>
              {
                !this.state.fecthingServer && this.state.status === ServerStatus.Down ? 
                <Help fontSize="large" /> :
                <CircularProgress/>
              }
            </div>
          }
        </>
      );
    }
  }
}