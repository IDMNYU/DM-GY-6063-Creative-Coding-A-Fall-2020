
let data;

function preload() {
  let url = 'https://cors-anywhere.herokuapp.com/https://enviro.epa.gov/enviro/efservice/getEnvirofactsUVHOURLY/ZIP/11206/JSON';
 
    httpDo(url,{method:'GET'}, function(results){data=results});
}



function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(220);
   if (!data) {
     return;
   }else{
   console.log(data);
       noLoop();
   }
    
}