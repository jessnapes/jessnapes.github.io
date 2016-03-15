

$("#getClients").on("click, function" () {



$.getJSON("http://jessnapes.github.io/OTHERPROJECTS/ajaxExamples/json/clients.json", function(data){
    
$.each(data, function(index, item){
       $("#data").append(item.name);
})
    


    alert("working");

alert(data);
console.dir(data);

    })
})