import React from "react";
import Movj from "./Instruct/movj";
import Movl from "./Instruct/movl";

function ChangeInstructValue(props) {
  let name;
  if(props.insertOrChange === "change"){
    name = props.changeName;
  }else if(props.insertOrChange === "insert"){
    name = props.insertName;
  }
  switch (name) {
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
