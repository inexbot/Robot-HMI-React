export const slaveSertCommit = {
  robotAxle:{
    servoSum:1,
    sum:1,
    robot:[
      {
        robotType:"R_SCARA",
        servoMap:[1,2,3,4],
        syncSum:2,
        syncGroupSum:1,
        syncType:[2,0,0],
        syncMap:[[5,6],[2,3]]
      },
    ]        
  },
  
  ENIname:{
    ENIName:"eni-RC-6-mecat-1-1000.xml",
    isHaveENI:false
  },
  // aaa:{
  //   robot:[
  //     {  axis:[
  //         { sum:2,
  //          data:[
  //            { num:1, reducRatio:1.0, encoder:17, dir:1 },
  //            { num:1, reducRatio:1.0, encoder:17, dir:1 }
  //          ]
  //         },
  //         { sum:2, data:[
  //             { num:1, reducRatio:1.0, encoder:17, dir:1 },
  //             { num:1, reducRatio:1.0, encoder:17, dir:1 }
  //           ]
  //         }
  //       ],
  //       sync:[
  //         [ 
  //           { sum:2,
  //             data: [
  //             { num:1, reducRatio:1.0, encoder:17, dir:1 },
  //             { num:1, reducRatio:1.0, encoder:17, dir:1 }
  //             ]
  //           }
  //         ]
  //       ]
  //     }
  //   ]
  // }
//   aaaaa:{
  robot:[{
    axis:[{ 
      data:[
        {dir:-1,encoder:5,num:0,reducRatio:5.0},
        {dir:-1,encoder:8,num:0,reducRatio:7.0}
      ],
      sum:2
    }, { data:[ {dir:-1,encoder:9,num:0,reducRatio:8.0} ], sum:1 },
      {data:[{dir:-1,encoder:1,num:0,reducRatio:7.0}],sum:1},
      {sum:0},
      {sum:0},
      {sum:0}
    ],
    sync:[
      {sum:0},
      {sum:0}
    ]
    }]
// }

}