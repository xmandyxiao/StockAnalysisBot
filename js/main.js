"use strict";

"use strict";
var stockDataList;
var row_num = 5;



$(document).ready(function() {
    var t = $('#tableStockData').DataTable({
        "aoColumns": [
            { "mDataProp": "Stock", "sClass": "dt-center"},
            { "mDataProp": "Price", "sClass": "dt-center" },
            { "mDataProp": "StockPriceChange", "sClass": "dt-center" },
            { "mDataProp": "Size", "sClass": "dt-center" },
            { "mDataProp": "PnL", "sClass": "dt-center" }],
        
        "columnDefs":[{
            "createdCell": function (td, cellData, rowData, row, col) {
            if (row==row_num && col==1) {
                $(td).attr('id','stockPrice'+row_num);}
        }}]
       
    }); 
        
    
    console.log("Stock data table is initialized.");
    
    if (localStorage.getItem("stockDataList") !== null) {
         stockDataList= JSON.parse(localStorage.getItem("stockDataList"));
         stockDataList.forEach(function(stockData){
            var stockTickerId="stockId"+stockData.id.slice(-1);
            var stockPriceId = "stockPrice"+stockData.id.slice(-1);
            var stockChangeId = "stockChange"+stockData.id.slice(-1);
            $('#'+stockTickerId).val(stockData.ticker);
            $('#'+stockPriceId).html(stockData.price); 
            $('#'+stockChangeId).html(stockData.priceChange);
        })  

    }
   
    

}); //initialize stock table


function getStockPriceById(symbol){
    var stockPrice;
    $.ajax({
            type: "get",
            url: "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+symbol+"&apikey=CJKYBY0WD07GPGYP",
            async: false,
            contentType: "application/json",
            success: function (result) {
                        console.log(result["Realtime Global Securities Quote"]["03. Latest Price"]);
                        stockPrice= result["Realtime Global Securities Quote"]["03. Latest Price"];   
                }
            });
    return stockPrice;
    
};//get stock price

function getStockPriceChangeById(symbol){
    var stockChange;
    $.ajax({
            type: "get",
            url: "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+symbol+"&apikey=CJKYBY0WD07GPGYP",
            async: false,
            contentType: "application/json",
            success: function (result) {
                        console.log(result["Realtime Global Securities Quote"]["08. Price Change"]);
                        stockChange= result["Realtime Global Securities Quote"]["08. Price Change"];   
                }
            });
    return stockChange;
};//get stock price


$("#btnAddRow").on('click',function addRow(){
        var t = $('#tableStockData').DataTable();
        row_num ++;
    
        t.rows.add([
            {"Stock": 'Stock Ticker : <input type="text" size="20" id="stockId'+row_num+'">',
            "Price":  "",
            "StockPriceChange": "",
            "Size": '<input type="number" size="20" id="stockSizeId'+row_num+'">',
            "PnL":     ""}
        ]).draw();
    
    console.log("Add a new row, total row number is " + row_num);
}); //add a new row in the table

$("#btnGetStockPrice").on('click',function refreshStockPrice(){
    $('input[id^=stockId]').each(function(){
        var stockTicker = $(this).val();
        if (stockTicker !== ""){
            var stockTickerId = this.id;
            var stockPriceId = "stockPrice"+stockTickerId.slice(-1);
            console.log("Stock Id is "+ stockTickerId + " Stock ticker is "+stockTicker+" Stock price is "+stockPriceId);
            var stockPrice = getStockPriceById(stockTicker);
            $('#'+stockPriceId).html(stockPrice); //get stock price from API
         }
        
    })
});

$("#btnGetStockChange").on('click',function refreshStockPriceChange(){
    $('input[id^=stockId]').each(function(){
        var stockTicker = $(this).val();
        if (stockTicker !==""){
        var stockTickerId = this.id;
        var stockChangeId = "stockChange"+stockTickerId.slice(-1);
        console.log("Stock Id is "+ stockTickerId + " Stock ticker is "+stockTicker+" Stock price change is "+stockChangeId);
        var stockpriceChange = getStockPriceChangeById(stockTicker);
        $('#'+stockChangeId).html(stockpriceChange);
        console.log("Most recent stock price is " + stockpriceChange);
        }
    })
});

$("#btnSave").on('click',function save(){
    stockDataList=[];
    $('input[id^=stockId]').each(function(){
        var stockData = new Object();
        var stockTicker = $(this).val();
        var stockTickerId = this.id;
        if (stockTicker !== ""){
            stockData.id = stockTickerId;
            stockData.ticker = stockTicker;
            stockData.price = getStockPriceById(stockTicker);
            stockData.priceChange=getStockPriceChangeById(stockTicker);
            stockDataList.push(stockData);
            console.log(stockDataList)};
        })  //store stock ticker in an array
     localStorage.setItem("stockDataList", JSON.stringify(stockDataList));
});



$("#btnAddRow").on('click',function addRow(){
        var row_num = 5;
        var t = $('#tableStockData').DataTable();
        row_num ++;
        t.rows.add([
            {"Stock": 'Stock Ticker : <input type="text" size="20" id="stockId'+row_num+'">',
            "Price":   "",
            "PurchasePrice":     "3",
            "Size": "4",
            "PnL":     "5"}
        ]).draw();
    
    console.log("Add a new row, total row number is " + row_num);
}); //add a new row in the table

$("#btnGetStockPrice").on('click',function refreshStockPrice(){
    $('input[id^=stockId]').each(function(){
        var stockTicker = $(this).val();
        var stockTickerId = this.id;
        var stockPriceId = "stockPrice"+stockTickerId.slice(-1);
        console.log("Stock Id is "+ stockTickerId + " Stock ticker is "+stockTicker+" Stock price is "+stockPriceId);
        
        $('#stockPriceId').html = getStockPriceById(stockTicker);
    })
});


