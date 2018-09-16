import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BreweryState } from './brewery.reducer';

export const getState = createFeatureSelector<BreweryState>('brewery');
export const getItems = createSelector(getState, (state: BreweryState) => state.breweries);
export const getSelected = createSelector(getState, (state: BreweryState) => state.selectedBrewery);
