import { createSelector } from 'reselect';
import { getVisibleList, getPageCount, getPageList } from './helpers';

const listSelector = state => state.items;
const pageSelector = state => state.pagination;
const sizeSelector = state => state.pagination.size;

export const pageableSelector = createSelector(
  [listSelector, pageSelector],
  getVisibleList
);

export const countSelector = createSelector(
  [listSelector, sizeSelector],
  getPageCount
);

export const pagesSelector = createSelector(
  [countSelector, pageSelector],
  getPageList
);
