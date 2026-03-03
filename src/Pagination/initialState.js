export const VIRTUAL_PAGE_SIZE = 10;
export const OFF_SET_SCROLL = 80;
export const initialState = (pageSize = VIRTUAL_PAGE_SIZE, key) => ({
  rows: [],
  skip: 0,
  requestedSkip: 0,
  take: pageSize * 2,
  totalCount: 0,
  loading: false,
  key: key,
  lastQuery: "",
});
