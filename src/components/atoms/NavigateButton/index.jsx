import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function NavigateButton(props) {
  const { isRendered = true, callBack, text, route, callBackProps } = props;
  const navigate = useNavigate();
  if (!isRendered) {
    return <></>;
  }
  const navigateCallBack = async () => {
    if(callBack) {
      await callBack(callBackProps);
    }
    navigate(route);
  };

  return (
    <Button
      onClick={async () => {
        await navigateCallBack();
      }}
      variant='contained'
      sx={{ margin: 'auto' }}
    >
      {text}
    </Button>
  );
}
