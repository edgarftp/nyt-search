
$(document).ready(function (){          //Wait for page to load

    //Logic for the click event on "search"
    $("#search").on("click", function (event)  {    
        //This prevents the page from reloading and losing all the input data
        event.preventDefault();

        $("#topArt").empty();   //empty the Div holder so results don't stack up
        var q = $("#search-term").val();    //assing the search term to "q"
        var num = $("#number").val();   //assing the number of articles term to "num"
        var startYear = $("#startYear").val() || "";    //assign the start year 
        var endYear = $("#endYear").val() || "";    //assign the end year

        //Create using the information given by the user. It has conditionals because if start or endyear are not filled
        //we dont want that part of the string added to our URL
        var url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=d48f54bbb1fe4d998cd8dfc34b66ff0f&q='+ q;
        if (startYear == "" && endYear == "") {
            url += "'";
        }else
            if (startYear != ""){
                if (endYear !=""){
                    url += "&begin_date=" + startYear +"&end_date=" + endYear + "'";
                }else {
                    url += "&begin_date=" + startYear + "'";
                }
            }else{
                url += "&end_date=" + endYear + "'";
            }

        if (q != ""){       //Validation so we don't search if the search input is blank
        //ajax call
        $.ajax({
                url: url,
                method: 'GET',
            }).then(function(response) {
                $("#topArt").removeClass("hide");       //remove class hide I added to #topArt
                var result = response.response.docs;    //This is to save time and space below when we call the response.
                for (i=0; i<num; i++) {         //Loop so we display the number of articles selected by user

                    var newDiv = $("<div>");    //create a new div called newDiv 
                    if (result[i].headline.main){   //validate if that property on the object exists
                        var header = $("<h4>").text(result[i].headline.main);   //Create a header <h4> and assign the headline.main value
                    }else {
                        var header ="";     // if the property doesn't exist just assign empty space to header
                    }
                    if (result[i].snippet){     //same validation for the snippet
                        var snippet = $("<p>").text(result[i].snippet); //create a <p> and assign text from snippet
                        }else {
                        var snippet ="";    //else, leave it blank
                        }
                    if (result[i].web_url){     //validation for the URL of the article
                        var web_url = $("<a>").text(result[i].web_url); //create a link with the text of the URL
                        web_url.attr("href", result[i].web_url);    //add an attribut for the href with the URL
                        web_url.attr("target", "blank");    //add the attribute so it opens the link on a new tab
                        }else {
                        var web_url ="";    //else leave it blank
                        }
            
                    newDiv.append(header);  //append header to newDiv
                    newDiv.append(snippet); //append snippet next
                    newDiv.append(web_url); //append web_url next
                    $("#topArt").append(newDiv);    //append newDiv to #topArt

                }
            })
        }
    })

    // on click on "clear results"
    $("#clear").on("click", function () {
        //Resets input values to the default
        $("#search-term").val("");  
        $("#startYear").val("");
        $("#endYear").val("");
        
        //Here we empty the div "#topArt" so all the articles cleared.
        $("#topArt").empty();
    })
});
