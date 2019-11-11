import React from 'react';
import SortCaret from './SortCaret';
import { Suffix } from '../../constants';

export type Props = {
  isActive: boolean;
  isReverse: boolean;
  uniqueKey: string;
  onSort: () => void;
  children: React.ReactNode;
  suffix: typeof Suffix;
  sortKey: string;
  gotoPage: () => void;
  isFetching: boolean;
  sortActionCreator: ({
    sortKey,
    direction,
  }: {
    sortKey: string;
    direction?: boolean;
  }) => void;
};

export default class Sort extends React.Component<Props> {
  onSort = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const {
      onSort,
      sortActionCreator,
      sortKey,
      isReverse,
      gotoPage,
      isFetching,
    } = this.props;

    if (isFetching) {
      return;
    }
    onSort();
    gotoPage();
    if (sortActionCreator) {
      sortActionCreator({ sortKey, direction: isReverse });
    }
  };

  render() {
    const { isActive, isReverse, suffix, children } = this.props;

    const linkClass = ['composable-list-sort'];

    if (isActive) {
      linkClass.push('composable-list-sort-active');
    }

    return (
      <a onClick={this.onSort} className={linkClass.join(' ')}>
        {children}
        &nbsp;
        <SortCaret suffix={suffix} isActive={isActive} isReverse={isReverse} />
      </a>
    );
  }
}
