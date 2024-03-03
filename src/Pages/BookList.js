import axios from "axios";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
// import Table from "react-bootstrap/Table";
import categoryList from "../components/CategoryList";
import ListTable from "../components/ListTable";
import Pagination from "../components/Pagination";
import Spinners from "../components/Spinners";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let url = `https://api.artic.edu/api/v1/artworks?limit=100`;

        const response = await axios.get(url);
        let filteredBooks = response.data.data;

        // Search based on Title if it's not empty
        if (searchQuery.length > 0) {
          filteredBooks = filteredBooks.filter((book) =>
            book.title.toString().toLowerCase().includes(searchQuery)
          );
        }

        // Filter based on selected category if it's not empty
        else if (selectedCategory) {
          filteredBooks = filteredBooks.filter((book) =>
            book.category_titles.some((a) => a === selectedCategory)
          );
        }

        setBooks(filteredBooks);
        setLoading(false);
      } catch (error) {
        console.error("Error Fetching Books", error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, [searchQuery, selectedCategory]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    console.log(value);
  };
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = books.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(books.length / recordsPerPage);

  return (
    <>
      <div className="row mt-3">
        <div className="col-md-4">
          <div className="form-group">
            <input
              value={searchQuery}
              onChange={handleSearch}
              type="text"
              className="form-control"
              id="searchTitle"
              aria-describedby="searchTitle"
              placeholder="Search by title"
            />
          </div>
        </div>
        <div className="col-md-4 offset-md-4">
          <Form.Select
            aria-label="Select by category"
            onChange={handleCategoryChange}
          >
            <option value="">Select by category</option>
            {categoryList.map((category, index) => (
              <option key={index} value={category.category_titles}>
                {category.category_titles}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>

      <div className="mt-3">
        {loading ? <Spinners /> : <ListTable data={currentRecords} />}
      </div>

      {/* Paginations */}
      <div className="d-flex justify-content-end ">
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default BookList;
