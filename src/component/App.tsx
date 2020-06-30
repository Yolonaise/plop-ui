import React, { useState, useCallback } from 'react';
import './App.scss';
import HomeComponent from './home/Home';
import Header from './header/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import { Snackbar, SnackbarOrigin } from '@material-ui/core';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<Color | undefined>(undefined);
  const [message, setMessage] = useState<string>('');
  const handleNotify = useCallback((m: string, s: Color) => {
    setOpen(true);
    setSeverity(s);
    setMessage(m);
  }, [setSeverity, setMessage, setOpen])
  return (
    <Router>
      <div className="app-container">
        <HomeComponent notify={(m, s) => handleNotify(m, s)} />
        <Header/>
      </div>
      <Snackbar 
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right'} as SnackbarOrigin} >
          <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </Router>
  );
}

export default App;
