import "./CreateComment.css";
const CreateComment = () => {
  return (
    <div className="comments container py-4 mt-3">
      <div className="comment-tag w-100 px-3">
        <textarea placeholder="Share your opinion .."></textarea>
        <button className="btn btn-success float-end px-5 mb-5">Send</button>
      </div>
    </div>
  );
};
export default CreateComment;
