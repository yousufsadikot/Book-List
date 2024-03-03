import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BookDescription = () => {
  const bookID = useParams();
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDescription = async () => {
      try {
        const response = await axios.get(
          `https://api.artic.edu/api/v1/artworks/${bookID.bookId}`
        );

        setBook(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error Feching Books", error);
        setLoading(false);
      }
    };
    fetchBookDescription();
  }, []);

  return (
    <div className="row d-flex justify-content-center align-items-center mt-4">
      <div className="col-md-5">
        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <h3>{book.title}</h3>

            <img
              className="mt-3"
              src={`https://www.artic.edu/iiif/2/${book.image_id}/full/843,/0/default.jpg`}
              width="100%"
              alt={book.title}
            />
            <div className="mt-4">
              <div>
                <strong>Artist Display: </strong>
                {book.artist_display}
              </div>
              <div>
                <strong>Date Display: </strong> {book.date_display}
              </div>
              <div>
                <strong>Main Reference Number: </strong>
                {book.main_reference_number}
              </div>
              <div>
                <strong>Dimensions: </strong>
                {book.dimensions}
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BookDescription;
