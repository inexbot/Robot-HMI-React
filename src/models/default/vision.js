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
            {X:"",Y:"",Z:"",angle:""},
            {X:"",Y:"",Z:"",angle:""},
            {X:"",Y:"",Z:"",angle:""},
            {X:"",Y:"",Z:"",angle:""},
            {X:"",Y:"",Z:"",angle:""},
            {X:"",Y:"",Z:"",angle:""},
            {X:"",Y:"",Z:"",angle:""},
            {X:"",Y:"",Z:"",angle:""},
            {X:"",Y:"",Z:"",angle:""},
            {X:"",Y:"",Z:"",angle:""},
        ],
        currentPos:[
            {X:"",Y:"",Z:"",angle:""},
            {X:"",Y:"",Z:"",angle:""},
            {X:"",Y:"",Z:"",angle:""},
            {X:"",Y:"",Z:"",angle:""},
            {X:"",Y:"",Z:"",angle:""},
            {X:"",Y:"",Z:"",angle:""},
            {X:"",Y:"",Z:"",angle:""},
            {X:"",Y:"",Z:"",angle:""},
            {X:"",Y:"",Z:"",angle:""},
            {X:"",Y:"",Z:"",angle:""},
        ]
    },
    ScopeList:{
        maxX:"",	//将数字转换为字符串发送，如果未设置，则发送字符串""
        maxY:"1.1",
        maxZ:"222",
        minX:"0.003",
        minY:"0",
        minZ:"0"
    },

}

