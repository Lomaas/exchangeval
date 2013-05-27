function getNextImage(){

    var e = document.getElementById("fromValuta");
    var fromValuta = e.options[e.selectedIndex].value;
    var e = document.getElementById("toValuta");
    var toValuta = e.options[e.selectedIndex].value;
    valueNumber
    var e = document.getElementById("valueNumber");
    var value = e.value
    //var fromValuta = $('#fromValuta').options[$('#fromValuta').selectedIndex].value;
    //var toValuta = $('#toValuta').getValue();


    // http://rate-exchange.appspot.com/currency?from=USD&to=EUR&q=10
    var url = "http://rate-exchange.appspot.com/currency?" + 
            "from=" + fromValuta + "&to=" + toValuta + "&q=" + value;

    $.ajax({
        url: url,
        success: getExchangeValue,
        dataType: "JSONP",
        error: errorGetExchangeValue
    });    

};

function getExchangeValue(jObj){
    console.log(jObj.rate)
    $("#convertedAmount").html("<b>Value:" + jObj.v + "</b>" + " @ rate: " + jObj.rate);

}

function errorGetExchangeValue(error){
    alert("error")
}

$(document).ready(function() {

});


