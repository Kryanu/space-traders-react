const ACTIONS = ['Dock', 'Orbit', 'Extract', 'Fly', 'Refuel', 'Sell'];

interface ShipActionsProps {
  shipSymbol?: string;
}

export function ShipActions({ shipSymbol }: ShipActionsProps) {
  return (
    <div className='flex flex-col space-y-4 p-4'>
      <div className='flex justify-between items-center'>
        <div>{shipSymbol}</div>
        <div>Staus</div>
      </div>
      <div className='grid grid-cols-2  gap-4'>
        {ACTIONS.map((action) => (
          <div className='px-8 py-4 bg-active-secondary'>{action}</div>
        ))}
      </div>
    </div>
  );
}
