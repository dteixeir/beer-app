import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BreweryState } from './brewery.reducer';

export interface IPagerData {
  pageNumber: number;
  pageSize: number;
}

export const getState = createFeatureSelector<BreweryState>('brewery');

export const getPagerData = createSelector(getState, (state: BreweryState) => ({
  pageNumber: state.currentPage
  , pageSize: state.pageSize
}));

export const getItems = createSelector(getState, (state: BreweryState) => state.collection);
export const getSelected = createSelector(getState, (state: BreweryState) => state.selected);

