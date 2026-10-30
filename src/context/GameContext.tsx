import { createContext, useContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { Ship, WaypointSummary } from '@types';

export interface ToastState {
	message: string;
	isVisible: boolean;
}

export interface GameContextValue {
	isToastVisible: ToastState;
	setIsToastVisible: Dispatch<SetStateAction<ToastState>>;
	waypoints: WaypointSummary[] | undefined;
	setWaypoints: Dispatch<SetStateAction<WaypointSummary[] | undefined>>;
	currentShip: Ship | undefined;
	setCurrentShip: Dispatch<SetStateAction<Ship | undefined>>;
	selectedWaypoint: WaypointSummary;
	setSelectedWaypoint: Dispatch<SetStateAction<WaypointSummary>>;
}

export const GameContext = createContext<GameContextValue | undefined>(undefined);

export function useGameContext(): GameContextValue {
	const context = useContext(GameContext);
	if (!context) {
		throw new Error('useGameContext must be used within GameContext.Provider');
	}
	return context;
}
