import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import get from 'lodash.get';
import { getContext } from './helpers';
import { doTableSort } from '../../modules/sort';
import { gotoPage } from '../../modules/paginate';
import Sort from './Sort';
import { KEY } from '../../constants';

type OwnProps = {
  sortKey: string;
  uniqueKey: string;
  sortFn: () => void;
  sortActionCreator: () => void;
};

function mapStateToProps(state, { sortKey, uniqueKey }: OwnProps) {
  const { sortKey: stateSortKey, isReverse: stateIsReverse } = get(
    state,
    `${KEY}.sort.${uniqueKey}`,
    {}
  );

  const isActive = stateSortKey === sortKey;
  const isReverse = stateIsReverse && isActive;

  return {
    isActive,
    isReverse,
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<AnyAction>,
  { sortKey, uniqueKey, sortFn, sortActionCreator }: OwnProps
) {
  return {
    onSort: bindActionCreators(
      () => doTableSort(uniqueKey, sortKey, sortFn),
      dispatch
    ),
    sortActionCreator,
    gotoPage: bindActionCreators(
      () => gotoPage(uniqueKey, { current: 0 }),
      dispatch
    ),
  };
}

const contextTypes = {
  uniqueKey: PropTypes.string.isRequired,
  sortActionCreator: PropTypes.func,
};

export default getContext(contextTypes)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Sort)
);
