import "./CreateComment.css";
const CreateComment = ({ text, Replay }) => {
  return (
    <div
      className={
        Replay ? "comments container py-0 mt-0" : "comments container py-4 mt-3"
      }
    >
      <div
        className={
          !Replay ? "comment-tag w-100 px-3" : "d-flex justify-content-end"
        }
      >
        <textarea
          placeholder={text}
          className={Replay && "w-50 h-50 me-3"}
        ></textarea>
        <button className="btn btn-success float-end px-5 mb-5">Send</button>
      </div>
    </div>
  );
};
export default CreateComment;
