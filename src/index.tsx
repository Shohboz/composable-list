import { combineReducers } from 'redux';
import * as enhancements from './enhancements';
import * as components from './components';
import paginate, { gotoPage, PaginationState } from './modules/paginate';
import sort, { SortState } from './modules/sort';

export type State = Readonly<{
  paginate: PaginationState;
  sort: SortState;
}>;

export default combineReducers({
  paginate,
  sort,
});

const actionCreators = {
  paginate: gotoPage,
};

export { components, enhancements, actionCreators };
