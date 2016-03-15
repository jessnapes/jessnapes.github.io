$("#getClients").on("click, function" () {



$.getJSON("http://jessnapes.github.io/OTHERPROJECTS/ajaxExamples/json/clients.json", function(data){
    


    alert("working");

alert(data);
console.dir(data);

    })
})