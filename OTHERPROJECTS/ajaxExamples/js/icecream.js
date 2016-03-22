$(document).ready(function () {


        $.getJSON("jsonDatabase/icecream.json", function (data) {

                console.dir(data);
                var html = "";


                $.each(data, function (index, item) {
                        html += '<div class="col-md-4">' +
                            '<div class = "name" >' + item.name + '</div>' +
                            '<div class = "flavour" >' + item.flavour + '</div>' +
                            '<div class = "scoops" >' + item.scoops + '</div>' +
                            '<img class="icecreamimage" src="' + item.image + '"/>' +
                            '<div class="commentsContainer">';
                        console.dir(item.comments);

                        $.each(item.comments, function (ind, i) {
                                html += '<div class ="buyerName">' + i.username + '</div>' +
                                    '<div class ="buyerComment">' + i.comment + '</div>' +
                                    '<div class="renderStars">';

                                var numStars = Number(i.stars);

                                for (var i = 1; i <= 5; i++) {
                                    if (i <= numStars) {
                                        html += '<img src="images/fullstar.png"/>';

                                    } else {

                                        html += '<img src="images/emptystar.png"/>';
                                    }

                                } //var loop

                                html += '</div>'; //end stars
                            }) //each comment 

                        html += '</div>' + // comments container
                            '</div>'; //col-md-4

                    }) //EACH

                $("#icecreamdata").append(html);

            }) //getJSON

    }) //FUNCTIONS

/*
<div class ="col-md-4 icecream">
<div class ="icecreamName">
<div class ="icecreamType">
<div class ="icecream">
<img src"#"/>
<div class ="col-md-4">
<div class ="buyerName">
<div class ="buyerType">
<div class ="icecreamStars">

</div>

*/