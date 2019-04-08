const request = require('request')

const getID = function(algo, callback){
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q='+ algo

    request({url: url, json:true}, function(error, response){
        console.log("hey")
        if(error){
            //console.log(error)
            callback(error, undefined)
            //console.log(error)
        }
       // else if(response.statusCode == 200){
           console.log("hola")
            const data = response.body
            const primero = data.objectIDs[0]
            callback(undefined, primero)
            
            
        //}
    })

}

const collection = function(obID, callback){
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + obID

    request({url: url, json:true}, function(error, response){
        if(error){
            callback(error, undefined)
        }
        else if(response.statusCode == 200){
            const data = response.body
            const info = {
                artist: data.artistDisplayName,
                title: data.title,
                year: data.objectDate,
                technique: data.medium,
                metUrl: data.objectURL
            }
            callback(undefined, info)
        }

    })
}


module.exports={
    getID: getID,
    collection: collection
}