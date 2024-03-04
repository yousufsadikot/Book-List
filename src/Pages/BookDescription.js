import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinners from "../components/Spinners";
import DetailPage from "../components/DetailPage";

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
  }, [bookID]);

  return (
    <div className="row d-flex justify-content-center align-items-center mt-4">
      <div className="col-md-5">
        {loading ? (
          <Spinners />
        ) : (
          <>
            <DetailPage book={book} />

            <button
              type="button"
              className="btn btn-primary mt-3"
              style={{ marginBottom: "20px" }}
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
