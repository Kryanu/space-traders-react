import { Button } from '@mui/material';
export default function ActionRow(props) {
  const { actions } = props;

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

  return <div>{buttons}</div>;
}
