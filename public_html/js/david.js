'use strict';

// short name, version, display name, max size
var dbdavid = openDatabase('DavidCQ', '1.0', 'Ejemplo por caso Académico', 2 * 1024 * 1024);


dbdavid.transaction(function(tx) {
  //tx.executeSql('DROP TABLE IF EXISTS persona');
  //tx.executeSql('DROP TABLE IF EXISTS usuario'); 
  tx.executeSql('CREATE TABLE IF NOT EXISTS persona(idPersona integer unique primary key AUTOINCREMENT, nombre varchar(100),apellido varchar(100),dni varchar(100),fn date(100),genero varchar(100),profesion varcahr(10),telefono varchar(10))', [], null, handleError);
  tx.executeSql('CREATE TABLE IF NOT EXISTS usuario(idUsuario integer unique primary key AUTOINCREMENT, usuario VARCHAR(30) NOT NULL,clave VARCHAR(60) NOT NULL, idPersona integer, FOREIGN KEY (idPersona) REFERENCES persona (idPersona))', [], null, handleError);
 
}, null, null); // error handler, success handler

function handleError(transaction, error) {
  transaction = null; // dummy statement to avoid jshint error...
  log('Something went wrong: ' + error.message + ', code: ' + error.code);
  return false;
}




function agregarPersona(nombre,apellido,dni,fn,genero,profesion,telefono) {
  dbdavid.transaction(function(tx) {
    tx.executeSql('INSERT INTO persona (nombre,apellido,dni,fn,genero,profesion,telefono) VALUES (?, ?, ?,?, ?, ?,?)', [nombre,
      apellido,dni,fn,genero,profesion,telefono
    ]);
  }, handleError, function() {        
    buscarPersona("");
  });
}

var storeButton = document.getElementById('storeButton');
var nombre = document.getElementById('nombre');
var apellido = document.getElementById('apellido');
var dni = document.getElementById('dni');
var fn = document.getElementById('fn');
var genero = document.getElementById('genero');
var profesion = document.getElementById('profesion');
var telefono = document.getElementById('telefono');
var idPersona = document.getElementById('idPersona');
storeButton.addEventListener('click', function() {
  agregarPersona(nombre.value, apellido.value, dni.value, fn.value, genero.value, profesion.value, telefono.value);
})

var dataElement = document.getElementById('data');
function log(message) {
  //alert(message);
  console.log(message);
  dataElement.innerHTML =message;
}


function buscarPersona(text) {
  dbdavid.transaction(function(tx) { // readTransaction() is apparently faster
    var resulTRows="";  
    var statement = 'SELECT idPersona, nombre, apellido, dni, fn, genero, profesion, telefono FROM persona WHERE nombre like "%'+text+'%"';
    //var statement = 'SELECT artist, song FROM songs WHERE artist LIKE "%' +text + '%" OR song like "%' + text + '%"';
    // array unused here: ? field values not used in query statement
    tx.executeSql(statement, [], function(thisTx, results) {
      var numRows = results.rows.length;
      
      for (var i = 0; i !== numRows; ++i) {
        var rows= results.rows.item(i);
        resulTRows+='<tr><td>' + rows.idPersona + '</td>'+'<td>' + rows.nombre + '</td>'+'<td>' + rows.apellido + '</td>'+'<td>'+ rows.dni + '</td>'+'<td>'+ rows.fn + '</td>'+'<td>'+ rows.genero + '</td>'+'<td>'+ rows.profesion + '</td>'+'<td>' + rows.telefono + '</td>'+'<td style="text-align: center"><a href="#" onclick="eliminarPersona('+rows.idPersona+')">Delete</a>-<a href="#" onclick="editarPersona('+rows.idPersona+')">Edit</a> </td></tr>';        
      }
      
      log(resulTRows);
    }, handleError);
  });
  return resulTRows;
}

// tx.executeSql("DELETE FROM songs WHERE SONG=?", [song], handleError, null);


function eliminarPersona(id){
  dbdavid.transaction(function(tx) {
    tx.executeSql("DELETE FROM persona WHERE idPersona=?", [id], handleError, null);
  }, handleError, function() {        
    buscarPersona("");
    
    {
   
   if (eliminarPersona().test(eliminarPersona())){
   alert ('esta seguro');
   } else {
   alert ('Error');
   }   
   }
    
  });    
}


function editarPersona() {

  dbdavid.transaction(function(tx) { // readTransaction() is apparently faster
    var resulTRows="";  
    var statement = 'SELECT idPersona, nombre, apellido, dni, fn, genero, profesion, telefono FROM persona WHERE idPersona = "'+id+'"';
    //var statement = 'SELECT artist, song FROM songs WHERE artist LIKE "%' +text + '%" OR song like "%' + text + '%"';
    // array unused here: ? field values not used in query statement
    tx.executeSql(statement, [], function(thisTx, results) {
      var numRows = results.rows.length;
         // alert(numRows);
      for (var i = 0; i !== numRows; ++i) {
        var rows= results.rows.item(i);
        nombre.value=rows.nombre;
        apellido.value=rows.apellido;
        dni.value=rows.dni;
        fn.value=rows.fn;
        genero.value=rows.genero;
        profesion.value=rows.profesion;
        telefono.value=rows.telefono;
        idPersona.value=rows.idPersona;
        //resulTRows+='<tr><td>' + rows.idPersona + '</td>'+'<td>' + rows.nombre + '</td>'+'<td>' + rows.dni + '</td>'+'<td>' + rows.telefono + '</td>'+'<td style="text-align: center"><a href="#" onclick="eliminarPersona('+rows.idPersona+')">X</a> <a href="#" onclick="eliminarPersona('+rows.idPersona+')">E</a> </td></tr>';        
      }
      buscarPersona("");
      //log(resulTRows);
      
    }, handleError);
  });
 // return resulTRows;
}


var findButton = document.getElementById('findButton');
var query = document.getElementById('queryx');
findButton.addEventListener('click', function() {
  buscarPersona(query.value);
});