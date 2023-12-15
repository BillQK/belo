export const PostEditForm = ({
  description,
  searchTerm,
  searchResults,
  selectedAlbum,
  onDescriptionChange,
  onSearchTermChange,
  onAlbumSelect,
  onSave,
  onCancel,
  onDelete,
}) => {
  return (
    <form onSubmit={onSave}>
      <div className="edit-body">
        <div className="instructions">
          <p>Please follow the guidelines below for updating a post:</p>
          <ul>
            <li>Keep your language respectful and inclusive.</li>
            <li>Avoid sharing sensitive personal information.</li>
            <li>Ensure your post does not violate any community rules.</li>
          </ul>
        </div>

        <div>
          <input
            className="search-box"
            type="text"
            placeholder="Type to search..."
            value={searchTerm}
            onChange={onSearchTermChange}
          />
          <div className="search-results d-flex flex-wrap">
            {searchResults.map((album, index) => (
              <div
                key={index}
                className={`album-item ${
                  selectedAlbum && selectedAlbum.id === album.id
                    ? "selected"
                    : ""
                }`}
              >
                <label className="album-radio">
                  <input
                    type="radio"
                    name="albumSelection"
                    value={album.name}
                    checked={selectedAlbum && selectedAlbum.id === album.id}
                    onChange={() => onAlbumSelect(album)}
                  />
                  <img
                    src={album.images[0].url}
                    alt={album.name}
                    height="50"
                    width="50"
                  />
                  {album.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <textarea
          id="description"
          name="description"
          placeholder="Start typing your post..."
          value={description}
          onChange={onDescriptionChange}
          rows="4"
          cols="50"
        ></textarea>

        <button className="my-3 save-button" type="submit">
          Update Post
        </button>
        <button className="cancel-button" type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className="delete-button" onClick={onDelete}>
          Delete Post
        </button>
      </div>
    </form>
  );
};

export default PostEditForm;
