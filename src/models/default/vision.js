export const vision = {
    parameterList:{
        socket : {
            IP : "1",  //若
            portNum : 1,
            portOne : 0,
            portTwo : 0,
            server : false //0:客户端，1:服务器
        },
        protocol :{
            endMark : "$",
            singleTarget : true,
            height : true,		//相机取点坐标是否含有高度
            frameHeader : "",
            separator : " ",
            failFlag : "",
            successFlag : "",
            timeOut : 0,
            angleUnit:0
        },
        trigger : {
            triggerMode : 0,
            triggerStr : "TRG",
            IOPort : 0,
            triggerOnce : true,
            intervals : 0
        },
        userCoordNum:1,
        cameraList : {
            listNum : 2,
            ListName : ["sensorpart","percipio"],
            currentName:"sensorpart"
        }
    }
}