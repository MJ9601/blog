import AboutSet from "./about-set/AboutSet";
import GeneralSet from "./general-set/GeneralSet";
import PicSet from "./pic-set/PicSet";
import "./SettingSec.css";
import SetUpBase from "./set_up/SetUpBase";

export default function SettingSec() {
  return (
    <section className="w-100 px-5 bg-light pt-5">
      <SetUpBase />
      <form className="py-5 px-3">
        <GeneralSet />
        <PicSet />
        <AboutSet />
        <button className="my-3 ms-2 btn bg-success text-white fs-5 px-5">
          Save
        </button>
      </form>
    </section>
  );
}
