export function getVisibleList(
  list: Array<any>,
  { size, current, server }: { size: number; current: number; server: boolean }
) {
  const from = current * size;

  return server ? list : list.slice(from, from + size);
}

export function getPageCount(list: Array<any> | number = [], size: number) {
  return Math.ceil((Array.isArray(list) ? list.length : list) / size);
}

export function getPageList(
  count = 0,
  { paginate, current }: { paginate: number; current: number }
) {
  let firstPage = current === 0 ? current : current - Math.floor(paginate / 2);

  firstPage = firstPage < 0 ? 0 : firstPage;
  const lastPage = firstPage + paginate;

  return Array.apply(0, Array(count))
    .map((_x, idx: number) => idx)
    .slice(firstPage, lastPage);
}
