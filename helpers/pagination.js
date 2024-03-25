module.exports = (objPagination, query, countListBike) => {
  if (query.page) {
    objPagination.currentPage = parseInt(query.page);
  }
  objPagination.skip =
    (objPagination.currentPage - 1) * objPagination.limitItem;

  const totalPage = Math.ceil(countListBike / objPagination.limitItem);
  objPagination.totalPage = totalPage;
  return objPagination;
};
