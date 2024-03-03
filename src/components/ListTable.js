import { Link } from "react-router-dom";

import Table from "react-bootstrap/Table";

const ListTable = ({ data }) => {
  return (
    <Table bordered responsive hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Thumbnail</th>
        </tr>
      </thead>
      <tbody>
        {data.map((book) => {
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
  );
};

export default ListTable;
