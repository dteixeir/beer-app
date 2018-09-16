import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BeerState } from './beer.reducer';

export const getState = createFeatureSelector<BeerState>('beer');
export const getItems = createSelector(getState, (state: BeerState) => state.beers);
export const getSelected = createSelector(getState, (state: BeerState) => state.selectedBeer);