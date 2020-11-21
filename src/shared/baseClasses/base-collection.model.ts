export interface BaseCollection<T> {
  collection?: T[];
  selected?: T;
  currentPage: number;
  pageSize: number;
}

export const defaultState = {
  collection: []
  , selected: null
  , currentPage: 0
  , pageSize: 15
};
