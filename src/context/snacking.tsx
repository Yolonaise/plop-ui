import React from 'react';
import { Color } from '@material-ui/lab/Alert';

export interface SnackProps {
  notify?: (message: string, severity: Color) => void
}

export function withSnacks<P extends SnackProps>(Component: React.ComponentType<P>) {
  return class WithSnacks extends React.Component<P> {
    render() {
      return (
        <>
          <Component {...this.props as P}/>
        </>
      );
    }
  }
}