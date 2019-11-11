import { Reducer } from 'redux';
import sortBy from 'lodash.sortby';
import partition from 'lodash.partition';
import isEmpty from 'lodash.isempty';

export enum ActionTypes {
  CHANGE = '@@composable-list/sort/change',
}

export function doTableSort(
  uniqueKey: string,
  sortKey: string,
  sortFn: () => void
) {
  return {
    type: ActionTypes.CHANGE,
    payload: {
      uniqueKey,
      sortKey,
      sortFn,
    },
  };
}

function getEnhancedSortFn(isReverse: boolean, sortFn: (item) => void) {
  return (items: Array<any>) => {
    if (!sortFn) {
      return items;
    }
    const [filledValues, emptyValues] = partition(
      items,
      item => !isEmpty(sortFn(item))
    );

    return isReverse
      ? sortBy(filledValues, sortFn)
          .reverse()
          .concat(emptyValues)
      : sortBy(filledValues, sortFn).concat(emptyValues);
  };
}

export type SortState = {};

const initialState: SortState = {};

const reducer: Reducer<SortState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE:
      const {
        payload: { uniqueKey, sortKey, sortFn },
      } = action;

      const isReverse =
        !!state[uniqueKey] &&
        state[uniqueKey].sortKey === sortKey &&
        !state[uniqueKey].isReverse;
      const enhancedSortFn = getEnhancedSortFn(isReverse, sortFn);

      return {
        ...state,
        [uniqueKey]: { sortFn: enhancedSortFn, sortKey, isReverse },
      };
    default:
      return state;
  }
};

export default reducer;
