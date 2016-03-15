$(document.ready(function(){
    
    

//get clients
$("#getClients").on("click, function" () {


//get json
$.getJSON("http://jessnapes.github.io/OTHERPROJECTS/ajaxExamples/json/clients.json", function(data){
    
    
$.each(data, function(index, item){
       $("#data").append(item.name);
    
})
    
//this is to see if the clients is responding 

    alert("working");

alert(data);
console.dir(data);

 })   
    })
    
})