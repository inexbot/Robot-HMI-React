export const vision = {
    parameterList:{
        socket : {
            IP : "192.168.1.11",  //若
            portNum : 2,
            portOne : 33,
            portTwo : 44,
            server : false //0:客户端，1:服务器
        },
        protocol :{
            endMark : "$",
            singleTarget : true,
            height : true,		//相机取点坐标是否含有高度
            frameHeader : "",
            separator : " ",
            failFlag : "NG",
            successFlag : "OK",
            timeOut : 30,
            angleUnit:0
        },
        trigger : {
            triggerMode : 2,
            triggerStr : "TRG",
            IOPort : 0,
            triggerOnce : true,
            intervals : 35
        },
        userCoordNum:1,
        cameraList : {
            listNum : 2,
            nameList : ["sensorpart","percipio"],
            currentName:"sensorpart"
        }
    }
}