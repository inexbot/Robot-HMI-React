
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
    },
    Setsite:{
      robot:1,
      conveyorID:2,
      position:{
        trackStartXPoint:123.123,
        trackRangeXMax:213.213,
        trackRangeYMin:132.132,
        trackRangeYMax:321.321,
        trackRangeZMin:231.231,
        trackRangeZMax:312.312,
        grabheight:111.111,
        receLatestPos:123.123
      }
    },
    Conveyorsign:{
      ConveyorOne:{
        posNum:1,
        posX:0.1,
        posY:0.1,
        encodorValue:10
      },
      ConveyorTwo:{
        posNum:2,
        posX:0.2,
        posY:0.3,
        encodorValue:2
      },
      ConveyorThree:{
        posNum:3,
        posX:0.2,
        posY:0.3,
        encodorValue:2
      },

    }
}

