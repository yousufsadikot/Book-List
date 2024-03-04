**Book List Application**

[link](url){:target="_blank"}

- clone repo
- run: 'npm install'
- run: 'npm start'

This will get the development server up to see the application.

**Development**:
Used React (v 18.2) components for artwork list page and description page, both of which interact with an external API to fetch artwork data.

**UI Design**:
The layout prioritizes intuitive and appealing artwork display, emphasizing mobile-first design principles. It leverages Semantic HTML and responsive CSS to effectively meet SEO and accessibility standards. Reusable components have been constructed to enhance modularity, scalability, and code consistency across the application.

**List Component**

**Functionality:**
The BookList component is responsible for rendering a list of artworks based on certain criteria such as search queries and selected categories.
It fetches book data from the Art Institute of Chicago's API using Axios.
It allows users to search for artwork by title and filter them by category.

**State Management:**

- It manages several states using the useState hook:
  - `books`: Holds the list of artworks fetched from the API.
  - `loading`: Indicates whether the data is still loading or not.
  - `searchQuery`: Stores the user's search query for filtering artwork by title.
  - `selectedCategory`: Stores the selected category for filtering artwork.
  - `currentPage`: Tracks the current page number for pagination.
  - `recordsPerPage`: Defines the number of records to display per page.

**Fetching Data:**
Utilizes the useEffect hook to fetch artwork data from the API when the component mounts or when searchQuery or selectedCategory changes.
It constructs the API URL and performs the GET request using Axios.
Filters the fetched books based on the search query and selected category.

**Event Handling:**
Provides event handlers for input changes in the search bar (handleSearch) and category selection (handleCategoryChange).

**Pagination:**
Renders a pagination component (Pagination) to navigate through multiple pages of artwork results.

**Description Component:**

**Functionality:**
The BookDescription component displays detailed information about a specific artwork.
It fetches the detailed information of the artwork identified by the bookId parameter from the URL.
After fetching the data, it displays the artwork details using the DetailPage component.

**State Management:**
Manages the state of book, which holds the detailed information of the artwork fetched from the API.
Also manages the loading state to indicate whether the data is still loading.

**Fetching Data:**
Utilizes the useEffect hook to fetch artwork details from the API when the component mounts.
Uses the useParams hook from React Router DOM to extract the bookId parameter from the URL.
Constructs the API URL using the bookId parameter and performs the GET request using Axios.

**Navigation:**
Provides a button to allow users to navigate back to the previous page using the useNavigate hook from React Router DOM.

Both components use Axios for making HTTP requests to the Art Institute of Chicago's API and manage loading states to provide a better user experience while data is being fetched. Additionally, they leverage React hooks for managing state and performing side effects.

**Reusable Components**
By incorporating reusable components like ListCards, DetailPage, and Pagination, the codebase becomes more organized, maintainable, and scalable, enhancing productivity and improving overall application quality.
