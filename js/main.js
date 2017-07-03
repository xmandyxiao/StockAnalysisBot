"use strict";

$(document).ready(function() {
    var t = $('#tableStockData').DataTable({
        "aoColumns": [
            { "mDataProp": "Stock", "sClass": "center"},
            { "mDataProp": "Price", "sClass": "center" },
            { "mDataProp": "PurchasePrice", "sClass": "center" },
            { "mDataProp": "Size", "sClass": "center" },
            { "mDataProp": "PnL", "sClass": "center" }],

    });
    console.log("Stock data table is initialized.");
}); //initialize stock table


function getStockPriceById(symbol){
    $.ajax({
            type: "get",
            url: "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+symbol+"&apikey=CJKYBY0WD07GPGYP",
            contentType: "application/json",
            success: function (result) {
                        console.log(result["Realtime Global Securities Quote"]["03. Latest Price"]);
                        return result["Realtime Global Securities Quote"]["03. Latest Price"];         
                }
            });
    
};//get stock price


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


