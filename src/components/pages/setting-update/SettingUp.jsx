import SideBar from "../../side_bar/SideBar";
import SettingSec from "./setting-sec/SettingSec";
import "./SettingUp.css";

export default function SettingUp() {
  return (
    <section className="d-flex">
      <div className="w-75">
        <SettingSec />
      </div>
      <SideBar />
    </section>
  );
}
