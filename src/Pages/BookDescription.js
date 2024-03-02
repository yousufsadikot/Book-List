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
  // const handleBack = () => {
  //   history.goBack();
  //};
  return (
    <>
      <h1>{book.title}</h1>
      <img src={book.thumbnail?.lqip} alt={book.title} width="15%" />
      <div>{book.artist_display}</div>
      <div>{book.date_display}</div>
      <div>{book.main_reference_number}</div>

      <div>{book.dimensions}</div>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
};

export default BookDescription;
