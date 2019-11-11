import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import isEmpty from 'lodash.isempty';
import get from 'lodash.get';
import { doTableSort } from '../../modules/sort';
import { KEY } from '../../constants';

const sortList = (fn: (items: Array<any>) => Array<any>) => (
  list: Array<any>
) => (fn ? fn(list) : list);

const initialConfig = {};

export type ConfigType = {
  sortKey?: string;
  fn?: (param?) => void;
  sortFn?: () => void;
};

export type Props = {
  sort;
  onTableSort: (sortKey: string, sortFn: () => void) => void;
  sortActionCreator: () => void;
};

export type OwnProps = {
  items: Array<any>;
  uniqueKey: string;
};

export default (configuration: ConfigType = {}) => Enhanced => {
  class WithSort extends React.Component<Props> {
    componentDidMount() {
      const { sort, onTableSort } = this.props;

      if (configuration.sortKey && configuration.sortFn && isEmpty(sort)) {
        onTableSort(configuration.sortKey, configuration.sortFn);
      }
    }

    render() {
      const { sortActionCreator, sort, onTableSort, ...props } = this.props;

      return <Enhanced {...props} sortActionCreator={sortActionCreator} />;
    }
  }

  const mapStateToProps = (state, { items, uniqueKey }: OwnProps) => {
    const sortable = get(state, `${KEY}.sort.${uniqueKey}`, {});

    const sort = {
      ...initialConfig,
      ...configuration,
      ...sortable,
    };

    return {
      items: sortList(sort && sort.sortFn)(items),
      sort,
    };
  };

  const mapDispatchToProps = (
    dispatch: Dispatch<AnyAction>,
    { uniqueKey }: OwnProps
  ) => ({
    onTableSort: bindActionCreators(
      (sortKey, sortFn) => doTableSort(uniqueKey, sortKey, sortFn),
      dispatch
    ),
    sortActionCreator:
      configuration.fn && bindActionCreators(configuration.fn, dispatch),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithSort);
};
