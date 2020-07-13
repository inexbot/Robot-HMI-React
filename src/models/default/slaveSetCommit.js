export const slaveSertCommit = {
  axis:[{
    axis:[
      {  data:[
          {dir:-1,encoder:5,num:0,reducRatio:5.0},
          {dir:-1,encoder:8,num:0,reducRatio:7.0} 
        ],
        sum:2
      },
      { data:[ {dir:-1,encoder:9,num:0,reducRatio:8.0} ], sum:1 },
      {data:[{dir:-1,encoder:1,num:0,reducRatio:7.0}],sum:1},
      {sum:0},
      {sum:0},
      {sum:0},
      {sum:0}
    ],
    sync:[
      {sum:0},
      {sum:0},
      {sum:0}
    ]
  },
  ],
  ENIname:{
    ENIName:"eni-RC-6-mecat-1-1000.xml",
    isHaveENI:false
  },
  robot:{
    robot:[
      {robotType:'R_GENERAL_6S',servoMap:[0,0,0,0,0,0],syncMap:[0,0,0],syncNum:1},
      {robotType:'R_GENERAL_6S',servoMap:[0,0,0,0,0,0],syncMap:[0,0,0],syncNum:2}
    ],
    servoSum:0,
  }
}

// 六轴       : R_GENERAL_6S
// 四轴SCARA  ：R_SCARA
// 四轴码垛   : R_FOURAXIS_PALLET
// 四轴       ：R_FOURAXIS
// 一轴       : R_GENERAL_1S
// 五轴       : R_GENERAL_5S
// 六轴异行一 : R_GENERAL_6S_1
// 二轴SCARA  : R_SCARA_TWOAXIS


