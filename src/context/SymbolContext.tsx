import { createContext, useContext, useMemo, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

interface SymbolContextValue {
  symbol: string;
  setSymbol: Dispatch<SetStateAction<string>>;
}

const SymbolContext = createContext<SymbolContextValue | undefined>(undefined);

export function SymbolProvider({ children }: { children: ReactNode }) {
  const [symbol, setSymbol] = useState('');
  const value = useMemo(() => ({ symbol, setSymbol }), [symbol]);
  return <SymbolContext.Provider value={value}>{children}</SymbolContext.Provider>;
}

export function useSymbol(): SymbolContextValue {
  const context = useContext(SymbolContext);
  if (!context) {
    throw new Error('useSymbol must be used within SymbolProvider');
  }
  return context;
}
