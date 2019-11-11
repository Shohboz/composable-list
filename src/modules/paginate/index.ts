import { Reducer } from 'redux';
import { ActionTypes as FilterActionTypes } from '../filter';

export enum ActionTypes {
  CHANGE = '@@composable-list/paginate/change',
}

export const gotoPage = (uniqueKey: string, value) => ({
  type: ActionTypes.CHANGE,
  payload: {
    uniqueKey,
    value,
  },
});

export type PaginationState = {};

const initialState: PaginationState = {};

const reducer: Reducer<PaginationState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE:
      const {
        payload: { uniqueKey, value },
      } = action;
      return {
        ...state,
        [uniqueKey]: value,
      };

    case FilterActionTypes.CHANGE:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
