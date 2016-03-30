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
                    $('.carousel').carousel();
                })
            } else if (partial == "seeCatsPage") { //ajax models.html
                //paste the getJSON here; change the append id; change the file name
                $.getJSON("jsonDatabase/finalJson.json", function (data) {

                        console.dir(data);
                        var html = "";

                        $.each(data, function (index, item) {
                                html += '<div class="col-md-4">' +
                                    '<div class="catName">' + item.name + '</div>' +
                                    '<div class="catType"><small>type </small>' + item.type + '</div>' +
                                    '<div class="catGender"><small>gender </small>' + item.gender + '</div>' +
                                    '<img class="catImage" src="' + item.image + '"/>' +
                                    //deleted commentsContainer
                                    '<div class="panel panel-default">' + //added
                                    '<div class="panel-heading">Renter Comments</div>'; //added
                                $.each(item.comments, function (ind, i) {
                                        html += '<div class="panel-body">' + //added
                                            '<div class="renterName">' + i.username + '</div>' +
                                            '<div class="renterComment">' + i.comment + '</div>' +
                                            '<div class="renterStars">';

                                        for (var j = 1; j <= 5; j++) {

                                            if (j <= i.stars) {
                                                html += '<img src="images/fullstar.png"/>';
                                            } else {
                                                html += '<img src="images/emptystar.png"/>';
                                            }
                                        }
                                        html += '</div>' + //end stars
                                            '</div>'; //panel body
                                    }) //each comment

                                html += '</div>' + //panel
                                    '</div>'; //col-md-4
                            }) //each cat

                        $("#pageContent").html(html);
                    }) //getJSON
            } else if (partial == "orderPage") { //ajax get order.html
                $.get("partials/order.html", function (data) {
                        $("#pageContent").html(data);
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

        //begin the program, get the homepage
        getPartial("homePage");

    }) //ready