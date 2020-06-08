import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  notification,
  ConfigProvider,
  Select,
  Divider,
  Input,
  Modal
} from "antd";
import { connect } from "dva";

  const mapStateToProps = (state) => {
    return{
      
    }
  };

  function Place(props) {
    return(
      <div style={{ width:"1000px",height:"1000px",background:"red" }}>
          哈哈哈
      </div>
    )
  }

  export default connect(mapStateToProps)(Place)