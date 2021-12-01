import { FaPlus, FaPlusCircle } from "react-icons/fa";
import InputTag from "../InputTag";
import "./AboutSet.css";

export default function AboutSet() {
  return (
    <>
      <h1 className="fs-4 text-secondary pb-3 mt-5 pt-5">About Me:</h1>
      <div className="w-100 align-items-start d-flex">
        <div className="about-input-wrapper">
          <label htmlFor="aboutme">
            About me{" "}
            <span className="fs-6 text-secondary">(100 words max)</span>:
          </label>
          <textarea
            type="text"
            id="aboutme"
            className="w-100"
            placeholder="About me .."
          />
        </div>
        <div className="about-input-wrapper">
          <label htmlFor="aboutme">
            Passions <span className="fs-6 text-secondary">(Hobbies)</span>:
          </label>
          <div className="d-flex">
            <button className="btn-add mb-2">
              <FaPlusCircle />
            </button>
            <div className="d-flex flex-wrap">
              <input
                type="text"
                id="aboutme"
                className="w-75 border-0 px-3 py-1 me-3 mb-2"
                placeholder="Passion"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <h1 className="fs-5 text-secondary pb-3 mt-5 ">Social Media:</h1>
        <InputTag
          id={"instagram"}
          label={"Instagram"}
          type={"url"}
          placeholder={""}
        />
        <InputTag
          id={"facebook"}
          label={"Facebook"}
          type={"url"}
          placeholder={""}
        />
        <InputTag
          id={"tiwtter"}
          label={"Tiwtter"}
          type={"url"}
          placeholder={""}
        />
        <InputTag
          id={"pinterest"}
          label={"Pinterest"}
          type={"url"}
          placeholder={""}
        />
      </div>
    </>
  );
}
