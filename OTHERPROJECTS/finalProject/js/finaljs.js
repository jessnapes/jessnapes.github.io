$(document).ready(function () {




        //get all the nav li, add click event
        $(".nav").find("li").on("click", function () {

                $("#pageContent").hide().html("");
                //remove all active class
                $(".nav").find("li").removeClass("active");
                //add active class to clicked li
                $(this).addClass("active");

                //get the correct page according to click
                var page = $(this).attr("id");
                getPartial(page);

            }) //click

        //get the parital via JSON, add to page, activiate associating js
        function getPartial(partial) {

            if (partial == "homePage") { //ajax get home.html
                $.get("partials/home.html", function (data) {

                    $("#pageContent").html(data);
                    $('.carousel').carousel();
                })
            } else if (partial == "seeIceCreamPage") { //ajax models.html
                //paste the getJSON here; change the append id; change the file name
                $.getJSON("jsonDatabase/finaljson.json", function (data) {


                        console.dir(data);
                        var html = "";


                        $.each(data, function (index, item) {
                                //calling from json... 
                                html += '<div class="col-md-4">' +
                                    '<div class = "name" >' + item.name + '</div>' +
                                    '<div class = "flavour" >' + item.flavour + '</div>' +
                                    '<div class = "scoops" >' + item.scoops + '</div>' +
                                    '<img class="icecreamimage" src="' + item.image + '"/>' +


                                    '<div class="panel panel-default">' +
                                    '<div class="panel - heading">Click Here to Order This Flavour</div>';
                                $.each(item.comments, function (ind, i) {

                                        html += '<div class="panel-body">' +
                                            '<div class ="buyerName">' + i.username + '</div>' +
                                            '<div class ="buyerComment">' + i.comment + '</div>' +
                                            '<div class="renderStars">';

                                        for (var j = 1; j <= 5; j++) {
                                            //conditional logic for stars
                                            if (j <= i.stars) {
                                                html += '<img src="images/fullstar.png"/>';
                                            } else {
                                                html += '<img src="images/emptystar.png"/>';
                                            }

                                        } //var loop

                                        html +=
                                            '</div>' + //end stars
                                            '</div>'; //panel body

                                    }) //each comment 

                                html += '</div>' + // comments container
                                    '</div>' + //panel
                                    '</div>'; //col-md-4

                            }) //EACH

                        $("#pageContent").html(html);

                    }) //getJSON

            } else if (partial == "orderPage") { //ajax get order.html
                $.get("partials/order2.html", function (data) {

                        $("#pageContent").html(data);
                        //mouse enter and mouse leave sends to log... this function is JQUERY 
                        $("#submitButton").on("mouseenter", function () {
                            $("#log").append("<br>Button mouseenter");
                            $(this).text("Complete Order!");
                        })

                        .on("mouseleave", function () {
                            $("#log").append("<br>Button mouseleave");
                            $(this).text("Order Now!");
                        });

                        $('#startOrderDate, #desiredDelieveryDate').datepicker({});


                        $("#submitButton").on("click", function () {


                                //get all empty inputs and select
                                //add error class to div container
                                $("input, select").filter(function () {
                                    //if there is error, you cannt submit order
                                    //if there is no error, you may send order. 

                                    return !this.value;
                                }).closest("div").addClass("has-error");

                                //remove error class for non empty ones
                                $("input, select").filter(function () {

                                    return this.value; //removed !
                                }).closest("div").removeClass("has-error");

                                var errors = $(".has-error");

                                if (errors.length < 1) {
                                    //alert("no errors");
                                    sendConfirmation();
                                }

                            }) //click
                    }) //get
            }
            $("#pageContent").fadeIn();

        }

        function sendConfirmation() {

            //make an object to record data for database;
            var order = {};
            //get all teh jquery objects
            var formData = $("input, select");
            //for each jquery object
            formData.each(function () {
                var id = $(this).attr("id"); //get the id of the element
                order[id] = $(this).val(); //set the field and the value
            })

            alert("Sending to database " + JSON.stringify(order));
            $("#successMsg").html("What A Yummy Order! Thank You!  <br/><br/>" +
                order.IceCreamSelect + " Will be delivered from Ice Cream Mania on " +
                order.startOrderDate + "<img src='images/icecream-scoop-order.png'>");

        } //sendConfirmation

        //begin the program, get the homepage
        getPartial("homePage");

    }) //ready