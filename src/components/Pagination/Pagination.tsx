import * as React from 'react';
import Paginator from './Paginator';
import { Props } from './connected';

const NoItems = () => null;

export default class Pagination extends React.Component<Props> {
  onPageChange = (value: number) => {
    const { uniqueKey, gotoPage, fn, limit } = this.props;

    gotoPage(uniqueKey, { current: value });
    if (fn) {
      fn({ limit, offset: +value * limit });
    }
  };

  render() {
    const { items, current, count, isFetching } = this.props;

    return items.length < 2 || isFetching ? (
      <NoItems />
    ) : (
      <Paginator
        items={items}
        onPageChange={this.onPageChange}
        current={current}
        pageCount={count}
      />
    );
  }
}
