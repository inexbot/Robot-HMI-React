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
    },
    PlaceList:{
        position:{
            datumPoint:[0,0,0,0.01,0,0],
            cameraPoint:[0,0,100,0],
            excursion :{
                Xexcursion : 0,
                Yexcursion : 0,
                Zexcursion : 0,
                angle:0.0
            },
            scale : 0.001,  //比列系数
            angleDirection : 1,
            sampleData:"",
            cameraData:""
        }
    },
    PlacedebugList:{
        robot:1, 
        visionNum:1,
        originPos:[
            {X:0.1,Y:0.0,Z:0.0,angle:0.0},
            {X:0.2,Y:0.0,Z:0.0,angle:0.0},
            {X:0.3,Y:0.0,Z:0.0,angle:0.0},
            {X:0.4,Y:0.0,Z:0.0,angle:0.0},
            {X:0.5,Y:0.0,Z:0.0,angle:0.0},
            {X:0.6,Y:0.0,Z:0.0,angle:0.0},
            {X:0.7,Y:0.0,Z:0.0,angle:0.0},
            {X:0.8,Y:0.0,Z:0.0,angle:0.0},
            {X:0.9,Y:0.0,Z:0.0,angle:0.0},
            {X:0.10,Y:0.0,Z:0.0,angle:0.0},
        ],
        currentPos:[
            {X:0.1,Y:0.0,Z:0.0,angle:0.0},
            {X:0.2,Y:0.0,Z:0.0,angle:0.0},
            {X:0.3,Y:0.0,Z:0.0,angle:0.0},
            {X:0.4,Y:0.0,Z:0.0,angle:0.0},
            {X:0.5,Y:0.0,Z:0.0,angle:0.0},
            {X:0.6,Y:0.0,Z:0.0,angle:0.0},
            {X:0.7,Y:0.0,Z:0.0,angle:0.0},
            {X:0.8,Y:0.0,Z:0.0,angle:0.0},
            {X:0.9,Y:0.0,Z:0.0,angle:0.0},
            {X:0.10,Y:0.0,Z:0.0,angle:0.0},
        ]
    }
}

