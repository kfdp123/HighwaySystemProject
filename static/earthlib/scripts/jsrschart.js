


/*  http://www.jeasyui.net/plugins/183.html
也可以使用 javascript 创建数据网格（datagrid）。
<table id="dg"></table>
$('#dg').datagrid({
url:'datagrid_data.json',
columns:[[
    {field:'code',title:'Code',width:100},
    {field:'name',title:'Name',width:100},
    {field:'price',title:'Price',width:100,align:'right'}
]]
});
hidden
columns:[[
{field:'itemid',title:'Item ID',rowspan:2,width:80,sortable:true},
{field:'productid',title:'Product ID',rowspan:2,width:80,sortable:true},
{title:'Item Details',colspan:4}
],[
{field:'listprice',title:'List Price',width:80,align:'right',sortable:true},
{field:'unitcost',title:'Unit Cost',width:80,align:'right',sortable:true},
{field:'attr1',title:'Attribute',width:100},
{field:'status',title:'Status',width:60}
]]
*/

//数据分页http://www.jeasyui.net/plugins/155.html 
/*
使用 javascript 创建分页（pagination）。
<div id="pp" style="background:#efefef;border:1px solid #ccc;"></div>
$('#pp').pagination({
total:2000,
pageSize:10
});

/*
//设置分页控件 
var p = $('#dgstahistory').datagrid('getPager');
$(p).pagination({
    total: data.length,
    pageSize: 10,//每页显示的记录条数，默认为10 
    pageList: [10, 20, 50, 100],//可以设置每页记录条数的列表 
    beforePageText: '第',//页数文本框前显示的汉字 
    afterPageText: '页    共 {pages} 页',
    displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',
    onSelectPage: function (pageNo, pageSize) {
        var start = (pageNo - 1) * pageSize;
        var end = start + pageSize;
        $("#dd").datagrid("loadData", data.slice(start, end));
        pager.pagination('refresh', {
            total: data.length,
            pageNumber: pageNo
        });
    }
    /*onBeforeRefresh:function(){
        $(this).pagination('loading');
        alert('before refresh');
        $(this).pagination('loaded');
    }* /
});
*/

/*
    $('#dg').datagrid({
        data: [
        { f1: 'value11', f2: 'value12' },
        { f1: 'value21', f2: 'value22' }
        ]
    });

    $('#dg').datagrid({
        columns: [[
        {
            field: 'userId', title: 'User', width: 80,
            formatter: function (value, row, index) {
                if (row.user) {
                    return row.user.name;
                } else {
                    return value;
                }
            }
        }
        ]]
    });

    */

/*
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3]
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            // Container for pan options
            pan: {
                // Boolean to enable panning
                enabled: true,

                // Panning directions. Remove the appropriate direction to disable 
                // Eg. 'y' would only allow panning in the y direction
                mode: 'xy'
            },

            // Container for zoom options
            zoom: {
                // Boolean to enable zooming
                enabled: true,

                // Zooming directions. Remove the appropriate direction to disable 
                // Eg. 'y' would only allow zooming in the y direction
                mode: 'xy',
            }
        }
    });


    var ctx = $("#myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'second'
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    */


/*
function generateChartData() {
    var chartData = [];
    var firstDate = new Date(2012, 0, 1);
    firstDate.setDate(firstDate.getDate() - 1000);
    firstDate.setHours(0, 0, 0, 0);

    for (var i = 0; i < 1000; i++) {
        var newDate = new Date(firstDate);
        newDate.setHours(0, i, 0, 0);

        var a = Math.round(Math.random() * (40 + i)) + 100 + i;
        var b = Math.round(Math.random() * 100000000);

        chartData.push({
            date: newDate,
            value: a,
            volume: b
        });
    }
    return chartData;
}

var chartData = generateChartData();

var chart = AmCharts.makeChart("emmyChartrs", {

    type: "stock",

    categoryAxesSettings: {
        minPeriod: "mm"
    },

    dataSets: [{
        color: "#b0de09",
        fieldMappings: [{
            fromField: "value",
            toField: "value"
        }, {
            fromField: "volume",
            toField: "volume"
        }],

        dataProvider: chartData,
        categoryField: "date"
    }],

    panels: [{
        showCategoryAxis: false,
        title: "当前降水量",
        percentHeight: 70,

        valueAxes: [{
            id: "v1"
        }],

        stockGraphs: [{
            id: "g1",
            valueField: "value",
            type: "smoothedLine",
            lineThickness: 2,
            bullet: "round"
        }],

        stockLegend: {
            valueTextRegular: " ",
            markerType: "none"
        }
    },
        {
            title: "累积降水量",
            percentHeight: 30,

            stockGraphs: [{
                valueField: "volume",
                type: "column",
                cornerRadiusTop: 2,
                fillAlphas: 1
            }],

            stockLegend: {
                valueTextRegular: " ",
                markerType: "none"
            }
        }],

    panelsSettings: {
        usePrefixes: true
    },

    chartScrollbarSettings: {
        graph: "g1",
        usePeriod: "10mm",
        position: "top",
        updateOnReleaseOnly: false
    },

    chartCursorSettings: {
        valueBalloonsEnabled: true,
        valueLineBalloonEnabled: true,
        valueLineEnabled: true
    },

    periodSelector: {
        position: "bottom",
        dateFormat: "YYYY-MM-DD HH:NN",
        inputFieldWidth: 150,
        periods: [{
            period: "hh",
            count: 1,
            label: "1 hour",
            selected: true

        }, {
            period: "hh",
            count: 2,
            label: "2 hours"
        }, {
            period: "hh",
            count: 5,
            label: "5 hour"
        }, {
            period: "hh",
            count: 12,
            label: "12 hours"
        }, {
            period: "MAX",
            label: "MAX"
        }]
    }


});
chart.pathToImages = "../images/";
*/
