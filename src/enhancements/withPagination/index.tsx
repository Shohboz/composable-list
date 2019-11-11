import * as React from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import Pagination from '../../components/Pagination';
import { KEY } from '../../constants';
import {
  pageableSelector,
  countSelector,
  pagesSelector,
} from '../../modules/paginate/selectors';
import { getPageCount, getPageList } from '../../modules/paginate/helpers';

const initialConfig: PaginateConfig = {
  current: 0,
  size: 15,
  paginate: 5,
};

type PaginateConfig = Partial<{
  current: number;
  size: number;
  paginate: number;
  limit: number;
  fn: (param?) => void;
}>;

export default (configure: PaginateConfig = {}) => (
  PaginatorWrapper: React.Component | React.FunctionComponent
) => (WrappedComponent: React.Component) => {
  const WithPaginate: React.FunctionComponent<Props> = props => (
    <React.Fragment>
      {/*
            // @ts-ignore */}
      <WrappedComponent {...props} />
      {/*
            // @ts-ignore */}
      <PaginatorWrapper>
        <Pagination
          limit={props.limit}
          offset={props.offset}
          items={props.paginatedItems}
          current={props.current}
          count={props.count}
          uniqueKey={props.uniqueKey}
          fn={props.fn}
          isFetching={props.isFetching}
        />
      </PaginatorWrapper>
    </React.Fragment>
  );

  const mapStateToProps = (
    state,
    {
      items,
      uniqueKey,
      total,
      offset = 0,
      isServerSide,
      isFetching,
    }: {
      items: Array<any>;
      uniqueKey: string;
      total?: number;
      offset?: number;
      isServerSide?: boolean;
      isFetching?: boolean;
    }
  ) => {
    const paginate = get(state, `${KEY}.paginate.${uniqueKey}`, {});

    const pagination = {
      ...initialConfig,
      ...configure,
      ...paginate,
    };

    const pageCount = total && getPageCount(total, pagination.size);

    return {
      items: pageableSelector({
        pagination: {
          ...pagination,
          server: isServerSide,
        },
        items,
      }),
      paginatedItems: isServerSide
        ? getPageList(pageCount, pagination)
        : pagesSelector({ items, pagination }),
      uniqueKey,
      current: pagination.current,
      count: isServerSide ? pageCount : countSelector({ items, pagination }),
      limit: pagination.limit,
      isFetching,
      offset,
      isServerSide,
    };
  };

  const mapDispatchToProps = {
    fn: configure.fn,
  };

  type OwnProps = {
    children?: React.ReactNode;
  };

  type Props = ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps &
    OwnProps;

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithPaginate);
};
