import { userDataStore, gameDataStore } from '../../../stores';
import '../../../App.css';
import { useContext, useEffect, useState } from 'react';
import { SignUpComponents, InitialComponents } from './children';
import { TokenContext } from '../../../context/TokenContext';

export default function Start() {
  const { faction, changeHandle, changeFaction } = userDataStore();

  const { token, setToken, handle, setHandle } = useContext(TokenContext);
  const { updateGame } = gameDataStore();
  const [isSignUp, setSignUp] = useState(false);
  useEffect(() => {
    if (token) {
      window.sessionStorage.setItem('token', token);
    }
  });

  return (
    <>
      <h1 className='mb-8'>Space Traders</h1>
      {SignUpComponents(
        isSignUp,
        { changeFaction, setHandle, updateGame, setToken },
        { handle, faction }
      )}
      {InitialComponents(isSignUp, { setSignUp, setHandle, setToken })}
    </>
  );
}
//
