import { userDataStore, gameDataStore } from '../../../stores';
import '../../../App.css';
import { useContext, useEffect, useState } from 'react';
import { SignUpComponents, InitialComponents } from './children';
import { TokenContext } from '../../../App';

export default function Start() {
  const { handle, faction, changeHandle, changeFaction, changeToken } =
    userDataStore();

  const { token, setToken } = useContext(TokenContext);
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
        { changeFaction, changeHandle, updateGame, setToken },
        { handle, faction }
      )}
      {InitialComponents(isSignUp, { setSignUp, changeHandle, setToken })}
    </>
  );
}
//
