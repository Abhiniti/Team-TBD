function build_OD_Chart() {

   // data route 
  var url = "/api/national_data";

  console.log("url", url);

  d3.json(url).then(function(d) {
    console.log(d);

  var years = d.year;
  var total_OD = d.Total_OD_deaths;
  var data_line = d.OD_DR;
  var male_OD = d.M_Total_Overdoses;
  var female_OD = d.F_Total_Overdoses;

  var myChart = document.getElementById('US_OV').getContext('2d');

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
    /*Chart.scaleService.updateScaleDefaults('linear', {
      ticks: {
        callback: function(tick) {
          return tick.toLocaleString();
        }
      }
    });*/

    var US_OD_Chart = new Chart(myChart, {
    type: "bar",

    data:{
      labels: years,
      datasets:[{
        type: "line",
        yAxisID: "B",
        data: data_line,
        label:'OD Death Rate',  
        fill: false,
        borderColor:'#FF0000', 
        backgroundColor:'#FF0000', 
        borderWidth:3,   
        pointStyle: 'star',
        pointHoverBorderColor: '#FFEE58',
        pointHoverBackgroundColor: '#FFEE58',
        pointHoverBorderWidth: 3,
        pointHoverRadius: 10,
        pointBorderWidth: 3,
        },

        {
          type: "line",
          fill: false,
          showLine: false,
          label:'Total OD deaths',
          data: total_OD,
          yAxisID: "A",
          backgroundColor:'#33CC00',
          borderColor:'#33CC00',
          borderWidth:3,
          pointStyle: 'rectRot',
          pointHoverRadius: 10,
          pointBorderWidth: 3,
          /*hoverBorderWidth:2,
          hoverBackgroundColor:'#33CC33',
          hoverBorderColor:'#33CC33',*/
        },

        {
        type: "bar",
        yAxisID: "A",
        data: male_OD,
        label:'Male Total Overdoses',  
        backgroundColor:'#5DADE2', 
        borderColor:'#5DADE2',
        },

        {
        type: "bar",
        yAxisID: "A",
        data: female_OD,
        label:'Female Total Overdoses',  
        backgroundColor:'#CE93D8', 
        borderColor:'#CE93D8',
        }],
      }, 

    options:{
      scales: {
        xAxes:[{
          stacked: true,
          ticks:{
            beginAtZero: true,
          },
        }],
        yAxes: [{
          id:"A",
          type: "linear",
          position: "left",
          stacked: true,
          ticks: {
            callback: function(label, index, labels) {
                return label/1000+'k';
            },
            beginAtZero: true,
          },
          scaleLabel:{
            display: true,
            labelString: "Number of OD deaths",
            fontsize: 11,
          }
        },
          {
          id: "B",
          type: "linear",
          position: "right",
          scaleLabel:{
            display: true,
            labelString: "OD deaths per 100,000",
            fontsize: 11,
          }
        }]
      },
        
      title:{
        display:true,
        text:'U.S. Overdose Deaths vs. OD Death Rate',
        fontSize:25
      },

      legend:{
        display:true,
        position:'top',
        labels:{
          fontColor:'#000'
        }
      },

      animation: {
        duration: 2000,
        easing: "easeInOutSine"
      },

      layout:{
        padding:{
        left:0,
        right:0,
        bottom:0,
        top:0
        }
      },

      tooltips:{
        enabled:true,
        mode: "index",
        position: "average",
        /*backgroundColor: "#FFFFFF",
        titleFontColor: '#000',
        bodyFontColor: '#000',*/
        caretPadding: 20,
        intersect: true,
      }
    },
  });
});

}

