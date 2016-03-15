$(document).ready(function(){
    
    //add some text
    
    $("#myButton").on("mouseenter", function(){
    $("#log").append("<br> Mouse Enter")
        $(this).text("Thank You!");
    })
        .on("mouseleave", function(){
        $("#log").append("<br> Mouse Leave")
        $(this).text("Submit Review! ")
        
    });
    
    //changes background to red
    $("#myInput").on("focus", function(){
     $(this).css("background-color","red");   
    })
    //changes background back to white after you unclick 
     .on("blur", function(){
     $(this).css("background-color","white");   
    });
    
    
   $("#mySelect").on("change", function(){
       
       var val = $(this).val();
    
   $("#mySelectMessage").html(val + " is a good number!"); 
    }); 
    //user clicks te button
    $("#myButton").on("click", function(){
    
        var myInput = $('#myInput').val();
        var myTextarea = $('#myTextarea').val();
        var mySelect = $('#mySelect').val();
        var myRadio = $('#myRadio').val();
        var myRadio = $("[name='gender']:checked").val();
        
        var myCheckValue = [];
        
        $("[name='vehicle']:checked").each(function() {
            myCheckValue.push($(this).val());
        });
      
    $("#log").append("<br>User clicked the button");

        
    $("#log").append("<br>Value of input is: "+myInput);
    $("#log").append("<br>Value of textarea is: "+myTextarea);
    $("#log").append("<br>Value of select is: "+mySelect);
    $("#log").append("<br>Value of radio button is: "+myRadio);
    $("#log").append("<br>Value of radio button is: "+myCheckValue.join());
    
})
    
    
});