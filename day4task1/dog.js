async function apicall(){
   let result= await fetch('https://dogapi.dog/api/v2/facts?limit=2')  
   let finalresult=await result.json()
  let result2= await fetch('https://dogapi.dog/api/v2/breeds?limit=2')  
   let finalresult2=await result2.json()
 
   document.getElementById("result").innerHTML=finalresult.data[0].attributes.body
   document.getElementById("res").innerHTML=finalresult2.data[1].attributes.name
}
