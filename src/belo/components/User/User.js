import "./User.css";

const User = ({ user }) => {
  return (
    <div className="user-card">
      <div
        className=" d-flex 
justify-content-between"
      >
        <div className="card-img">
          <img src={user.avatar} alt="avatar" className="avatar-image" />
        </div>
        <div className="card-body">
          <h1>{user.name}</h1>
          <h3>{user.username}</h3>
        </div>
        <div className="card-button">
          <button>Follow</button>
        </div>
      </div>
      <div className="card-description">
        <p>{user.description}</p>
      </div>
    </div>
  );
};

export default User;
