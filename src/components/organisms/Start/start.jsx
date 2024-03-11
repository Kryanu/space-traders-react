import '../../../App.css';
import { useContext, useEffect, useState } from 'react';
import { SignUpComponents, InitialComponents } from './children';
import { Typography } from '@mui/material';
import { GameContext, TokenContext } from '../../../context';

export default function Start() {
  const [faction, changeFaction] = useState(undefined);
  const { token, setToken, handle, setHandle } = useContext(TokenContext);
  const { setAgent } = useContext(GameContext);
  const [isSignUp, setSignUp] = useState(false);
  useEffect(() => {
    if (token) {
      window.localStorage.setItem('token', token);
    }
  });

  return (
    <>
      <Typography color={'#32C832'} sx={{ marginBottom: '2rem' }} variant='h2'>
        Space Traders
      </Typography>
      {SignUpComponents(
        isSignUp,
        { changeFaction, setHandle, setToken },
        { handle, faction }
      )}
      {InitialComponents(isSignUp, { setSignUp, setHandle, setToken, setAgent })}
    </>
  );
}
//
