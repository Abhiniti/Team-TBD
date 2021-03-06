//Build function for Chart 2 - US Opioid Related Overdose Deaths vs Opioids Related Death Rates
function build_OP_Chart() {

  // data route 
 var url = "/api/opioid_data";

 console.log("url", url);

 d3.json(url).then(function(op) {
   console.log(op);
 
 
 //Assign variable for the fixed X Axis (years)
 var years = op.year;

 //Bar Chart Coordinates - Y1 Axis (Opioid Related Overdose Deaths)
 //================================================================
 //Assign variables for both Male & Female Opioid Deaths
 var y1_Both_Opiods = op.Both_Opiods;

 //Assign variables for both Male & Female Prescription Opioid Deaths
 var y1_Both_Prescr_Opiods = op.Both_Prescr_Opiods;

 //Assign variables for both Male & Female Heroin Deaths
 var y1_Both_Heroin = op.Both_Heroin;

 //Assign variables for both Male & Female Fentanyl Deaths
 var y1_Both_Fentanyl = op.Both_Fentanyl;

 //Assign variables for both Male & Female Opium & Other Deaths
 var y1_Both_Opium_Other = op.Both_Opium_Other; 

 //Line Chart Coordinates - Y2 Axis (Opioid Related Death Rates)
 //=============================================================
 //Assign variables for both Male & Female Opioid Death Rates
 var y2_Any_Opiod_DR = op.Any_Opiod_DR;

 //Assign variables for both Male & Female Prescription Opioid Death Rates
 var y2_Prescr_Opiods_DR = op.Prescr_Opiods_DR;

 //Assign variables for both Male & Female Heroin Death Rates
 var y2_Heroin_DR = op.Heroin_DR;

 //Assign variables for both Male & Female Fentanyl Death Rates
 var y2_Fentanyl_DR = op.Fentanyl_DR;

 var myChart2 = document.getElementById('myChart2').getContext('2d');

     // Global Options
     Chart.defaults.global.defaultFontFamily = 'sans-serif';
     Chart.defaults.global.defaultFontSize = 18;
     Chart.defaults.global.defaultFontColor = 'black';
     Chart.defaults.scale.gridLines.display = false;
     Chart.defaults.global.tooltips.callbacks.label = function(tooltipItem, data) {
       var dataset = data.datasets[tooltipItem.datasetIndex];
       var datasetLabel = dataset.label || '';
       return datasetLabel + " " + dataset.data[tooltipItem.index].toLocaleString();
     };

   var US_OP_Chart = new Chart(myChart2, {
     type:'bar', 
     data:{
       labels: years,
       datasets:[{
            type: 'bar', 
            label:'Pres. Opioid Deaths',
            yAxisID: 'y-axis-1',
            data: y1_Both_Prescr_Opiods,
            backgroundColor:'rgba(255, 255, 0,0.4)',
            borderWidth:1,
            hoverBorderWidth:2,
            hoverBorderColor:'#000' 
        
          }, {
              type:'bar',
              label:'Heroin Deaths',
              yAxisID: 'y-axis-1',
              data: y1_Both_Heroin,
              backgroundColor:'rgba(51, 102, 255,0.4)',
              borderWidth:1,
              hoverBorderWidth:2,
              hoverBorderColor:'#000'
            
          }, {
              type: 'bar',
              label:'Fentanyl Deaths',
              yAxisID: 'y-axis-1',
              data: y1_Both_Fentanyl,
              backgroundColor:'rgba(102, 0, 102,0.4)',
              borderWidth:1,
              hoverBorderWidth:2,
              hoverBorderColor:'#000'
          
          }, {
              type: 'bar', 
              label:'Opium & Other Deaths',
              yAxisID: 'y-axis-1',
              data: y1_Both_Opium_Other,
              backgroundColor:'rgba(217,83,79,0.4)',
              borderWidth:1,
              hoverBorderWidth:2,
              hoverBorderColor:'#000'  
              
          }, {
            type: 'line',
            label:'Total Opioid DR',
            yAxisID: 'y-axis-2',
            data: y2_Any_Opiod_DR,
            backgroundColor:'rgba(153, 255, 51,1)',
            borderWidth:3,
            borderColor:'#99ff33',
            fill:false,
            pointStyle: 'star',
            pointHoverBorderColor: '#99ff33',
            pointHoverBackgroundColor: '#99ff33',
            pointHoverBorderWidth: 3,
            pointHoverRadius: 10,
            pointBorderWidth: 3

          }, {
              type: 'line',
              label:'Pres. Opioid DR',
              yAxisID: 'y-axis-2',
              data: y2_Prescr_Opiods_DR,
              backgroundColor:'rgba(128, 0, 0,1)',
              fill: false,
              borderWidth:3,
              borderColor:'#800000',
              pointStyle: 'rectRot',
              pointHoverBorderColor: '#800000',
              pointHoverBackgroundColor: '#800000',
              pointHoverBorderWidth: 3,
              pointHoverRadius: 10,
              pointBorderWidth: 3
          
          }, {
              type: 'line',
              label:'Heroin DR',
              yAxisID: 'y-axis-2',
              data: y2_Heroin_DR,
              backgroundColor:'rgba(51, 51, 204,1)',
              fill: false,
              borderWidth:3,
              borderColor:'#3333cc',
              pointStyle: 'circle',
              pointHoverBorderColor: '#3333cc',
              pointHoverBackgroundColor: '#3333cc',
              pointHoverBorderWidth: 3,
              pointHoverRadius: 10,
              pointBorderWidth: 3
            
          }, {
              type: 'line',
              label:'Fentanyl DR',
              yAxisID: 'y-axis-2',
              data: y2_Fentanyl_DR,
              backgroundColor:'rgba(204, 51, 0,1)',
              fill: false,
              borderWidth:3,
              borderColor:'#cc3300',
              pointStyle: 'crossRot',
              pointHoverBorderColor: '#cc3300',
              pointHoverBackgroundColor: '#cc3300',
              pointHoverBorderWidth: 3,
              pointHoverRadius: 10,
              pointBorderWidth: 3
        }]
      },
     options: {
       title:{
         display:true,
         text:'U.S. Opioid Related Overdose Deaths / Death Rate',
         fontSize:25
       },
       legend:{
         display:true,
         position:'top',
         labels:{
           fontColor: '#000'
          }
        },
       animation:{
         duration: 2000,
         easing: 'easeInOutSine'
        },
       layout:{
         padding:{
           left:50,
           right:0,
           bottom:0,
           top:0
         }
       },
       tooltips:{
        enabled:true,
        mode: 'index',
        position: 'average',
        caretPadding: 20,
        intersect: true,
       },
       scales: {
        xAxes: [{
          stacked: true,
          ticks:{
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: 'Years',
            fontsize: 11,
          }
        }],
        yAxes: [{
          type:'linear',
          stacked: true,
          position: 'left',
          id: 'y-axis-1',
          ticks:{
              callback: function(label, index, labels) {
                  return label/1000+'k';
            },
            beginAtZero: true,
          },
          scaleLabel:{
            display: true,
            labelString: 'Total Number of US Opioid Related Deaths',
            fontsize: 11,
          }
        
      }, {
          type: 'linear',
          stacked: false,
          position: 'right',
          id: 'y-axis-2',
          scaleLabel:{
            display: true,
            labelString: 'US Opioid Related Death Rates (per 100,000 people)',
            fontsize: 11,
          }
        }]

      }
    }  
  });
});
}

//Build function for Chart 2 - US Opioid Related Overdose Deaths vs Opioids Related Death Rates
function build_Male_Chart() {

  // data route 
 var url = "/api/opioid_data";

 console.log("url", url);

 d3.json(url).then(function(op) {
   console.log(op);
 
 
 //Assign variable for the fixed X Axis (years)
 var years = op.year;

 //Bar Chart Coordinates - Y1 Axis (Opioid Male Related Overdose Deaths)
 //================================================================
 //Assign variables for Male Opioid Deaths
 var y1_M_Opiods = op.M_Opiods;

 //Assign variables for Male Prescription Opioid Deaths
 var y1_M_Prescr_Opiods = op.M_Prescr_Opiods;

 //Assign variables for Male Heroin Deaths
 var y1_M_Heroin = op.M_Heroin;
 
 //Assign variables for Male Fentanyl Deaths
 var y1_M_Fentanyl = op.M_Fentanyl;

 //Assign variables for Male Opium & Other Deaths
 var y1_M_Opium_Other = op.M_Opium_Other; 

 //Line Chart Coordinates - Y2 Axis (Opioid Related Death Rates)
 //=============================================================
 //Assign variables for both Male & Female Opioid Death Rates
 var y2_Any_Opiod_DR = op.Any_Opiod_DR;

 //Assign variables for both Male & Female Prescription Opioid Death Rates
 var y2_Prescr_Opiods_DR = op.Prescr_Opiods_DR;

 //Assign variables for both Male & Female Heroin Death Rates
 var y2_Heroin_DR = op.Heroin_DR;

 //Assign variables for both Male & Female Fentanyl Death Rates
 var y2_Fentanyl_DR = op.Fentanyl_DR;

 var myChart3 = document.getElementById('myChart3').getContext('2d');

     // Global Options
     Chart.defaults.global.defaultFontFamily = 'sans-serif';
     Chart.defaults.global.defaultFontSize = 18;
     Chart.defaults.global.defaultFontColor = 'black';
     Chart.defaults.scale.gridLines.display = false;
     Chart.defaults.global.tooltips.callbacks.label = function(tooltipItem, data) {
       var dataset = data.datasets[tooltipItem.datasetIndex];
       var datasetLabel = dataset.label || '';
       return datasetLabel + " " + dataset.data[tooltipItem.index].toLocaleString();
     };

   var US_Male_Chart = new Chart(myChart3, {
     type:'bar', 
     data:{
       labels: years,
       datasets:[{
          type: 'bar', 
          label:'Male Pres. Opioid Deaths',
          yAxisID: 'y-axis-1',
          data: y1_M_Prescr_Opiods,
          backgroundColor:'rgba(255, 255, 0,0.4)',
          borderWidth:1,
          hoverBorderWidth:2,
          hoverBorderColor:'#000'    
          
          }, {
          type:'bar',
          label:'Male Heroin',
          yAxisID: 'y-axis-1',
          data: y1_M_Heroin,
          backgroundColor:'rgba(51, 102, 255,0.4)',
          borderWidth:1,
          hoverBorderWidth:2,
          hoverBorderColor:'#000'          
          
          }, {
          type: 'bar',
          label:'Male Fentanyl',
          yAxisID: 'y-axis-1',
          data: y1_M_Fentanyl,
          backgroundColor:'rgba(102, 0, 102,0.4)',
          borderWidth:1,
          hoverBorderWidth:2,
          hoverBorderColor:'#000'
          
          }, {
          type: 'bar', 
          label:'Male Opium & Other',
          yAxisID: 'y-axis-1',
          data: y1_M_Opium_Other,
          backgroundColor:'rgba(217,83,79,0.4)',
          borderWidth:1,
          hoverBorderWidth:2,
          hoverBorderColor:'#000'  
          
          }, {
          type: 'line',
          label:'Total Opioid DR',
          yAxisID: 'y-axis-2',
          data: y2_Any_Opiod_DR,
          backgroundColor:'rgba(153, 255, 51,1)',
          borderWidth:3,
          borderColor:'#99ff33',
          fill:false,
          pointStyle: 'star',
          pointHoverBorderColor: '#99ff33',
          pointHoverBackgroundColor: '#99ff33',
          pointHoverBorderWidth: 3,
          pointHoverRadius: 10,
          pointBorderWidth: 3

          }, {
          type: 'line',
          label:'Pres. Opioid DR',
          yAxisID: 'y-axis-2',
          data: y2_Prescr_Opiods_DR,
          backgroundColor:'rgba(128, 0, 0,1)',
          fill: false,
          borderWidth:3,
          borderColor:'#800000',
          pointStyle: 'rectRot',
          pointHoverBorderColor: '#800000',
          pointHoverBackgroundColor: '#800000',
          pointHoverBorderWidth: 3,
          pointHoverRadius: 10,
          pointBorderWidth: 3
          
          }, {
          type: 'line',
          label:'Heroin DR',
          yAxisID: 'y-axis-2',
          data: y2_Heroin_DR,
          backgroundColor:'rgba(51, 51, 204,1)',
          fill: false,
          borderWidth:3,
          borderColor:'#3333cc',
          pointStyle: 'circle',
          pointHoverBorderColor: '#3333cc',
          pointHoverBackgroundColor: '#3333cc',
          pointHoverBorderWidth: 3,
          pointHoverRadius: 10,
          pointBorderWidth: 3
            
          }, {
          type: 'line',
          label:'Fentanyl DR',
          yAxisID: 'y-axis-2',
          data: y2_Fentanyl_DR,
          backgroundColor:'rgba(204, 51, 0,1)',
          fill: false,
          borderWidth:3,
          borderColor:'#cc3300',
          pointStyle: 'crossRot',
          pointHoverBorderColor: '#cc3300',
          pointHoverBackgroundColor: '#cc3300',
          pointHoverBorderWidth: 3,
          pointHoverRadius: 10,
          pointBorderWidth: 3
        }]
      },
     options: {
       title:{
         display:true,
         text:'U.S. Opioid Male Related Overdose Deaths / Death Rate',
         fontSize:25
       },
       legend:{
         display:true,
         position:'top',
         labels:{
           fontColor: '#000'
          }
        },
       animation:{
         duration: 2000,
         easing: 'easeInOutSine'
        },
       layout:{
         padding:{
           left:50,
           right:0,
           bottom:0,
           top:0
          }
        },
        tooltips:{
          enabled:true,
          mode: 'index',
          position: 'average',
          caretPadding: 20,
          intersect: true,
        },
        scales: {
          xAxes: [{
            stacked: true,
            ticks:{
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: 'Years',
              fontsize: 11,
            }
          }],
          yAxes: [{
            type:'linear',
            stacked: true,
            position: 'left',
            id: 'y-axis-1',
            ticks:{
                callback: function(label, index, labels) {
                    return label/1000+'k';
              },
              beginAtZero: true,
            },
            scaleLabel:{
              display: true,
              labelString: 'Total Number of US Opioid Related Deaths',
              fontsize: 11,
            }
          
        }, {
            type: 'linear',
            stacked: false,
            position: 'right',
            id: 'y-axis-2',
            scaleLabel:{
              display: true,
              labelString: 'US Opioid Related Death Rates (per 100,000 people)',
              fontsize: 11,
            }
          }]

        }
    }  
  });
});
}

//Build function for Chart 2 - US Opioid Female Related Overdose Deaths vs Opioids Related Death Rates
function build_Female_Chart() {

    // data route 
   var url = "/api/opioid_data";
  
   console.log("url", url);
  
   d3.json(url).then(function(op) {
     console.log(op);
   
   
   //Assign variable for the fixed X Axis (years)
   var years = op.year;
  
   //Bar Chart Coordinates - Y1 Axis (Opioid Related Overdose Deaths)
   //================================================================
   //Assign variables for Female Opioid Deaths
   var y1_F_Opiods = op.F_Opiods;
  
   //Assign variables for Female Prescription Opioid Deaths
   var y1_F_Prescr_Opiods = op.F_Prescr_Opiods;
  
   //Assign variables for Female Heroin Deaths
   var y1_F_Heroin = op.F_Heroin;
  
   //Assign variables for Female Fentanyl Deaths
   var y1_F_Fentanyl = op.F_Fentanyl;
  
   //Assign variables for Female & Opium & Other Deaths
   var y1_F_Opium_Other = op.F_Opium_Other; 

   //Line Chart Coordinates - Y2 Axis (Opioid Related Death Rates)
   //=============================================================
   //Assign variables for both Male & Female Opioid Death Rates
   var y2_Any_Opiod_DR = op.Any_Opiod_DR;
  
   //Assign variables for both Male & Female Prescription Opioid Death Rates
   var y2_Prescr_Opiods_DR = op.Prescr_Opiods_DR;
  
   //Assign variables for both Male & Female Heroin Death Rates
   var y2_Heroin_DR = op.Heroin_DR;
  
   //Assign variables for both Male & Female Fentanyl Death Rates
   var y2_Fentanyl_DR = op.Fentanyl_DR;
  
   var myChart4 = document.getElementById('myChart4').getContext('2d');
  
       // Global Options
       Chart.defaults.global.defaultFontFamily = 'sans-serif';
       Chart.defaults.global.defaultFontSize = 18;
       Chart.defaults.global.defaultFontColor = 'black';
       Chart.defaults.scale.gridLines.display = false;
       Chart.defaults.global.tooltips.callbacks.label = function(tooltipItem, data) {
         var dataset = data.datasets[tooltipItem.datasetIndex];
         var datasetLabel = dataset.label || '';
         return datasetLabel + " " + dataset.data[tooltipItem.index].toLocaleString();
       };
  
     var US_Female_Chart = new Chart(myChart4, {
       type:'bar', 
       data:{
         labels: years,
         datasets:[{
          type: 'bar', 
          label:'Female Pres. Opioid Deaths',
          yAxisID: 'y-axis-1',
          data: y1_F_Prescr_Opiods,
          backgroundColor:'rgba(255, 255, 0,0.4)',
          borderWidth:1,
          hoverBorderWidth:2,
          hoverBorderColor:'#000' 
      
        }, {
            type:'bar',
            label:'Female Heroin',
            yAxisID: 'y-axis-1',
            data: y1_F_Heroin,
            backgroundColor:'rgba(51, 102, 255,0.4)',
            borderWidth:1,
            hoverBorderWidth:2,
            hoverBorderColor:'#000'
          
        }, {
            type: 'bar',
            label:'Female Fentanyl',
            yAxisID: 'y-axis-1',
            data: y1_F_Fentanyl,
            backgroundColor:'rgba(102, 0, 102,0.4)',
            borderWidth:1,
            hoverBorderWidth:2,
            hoverBorderColor:'#000'
        
        }, {
          type: 'bar', 
          label:'Female Opium & Other',
          yAxisID: 'y-axis-1',
          data: y1_F_Opium_Other,
          backgroundColor:'rgba(217,83,79,0.4)',
          borderWidth:1,
          hoverBorderWidth:2,
          hoverBorderColor:'#000'  
          
        }, {
          type: 'line',
          label:'Total Opioid DR',
          yAxisID: 'y-axis-2',
          data: y2_Any_Opiod_DR,
          backgroundColor:'rgba(153, 255, 51,1)',
          borderWidth:3,
          borderColor:'#99ff33',
          fill:false,
          pointStyle: 'star',
          pointHoverBorderColor: '#99ff33',
          pointHoverBackgroundColor: '#99ff33',
          pointHoverBorderWidth: 3,
          pointHoverRadius: 10,
          pointBorderWidth: 3
  
        }, {
            type: 'line',
            label:'Prescrip Opioid DR',
            yAxisID: 'y-axis-2',
            data: y2_Prescr_Opiods_DR,
            backgroundColor:'rgba(128, 0, 0,1)',
            fill: false,
            borderWidth:3,
            borderColor:'#800000',
            pointStyle: 'rectRot',
            pointHoverBorderColor: '#800000',
            pointHoverBackgroundColor: '#800000',
            pointHoverBorderWidth: 3,
            pointHoverRadius: 10,
            pointBorderWidth: 3
         
        }, {
            type: 'line',
            label:'Heroin DR',
            yAxisID: 'y-axis-2',
            data: y2_Heroin_DR,
            backgroundColor:'rgba(51, 51, 204,1)',
            fill: false,
            borderWidth:3,
            borderColor:'#3333cc',
            pointStyle: 'circle',
            pointHoverBorderColor: '#3333cc',
            pointHoverBackgroundColor: '#3333cc',
            pointHoverBorderWidth: 3,
            pointHoverRadius: 10,
            pointBorderWidth: 3
          
        }, {
            type: 'line',
            label:'Fentanyl DR',
            yAxisID: 'y-axis-2',
            data: y2_Fentanyl_DR,
            backgroundColor:'rgba(204, 51, 0,1)',
            fill: false,
            borderWidth:3,
            borderColor:'#cc3300',
            pointStyle: 'crossRot',
            pointHoverBorderColor: '#cc3300',
            pointHoverBackgroundColor: '#cc3300',
            pointHoverBorderWidth: 3,
            pointHoverRadius: 10,
            pointBorderWidth: 3
       }]
        },
       options: {
         title:{
           display:true,
           text:'U.S. Opioid Female Related Overdose Deaths / Death Rate',
           fontSize:25
         },
         legend:{
           display:true,
           position:'top',
           labels:{
             fontColor: '#000'
            }
          },
         animation:{
           duration: 2000,
           easing: 'easeInOutSine'
          },
         layout:{
           padding:{
             left:50,
             right:0,
             bottom:0,
             top:0
           }
         },
         tooltips:{
          enabled:true,
          mode: 'index',
          position: 'average',
          caretPadding: 20,
          intersect: true,
         },
         scales: {
          xAxes: [{
            stacked: true,
            ticks:{
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: 'Years',
              fontsize: 11,
            }
          }],
          yAxes: [{
            type:'linear',
            stacked: true,
            position: 'left',
            id: 'y-axis-1',
            ticks:{
                callback: function(label, index, labels) {
                    return label/1000+'k';
              },
              beginAtZero: true,
            },
            scaleLabel:{
              display: true,
              labelString: 'Total Number of US Opioid Related Deaths',
              fontsize: 11,
            }
          
        }, {
            type: 'linear',
            stacked: false,
            position: 'right',
            id: 'y-axis-2',
            scaleLabel:{
              display: true,
              labelString: 'US Opioid Related Death Rates (per 100,000 people)',
              fontsize: 11,
            }
          }]
  
        }
      }  
    });
  });
  }