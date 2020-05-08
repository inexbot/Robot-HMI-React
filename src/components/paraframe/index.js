import React from "react";
import { connect } from "dva";
import intl from "react-intl-universal";
import { router } from "dva";
import { paraIndex } from "../Paraheader";
import "./index.css";
import { useState } from "react";
import { useEffect } from "react";

const mapStateToProps = (state) => {
  return {
    currentAuthority: state.App.currentAuthority,
    paraFrameDisplay: state.App.paraFrameDisplay,
  };
};

function ParaFrame(props) {
  const [display, setDisplay] = useState({
    操作员: "none",
    技术员: "block",
    管理员: "none",
  });

  const hideParaFrame = () => {
    props.dispatch({
      type: "App/changeParaFrameDisplay",
      data: "close",
    });
  };
  useEffect(() => {
    if (props.currentAuthority === "技术员") {
      setDisplay({
        操作员: "block",
        技术员: "block",
        管理员: "none",
      });
    } else if (props.currentAuthority === "管理员") {
      setDisplay({
        操作员: "block",
        技术员: "block",
        管理员: "block",
      });
    }
  }, [props.currentAuthority]);

  const renderFrame = () => {
    return paraIndex.map((value) => {
      return (
        <div className={value.className} key={value.className}>
          <ul>
            <h3>{intl.get(value.index)}</h3>
            {value.paras.map((para) => {
              let paraFrame;
              if (para.type === "para") {
                paraFrame = (
                  <li
                    onClick={hideParaFrame}
                    style={{ display: para.modeDisplay || display[para.authority] }}
                    key={para.name}
                  >
                    <router.Link to={para.link}>{intl.get(para.name)}</router.Link>
                  </li>
                );
              } else if (para.type === "subIndex") {
                paraFrame = (
                  <li style={{ display: para.modeDisplay || display[para.authority] }} key={para.subIndex}>
                    <ul>
                      {intl.get(para.subIndex)}{" "}
                      <img src={require("../../images/drop-down.png")} alt="" />
                      {para.paras.map((subPara) => {
                        return (
                          <li
                            onClick={hideParaFrame}
                            style={{ display: para.modeDisplay || display[subPara.authority] }}
                            key={subPara.name}
                          >
                            <router.Link to={subPara.link}>
                              {intl.get(subPara.name)}
                            </router.Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              }
              return paraFrame;
            })}
          </ul>
        </div>
      );
    });
  };
  return <div className="paraFrame">{renderFrame()}</div>;
}
export default connect(mapStateToProps)(ParaFrame);
