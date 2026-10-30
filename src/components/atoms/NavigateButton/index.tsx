import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

interface NavigateButtonProps {
  callBack?: (...args: never[]) => unknown;
  text: ReactNode;
  route: string;
  callBackProps?: unknown;
  style?: SxProps<Theme>;
}

export default function NavigateButton(props: NavigateButtonProps) {
  const { callBack, text, route, callBackProps, style } = props;
  let classes: SxProps<Theme> = { margin: 'auto' };
  if (style) {
    classes = style;
  }
  const navigate = useNavigate();

  const navigateCallBack = async () => {
    if (callBack) {
      await callBack(callBackProps as never);
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
