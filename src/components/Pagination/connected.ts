import { connect } from 'react-redux';
import { gotoPage } from '../../modules/paginate';
import Pagination from './Pagination';

export type Props = {
  gotoPage: typeof gotoPage;
  fn: (params: { offset?: number; limit?: number }) => void;
  uniqueKey: string;
  items: number[];
  current: number;
  count: number;
  limit: number;
  offset: number;
  isFetching: boolean;
};

export default connect(
  null,
  { gotoPage }
)(Pagination);
