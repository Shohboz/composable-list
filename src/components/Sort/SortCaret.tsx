import React from 'react';
import { Suffix } from '../../constants';

type Props = {
  suffix: typeof Suffix;
  isActive: boolean;
  isReverse: boolean;
};

const takeSuffix = (suffix: Props['suffix'], isReverse: Props['isReverse']) =>
  isReverse ? suffix.DESC : suffix.ASC;

const SortCarret: React.FunctionComponent<Props> = ({
  suffix,
  isActive,
  isReverse,
}) => (
  <span>
    {suffix && isActive
      ? takeSuffix(suffix, isReverse)
      : suffix.default || null}
  </span>
);

export default SortCarret;
