import React from 'react';
import packageJson from '../env.json';
import { CircularProgress } from '@material-ui/core';
import { Help } from '@material-ui/icons';

enum ServerStatus {
  Up,
  Down
}

export interface WithServerProps {
  status?: ServerStatus;
  url?: string;
}

export function withServer<P extends WithServerProps>(Component: React.ComponentType<P>) {
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
      }
      this.setState({...this.state, fecthingServer: false});
    }

    render () {
      return (
        <>
          { 
            !this.state.fecthingServer && this.state.status === ServerStatus.Up ? 
              <Component {...this.props as P } url={this.state.url} status={this.state.status}/> :
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