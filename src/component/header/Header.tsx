import React from 'react';
import './Header.scss';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

class Header extends React.PureComponent<any> {
  render() {
    return (
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Plop
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

export default Header;
