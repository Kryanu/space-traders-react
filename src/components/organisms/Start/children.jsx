
export const InitialComponents = (isSignUp) => {
  const [handleInput, setHandleInput] = useState(undefined);
  const queryClient = useQueryClient();

  if (isSignUp) {
    return <></>;
  }

  return (
    <div className='flex flex-col space-y-4'>
      <TextField
        variant='outlined'
        label='Agent Handler'
        onChange={(e) => {
          setHandleInput(e.target.value);
        }}
      />
      <div className='flex'>
        <NavigateButton isRendered={true} text={'Sign-Up'} route={'/sign-up'} />
        <NavigateButton
          isRendered={true}
          text={'Login'}
          callBack={retrieveToken}
          callBackProps={{
            handleInput,
            queryClient,
          }}
          route={'/console'}
        />
      </div>
    </div>
  );
};
