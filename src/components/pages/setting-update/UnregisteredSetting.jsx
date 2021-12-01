import React from "react";
import AboutSet from "./setting-sec/about-set/AboutSet";
import GeneralSet from "./setting-sec/general-set/GeneralSet";
import PicSet from "./setting-sec/pic-set/PicSet";
import SetUpBase from "./setting-sec/set_up/SetUpBase";

export default function UnregisteredSetting() {
  return (
    <section className="w-100 px-5  bg-light pt-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="fs-3 text-success">Create Your Profile</h1>
        </div>
        <form className="py-5 px-3">
          <GeneralSet />
          <PicSet />
          <AboutSet />
          <button className="my-3 ms-2 btn bg-success text-white fs-5 px-5">
            Save
          </button>
        </form>
      </div>
    </section>
  );
}
