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
import "./index.css";


const mapStateToProps = (state) => {
    return{
      
    }
  };

  function Parameter() {
    
  }

  export default connect(mapStateToProps)(Parameter)