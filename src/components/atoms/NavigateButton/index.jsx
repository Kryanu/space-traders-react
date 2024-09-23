import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function NavigateButton(props) {
  const { callBack, text, route, callBackProps, style } = props;
  let classes = { margin: 'auto' };
  if (style) {
    classes = style;
  }
  const navigate = useNavigate();

  const navigateCallBack = async () => {
    if (callBack) {
      await callBack(callBackProps);
    }
    navigate(route);
  };

  return (
    <Button
      onClick={async () => {
        await navigateCallBack();
      }}
      sx={classes}
    >
      {text}
    </Button>
  );
}
