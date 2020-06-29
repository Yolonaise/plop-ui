import React from 'react';
import './Header.scss';

class Header extends React.PureComponent<any> {
  render() {
    return (
    <div className="header-container">
      <div>
        <span>Plop</span>
      </div>
      <div>
        <span>Hello there, I'm a hidden text</span>
      </div>
    </div>)
  }
}

export default Header;
