const axios = require("axios");

axios.get("http://localhost:8080/api-prods")
.then (function(response){
    console.log({status:response.statusText , data:response.data})
})
.catch (function(error){
    console.log(error)
})

axios.post("http://localhost:8080/api-prods" , {
    nombre:"Prueba axios",
    precio:5000,
    imagen:"https://maxst.icons8.com/vue-static/icon/style-section/pixels.png"
})
.then (function(response){
    console.log({status:response.statusText , data:response.data})
})
.catch (function(error){
    console.log(error)
})

axios.put("http://localhost:8080/api-prods" , {
    nombre:"OtraPruebaPut axios",
    precio:6000,
    imagen:"https://maxst.icons8.com/vue-static/icon/style-section/pixels.png",
    id:2
})
.then (function(response){
    console.log({status:response.statusText , data:response.data})
})
.catch (function(error){
    console.log(error)
})

axios.delete("http://localhost:8080/api-prods/3")
.then (function(response){
    console.log({status:response.statusText , data:response.data})
})
.catch (function(error){
    console.log(error)
})