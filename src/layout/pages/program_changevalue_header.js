import React from "react";
import Movj from "./Instruct/movj";
import Movl from "./Instruct/movl";

function ChangeInstructValue(props) {
  switch (props.name) {
    case "MOVJ":
      return <Movj row={props.row} form={props.form} />;
    case "MOVL":
      return <Movl row={props.row} form={props.form} />;
    default:
      return (
        <div>
          指令行{props.row}，指令名{props.name}没有修改界面
        </div>
      );
  }
}
export default ChangeInstructValue;
