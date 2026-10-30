interface Action {
  text: string;
  callBack: (...args: never[]) => unknown;
  callBackProps?: unknown;
}

interface ActionRowProps {
  actions: Action[];
  style?: string;
}

export default function ActionRow({ actions, style }: ActionRowProps) {
  const classes = `${style}`;

  const buttons = actions.map((action, index) => {
    return (
      <button
        onClick={() => {
          action.callBack(action.callBackProps as never);
        }}
        key={index}
      >
        {action.text}
      </button>
    );
  });

  return <div className={classes}>{buttons}</div>;
}
