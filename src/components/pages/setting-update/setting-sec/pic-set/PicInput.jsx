import "./PicInput.css";
import { FaImage } from "react-icons/fa";

export default function PicInput() {
  return (
    <div className="d-flex justify-content-start">
      <label htmlFor="profileImg">
        <FaImage className="imgs-label" />
      </label>
      <input type="file" id="profileImg" className="d-none" />
      <img
        src="https://userstock.io/data/wp-content/uploads/2017/09/michael-dam-258165-300x300.jpg"
        className="imgs"
      />
    </div>
  );
}
