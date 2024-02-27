import { userDataStore, gameDataStore } from '../../../stores';
import '../../../App.css';
import { useEffect, useState } from 'react';
import { SignUpComponents, InitialComponents } from './children';

export default function Start() {
  const { handle, faction, changeHandle, changeFaction, token, changeToken } =
    userDataStore();
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
        { changeFaction, changeHandle, updateGame },
        { handle, faction }
      )}
      {InitialComponents(isSignUp, { setSignUp, changeHandle, changeToken })}
    </>
  );
}
//
