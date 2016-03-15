// get the file (replace with your own url)
$.get("http://jessnapes.github.io/partials/nav.html", function (data){
 
  $(document).ready(function(){
    
 $(".container").prepend(data);  
    
   })   
    
})