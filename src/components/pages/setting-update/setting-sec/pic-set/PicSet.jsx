import PicInput from "./PicInput";
import "./PicSet.css";

export default function PicSet() {
  return (
    <>
      <h1 className="general-set-title py-5 fs-4 text-secondary">
        Avatar Settings:
      </h1>
      <div className="mb-3">
        <div className="ps-2 img-set-wrapper">
          <h1 className="fs-5 mb-4 header-text">Profile image:</h1>
          <PicInput />
        </div>
        <div className="ps-2 img-set-wrapper">
          <h1 className="fs-5 mb-4 header-text">Home image:</h1>
          <PicInput />
        </div>
        <div className="ps-2 img-set-wrapper">
          <h1 className="fs-5 mb-4 header-text">Background image:</h1>
          <PicInput />
        </div>
      </div>
    </>
  );
}
