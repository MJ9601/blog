import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import "./Message.css";

export const Message = () => {
  const [Iconshow, setIconshow] = useState(false);
  return (
    <>
      <div className="row">
        <div className="offset-6 col-6">
          <p className="bg-white w-100 px-3 py-3 pt-4 message-0 mb-4 ">
            <div className="settingBars">
              <FaEllipsisV
                className="icons"
                onClick={() => setIconshow(!Iconshow)}
              />
              <div
                className="options "
                style={{ display: Iconshow ? "block" : "none" }}
              >
                <h5>Edit</h5>
                <h5>Delete</h5>
                <h5>Replay</h5>
              </div>
            </div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
            ducimus possimus aspernatur veritatis accusantium pariatur nemo.
            Laudantium magni illum officiis.
          </p>
        </div>
      </div>
    </>
  );
};
