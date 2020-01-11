var myChartA = echarts.init(document.getElementById('chart-pic'));
var myChartB = echarts.init(document.getElementById('chart-line'));

optionA = {
  tooltip: {
    trigger: 'item',
    formatter: '{b}人数 : {c}<br/>占比 :  {d}%'
  },
  series: [
    {
      name: '参与人数',
      type: 'pie',
      radius: ['40%', '60%'],
      //center: ['50%', '60%'],
      data: [
        {value: 200, name: '看涨'},
        {value: 200, name: '看平'},
        {value: 200, name: '看跌'},
      ]
    }
  ],
  color: ['#e190b0', '#f1c876', '#9cd5c4']
};
optionB = {
  grid: {
    left: '1%',
    right: '1%',
    bottom: '1%',
    top: '10%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      scale: true,
      type: 'value'
    }
  ],
  series: [
    {
      name: '热轧',
      type: 'line',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
};


myChartA.setOption(optionA);
myChartB.setOption(optionB);


window.addEventListener('resize', function () {
  myChartA.resize();
  myChartB.resize();

})
