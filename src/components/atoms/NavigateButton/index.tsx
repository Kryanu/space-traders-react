import { useNavigate } from 'react-router-dom';
import type { CSSProperties, ReactNode } from 'react';

interface NavigateButtonProps {
  callBack?: (...args: never[]) => unknown;
  text: ReactNode;
  route: string;
  callBackProps?: unknown;
  style?: CSSProperties;
}

export default function NavigateButton(props: NavigateButtonProps) {
  const { callBack, text, route, callBackProps, style } = props;
  const classes: CSSProperties = style ?? { margin: 'auto' };
  const navigate = useNavigate();

  const navigateCallBack = async () => {
    if (callBack) {
      await callBack(callBackProps as never);
    }
    navigate(route);
  };

  return (
    <button
      onClick={async () => {
        await navigateCallBack();
      }}
      style={classes}
    >
      {text}
    </button>
  );
}
