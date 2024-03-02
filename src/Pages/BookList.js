import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import categoryList from "../components/CategoryList";
import Spinner from "react-bootstrap/Spinner";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let url = `https://api.artic.edu/api/v1/artworks?page=${currentPage}`;

        if (searchQuery) {
          url = `https://api.artic.edu/api/v1/artworks?limit=100`;
        } else if (selectedCategory) {
          url = `https://api.artic.edu/api/v1/artworks?limit=100`;
        }

        const response = await axios.get(url);
        let filteredBooks = response.data.data;

        // Search based on Title if it's not empty
        if (searchQuery.length > 0) {
          filteredBooks = filteredBooks.filter((book) =>
            book.title.match(searchQuery)
          );
          console.log(" selectedCategory", filteredBooks);
        }

        // Filter based on selected category if it's not empty
        else if (selectedCategory) {
          filteredBooks = filteredBooks.filter((book) =>
            book.category_titles.some((a) => a === selectedCategory)
          );
          console.log(" selectedCategory", filteredBooks);
        }

        setBooks(filteredBooks);
        setLoading(false);
      } catch (error) {
        console.error("Error Fetching Books", error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, [currentPage, searchQuery, selectedCategory]);

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
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Table bordered responsive hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Thumbnail</th>
              </tr>
            </thead>
            <tbody>
              {books?.map((book) => {
                return (
                  <tr key={book.id}>
                    <td>
                      <Link to={`/book/${book.id}`}>{book.title}</Link>
                    </td>
                    <td>
                      {book.image_id && (
                        <Link to={`/book/${book.id}`}>
                          <img
                            src={`https://www.artic.edu/iiif/2/${book.image_id}/full/843,/0/default.jpg`}
                            alt={book.title}
                            width="100px%"
                          />
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </div>

      <div className="d-flex justify-content-end ">
        <Pagination>
          {Array.from({ length: 10 }).map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </>
  );
};

export default BookList;
