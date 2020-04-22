import React from "react";
import "./index.css";
import { router } from "dva";

function Log() {
  return (
    <router.Link to="log">
      <div className="log-index">
        <span>日志：</span>
        <span>点动J1轴</span>
      </div>
    </router.Link>
  );
}

export default Log;