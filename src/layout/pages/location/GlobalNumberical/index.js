import React, { useEffect } from "react";
import { connect } from "dva";

const mapStateToProps = (state) => {
    return {

    }
}

function GlobalNumberical(props){

  useEffect(()=>{
      
  })
  return(
      <div>
          这里是全局数值
      </div>
  )
}

export default connect(mapStateToProps)(GlobalNumberical)