var currencyValues = ["EUR", "GBP", "USD", "DKK", "NOK", "SEK", "UAH", "TRY"];
var rootUrl = "http://rate-exchange.appspot.com/currency?";

function startExchangeProcess(){

    var e = document.getElementById("fromValuta");
    var fromValuta = e.options[e.selectedIndex].value;
    var e = document.getElementById("toValuta");
    var toValuta = e.options[e.selectedIndex].value;
    valueNumber
    var e = document.getElementById("valueNumber");
    var value = e.value
    //var fromValuta = $('#fromValuta').options[$('#fromValuta').selectedIndex].value;
    //var toValuta = $('#toValuta').getValue();
    localStorage = supports_html5_storage()

    if(localStorage == false){
        alert("no support for local storage")
        return;
    }

    if(window.navigator.onLine == false){
        // User offline
        rate = parseFloat(localStorage[fromValuta + toValuta]);
        console.log("Local rate for " + fromValuta + toValuta);
        console.log(rate);

        if(rate != null){
            newValue = value * rate;
            setExchangeValue(newValue, rate);
        }
        else {
            alert("offline and no rate found stored locally");
        }
    }
    else if(window.navigator.onLine == true){
        var url = rootUrl + "from=" + fromValuta + "&to=" + toValuta + "&q=" + value;

        $.ajax({
            url: url,
            success: successGetExchangeValue,
            dataType: "JSONP",
            error: errorGetExchangeValue
        });    
    }
};

function successGetExchangeValue(jObj){
    console.log(jObj.rate);
    localStorage[jObj.from + jObj.to] = jObj.rate;
    setExchangeValue(jObj.v, jObj.rate)
}

function setExchangeValue(value, rate){
    $("#convertedAmount").html("<b>Value:" + value + "</b>" + " @ rate: " + rate);
}

function errorGetExchangeValue(error){
    alert("error getting exchange value")
}

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function getCurrentFromAndToValuta(){
    var e = document.getElementById("fromValuta");
    var fromValuta = e.options[e.selectedIndex].value;
    var e = document.getElementById("toValuta");
    var toValuta = e.options[e.selectedIndex].value;

    return fromValuta, toValuta;
}

function updateAllRates(){
    for(var i=0; i < currencyValues.length; i++){
        for(var k =0; k < currencyValues.length; k++){
            var url = rootUrl + "from=" + currencyValues[i] + "&to=" + 
                currencyValues[k] + "&q=" + "1";

            $.ajax({
                url: url,
                success: function(jObj){
                    console.log(jObj);
                    localStorage[jObj.from + jObj.to] = jObj.rate;
                },
                dataType: "JSONP",
                error: errorGetExchangeValue
            });    
        }
    }
};

$(document).ready(function() {
    localStorage = supports_html5_storage();

    if(window.navigator.onLine != false){
        updateAllRates();
    }
});


