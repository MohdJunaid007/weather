// to get module request from external server node 

//jshint esversion:6
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");


const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
// to send HTML file use this code
res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    console.log(req.body.cityName);
    const query=req.body.cityName;
    const countryQ=req.body.countryName;
    const url="https://api.openweathermap.org/data/2.5/weather?q=" +query+","+countryQ+"India&units=metric&appid=d6ceb99311b500e13f58e38cfb6c2b8e";
   
https.get(url,function(response){
    console.log(response.statusCode);

response.on("data",function(data){
//    console.log(data);
const weatherData =JSON.parse(data);
console.log(weatherData);

// const object={
//     name:"Mohd Junaid",favFood:"Biryani"
// }
// console.log(JSON.stringify(object));
const temp=weatherData.main.temp;
console.log(temp);
const weatherDescription =weatherData.weather[0].description;
console.log(weatherDescription);
//    res.send("<h1> The temperatue of Lucknow is "+ temp+" Degree Celcius and weather description is "+weatherDescription+"</h1>");
const icon=weatherData.weather[0].icon;
const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";

res.write("<h1> The temperatue of "+query+" is "+ temp+"    degree celcius</h1>");
res.write("<h1> weather description is "+weatherDescription+"</h1>")
res.write("<img src="+imageURL+">");
res.send()
})
})  
})

// we can write only one res.send but we can write multiple res.write 






app.listen(3000,function(){
    console.log("the server is running on port 3000");
});


