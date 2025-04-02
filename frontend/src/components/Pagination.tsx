interface PaginationProps {
  // This is what the pagination component is expecting
  currentPage: number;
  totalPages: number;
  sortByPreference: string;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
  setSortByPreference: (newPreference: string) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  sortByPreference,
  pageSize,
  onPageChange,
  onPageSizeChange,
  setSortByPreference,
}: PaginationProps) => {
  return (
    <>
      {' '}
      <nav className="d-flex justify-content-center mt-4">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            {/*Disables button if page 1 is selected*/}
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map(
            (
              _,
              index // Maps out array to make the number of pages calculated above
            ) => (
              <li
                key={index + 1}
                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} // Puts on specific styling based on the selected page
              >
                <button
                  className="page-link"
                  onClick={() => onPageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
          <li
            className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
          >
            {/*Disables button if last page is selected*/}
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
      {/* Filters */}
      <div className="d-flex justify-content-center gap-3 mt-4">
        <div className="form-group">
          <label className="me-2 fw-bold">Results per page:</label>
          <select
            className="form-select d-inline w-auto"
            value={pageSize}
            onChange={(e) => {
              onPageSizeChange(Number(e.target.value)); // Sets page size based on selection user chooses
              onPageChange(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <div className="form-group">
          <label className="me-2 fw-bold">Sort By:</label>
          <select
            className="form-select d-inline w-auto"
            value={sortByPreference}
            onChange={(e) => setSortByPreference(e.target.value)} // Set the preference based on selection
          >
            <option value="Title">Title</option>
            <option value="Author">Author</option>
            <option value="Category">Category</option>
            <option value="Price">Price</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Pagination;
