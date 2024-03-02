import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";

const BookTable = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let url = `https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,main_reference_number,thumbnail,dimensions&page=${currentPage}&limit=10`;
        if (searchQuery) {
          url = `https://api.artic.edu/api/v1/artworks/search?q=${searchQuery}&fields=id,title,artist_display,date_display,main_reference_number,thumbnail,dimensions`;
        } else if (selectedCategory) {
          url = `https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,main_reference_number,thumbnail,dimensions,category_titles&category_titles=${selectedCategory}`;
        }

        const response = await axios.get(url);
        setBooks(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error Feching Books", error);
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
    setSelectedCategory(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={handleSearch}
      />

      <select onChange={handleCategoryChange} value={selectedCategory}>
        <option value="">Select Category</option>
        <option value="Architecture and Design">Architecture and Design</option>
        {/* Add more options as needed */}
      </select>
      <Table striped bordered responsive hover>
        <thead>
          <tr>
            <th>Title</th>

            <th>thubnail</th>
          </tr>
        </thead>
        <tbody>
          {books?.map((book) => {
            return (
              <tr key={book.id}>
                <Link to={`/book/${book.id}`}>
                  <td>{book.title}</td>
                </Link>

                <td>
                  <Link to={`/book/${book.id}`}>
                    <img
                      src={book.thumbnail?.lqip}
                      alt={book.title}
                      width="20px%"
                    />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div>
        <Pagination>
          {Array.from({ length: 10 }).map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageClick(index + 1)}
            >
              {console.log(index)}
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </>
  );
};

export default BookTable;
