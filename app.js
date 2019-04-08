
const met = require('./met.js')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/met', function(request, response){
	// Este header es necesario para prevenir errores relacionados con CORS
    response.setHeader('Access-Control-Allow-Origin',  "*")
    //preguntamos si escribimos la ciudad en la consulta a nuestro servidor/
  	if(!request.query.search){
  		return response.send({
  			error: 'tienes que dar un string a buscar'
  		})
  	}

  	met.getID(request.query.search, function(error, response){
          console.log(response)
          met.collection(response, function(error, res){
            return res.send({
                //searchTerm: request.query.search,
                artist: res.artist,
                title: res.title,
                year: res.objectDate,
                technique: res.medium,
                metUrl: res.objectURL
            })
          })
  		
  	})

})


app.get('*', function(req, res){
    res.send({
        error: 'La ruta no existe'
    })
})
    
app.listen(port, function(){
    console.log('up and running')
})