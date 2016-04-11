$(document).ready(function () {

        //get all the nav li, add click event
        $(".nav").find("li").on("click", function () {

                //remove all active class
                $(".nav").find("li").removeClass("active");
                //add active class to clicked li
                $(this).addClass("active");

                var page = $(this).attr("id");
                getPartial(page);

            }) //click

        function getPartial(partial) {
            $("#pageContent").hide();
            if (partial == "homePage") { //ajax get home.html
                $.get("partials/home.html", function (data) {
                    $("#pageContent").html(data);
                    $('.carousel').carousel()
                })
            } else if (partial == "seeCatsPage") { //ajax models.html
                //paste the getJSON here; change the append id; change the file name

                $.getJSON("jsonDatabase/finalJson.json", function (data) {

                        console.dir(data);
                        var html = "";


                        $.each(data, function (index, item) {
                                html += '<div class="col-md-4">' +
                                    '<div class = "name" >' + item.name + '</div>' +
                                    '<div class = "flavour" >' + item.flavour + '</div>' +
                                    '<div class = "scoops" >' + item.scoops + '</div>' +
                                    '<img class="icecreamimage" src="' + item.image + '"/>' +
                                    // '<div class="commentsContainer">';

                                    '<div class="panel panel-default">' + //added
                                    '<div class="panel-heading"> Ice Cream Reviews! </div>'; //added
                                $.each(item.comments, function (ind, i) {
                                        html += '<div class="panel-body">' + //added
                                            '<div class ="buyerName">' + i.username + '</div>' +
                                            '<div class ="buyerComment">' + i.comment + '</div>' +
                                            '<div class="renderStars">';

                                        for (var j = 1; j <= 5; j++) {

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


                        //activating the start rent date and end rent data
                        $("startRentDate, #endRentDate").datepicker({});

                        //put the takeAnOrder.js here (inside get)
                        //change button text
                        $("#myButton").on("mouseenter", function () {
                                $("#log").append("<br>Button mouseenter");
                                $(this).text("ORDER NOW!!!");
                            })
                            .on("mouseleave", function () {
                                $("#log").append("<br>Button mouseleave");
                                $(this).text("Click Me!");
                            });


                        //change the backgrund color on focus, blue
                        $("#mySingleLineText").on("focus", function () {
                                $("#log").append("<br>input focus");
                                $(this).css("background-color", "#F7F8E0");
                            })
                            .on("blur", function () {
                                $("#log").append("<br>input blur");
                                $(this).css("background-color", "#FFF");
                            });

                        //give the user a message about their selection
                        $("#mySelect").on("change", function () {

                            var val = $(this).val();
                            $("#log").append("<br>select change");
                            $("#mySelectMessage").html(val + " is a nice selection!");

                        });

                        //user clicks the button
                        $("#myButton").on("click", function () {

                            $("#log").append("<br>User clicked the button");

                            var userOrder = {};

                            userOrder.myInput = $("#mySingleLineText").val();
                            userOrder.myTextarea = $("#myTextarea").val();
                            userOrder.mySelect = $("#mySelect").val();
                            userOrder.myRadio = $("[name='gender']:checked").val();
                            userOrder.myCheckValues = [];

                            $("[name='vehicle']:checked").each(function () {
                                userOrder.myCheckValues.push($(this).val());
                            });

                            $("#log").append("<br>Value of input is: " + userOrder.myInput);
                            $("#log").append("<br>Value of textarea is: " + userOrder.myTextarea);
                            $("#log").append("<br>Value of select is: " + userOrder.mySelect);
                            $("#log").append("<br>Value of radio button is: " + userOrder.myRadio);
                            $("#log").append("<br>Value of checks is: " + userOrder.myCheckValues.join());
                            $("#log").append("<br><br>Value of userOrder is: " + JSON.stringify(userOrder));
                        })
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
            $("#successMsg").html("Order Received!<br/><br/>" +
                order.catSelect + " will be delivered on " +
                order.startRentDate +
                "<img id='chocolate' src='images/chocolate_icecream.jpg'>");

        } //sendConfirmation

        //begin the program, get the homepage
        getPartial("homePage");




        ;
    }) //ready