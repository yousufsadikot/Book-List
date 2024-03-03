const DetailPage = ({ book }) => {
  return (
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
    </>
  );
};

export default DetailPage;
