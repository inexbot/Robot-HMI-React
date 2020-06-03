
export const conveyor = {
    conveyorNum:[1,2,3,4,5,6,7],
    Basicdata:{
        conveyorID:1,
        conveyor:{
            maxEncoderVal:0,
            minEncoderVal:0,
            encoderDirection:1,
            encoderResolution:0,
            speed:0,
            userCoord:0,
            checkSpeed:1,
            encoderValue:0,
        },
        compensation:{
            time:0,
            encoderVal:10
        }
    },
    DiscernData:{
        robot:1,
        conveyorID:1,
          detectSrc:{
            type:2,    //0-视觉；1-IO；2-全局变量
            visionID:1,
            DI_capturePos:0,
            globalVar:"GA001"
          },
        identification:{
          type:0,    //0-视觉；1-传感器
          communication:0,    //0-以太网；1-Modbus
          sensorTrg:1     //0-低电平触发， 1-高电平触发
        }
    }
}

