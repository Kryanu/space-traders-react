import { Button } from '@mui/material';
export default function ActionRow({ actions, style }) {
  const classes = `${style}`;

  const buttons = actions.map((action, index) => {
    return (
      <Button
        onClick={() => {
          action.callBack(action.callBackProps);
        }}
        key={index}
      >
        {action.text}
      </Button>
    );
  });

  return <div className={classes}>{buttons}</div>;
}
