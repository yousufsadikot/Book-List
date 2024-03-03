import { Link } from "react-router-dom";

const ListCards = ({ data }) => {
  return (
    <>
      {data.map((book) => {
        return (
          <div
            className="col-md-5 card"
            style={{
              paddingTop: "10px",
              marginBottom: "33px",
              backgroundColor: "#f9f9f9",
            }}
            key={book.id}
          >
            <div style={{ height: "180px", overflow: "hidden" }}>
              {book.image_id && (
                <Link to={`/book/${book.id}`}>
                  <img
                    style={{ position: "relative", top: "-70px" }}
                    src={`https://www.artic.edu/iiif/2/${book.image_id}/full/843,/0/default.jpg`}
                    alt={book.title}
                    width="100%"
                  />
                </Link>
              )}
            </div>
            <div className="card-body">
              <p className="card-text">
                <Link to={`/book/${book.id}`}>{book.title}</Link>
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ListCards;
