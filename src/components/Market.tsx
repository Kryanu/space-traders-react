import { useMarket } from '@api-hooks';
import { useGame } from '../context/GameContext';
import { useActiveShip } from '../hooks';
import { Button } from './ui/Button';
import { Panel } from './ui/Panel';

const COLUMNS = 'grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center gap-2';

export function Market() {
  const { ship } = useActiveShip();
  const { isMarketOpen } = useGame();

  const isVisible = isMarketOpen && ship?.nav.status === 'DOCKED';
  const market = useMarket(
    ship?.nav.waypointSymbol,
    ship?.nav.systemSymbol,
    isVisible,
  ).data;

  if (!isVisible || !market) return null;

  return (
    <Panel title='Marketplace' className='overflow-x-auto'>
      <div className={`${COLUMNS} text-xs text-gray-400 uppercase`}>
        <span>Symbol</span>
        <span>Type</span>
        <span>Supply</span>
        <span>Purchase</span>
        <span>Sell</span>
        <span />
      </div>
      {market.tradeGoods?.map((good) => (
        <div
          key={good.symbol}
          className={`${COLUMNS} p-2 text-sm border border-solid border-secondary-gray bg-active-secondary`}
        >
          <span className='text-primary'>{good.symbol}</span>
          <span>{good.type}</span>
          <span>{good.supply}</span>
          <span className='text-primary'>{good.purchasePrice}</span>
          <span>{good.sellPrice}</span>
          <Button className='py-1' disabled title='Buying is not available yet'>
            Trade
          </Button>
        </div>
      ))}
    </Panel>
  );
}
