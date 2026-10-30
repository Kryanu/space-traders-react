import type { Agent } from '@types';

const detailMapping: Record<Exclude<keyof Agent, 'accountId'>, string> = {
  symbol: 'Symbol',
  headquarters: 'HQ Coordinates',
  credits: 'Credits',
  startingFaction: 'Faction',
  shipCount: 'Ships',
};

export default function AgentDetails({ agent }: { agent: Agent | undefined }) {
  if (!agent) {
    return <></>;
  }

  const keys = Object.keys(detailMapping) as Array<keyof typeof detailMapping>;

  return (
    <div className='flex flex-col text-left rounded-md border-2 border-map-green p-4 '>
      {keys.map((item) => (
        <p style={{ color: '#32C832' }} key={item}>
          {`${detailMapping[item]}: ${agent[item]}`}
        </p>
      ))}
    </div>
  );
}
