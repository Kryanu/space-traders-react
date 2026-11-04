import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

interface GameContextValue {
  activeShipSymbol: string | undefined;
  selectShip: (symbol: string) => void;
  activeWaypointSymbol: string | undefined;
  toggleWaypoint: (symbol: string) => void;
  isCargoOpen: boolean;
  toggleCargo: () => void;
  isMarketOpen: boolean;
  toggleMarket: () => void;
  reset: () => void;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [activeShipSymbol, setActiveShipSymbol] = useState<string>();
  const [activeWaypointSymbol, setActiveWaypointSymbol] = useState<string>();
  const [isCargoOpen, setIsCargoOpen] = useState(true);
  const [isMarketOpen, setIsMarketOpen] = useState(false);

  const selectShip = useCallback((symbol: string) => {
    setActiveShipSymbol(symbol);
    setActiveWaypointSymbol(undefined);
    setIsMarketOpen(false);
  }, []);

  const toggleWaypoint = useCallback((symbol: string) => {
    setActiveWaypointSymbol((current) =>
      current === symbol ? undefined : symbol,
    );
  }, []);

  const toggleCargo = useCallback(() => setIsCargoOpen((open) => !open), []);
  const toggleMarket = useCallback(() => setIsMarketOpen((open) => !open), []);

  const reset = useCallback(() => {
    setActiveShipSymbol(undefined);
    setActiveWaypointSymbol(undefined);
    setIsMarketOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      activeShipSymbol,
      selectShip,
      activeWaypointSymbol,
      toggleWaypoint,
      isCargoOpen,
      toggleCargo,
      isMarketOpen,
      toggleMarket,
      reset,
    }),
    [
      activeShipSymbol,
      selectShip,
      activeWaypointSymbol,
      toggleWaypoint,
      isCargoOpen,
      toggleCargo,
      isMarketOpen,
      toggleMarket,
      reset,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame(): GameContextValue {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}
