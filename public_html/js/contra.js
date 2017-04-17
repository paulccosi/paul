/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function envia(pag){
    document.form.action = './js/'+pag+'.contra';
        document.form.submit();
}
 
function valida(){
    var usuario = document.getElementById('usuario');
    var pass = document.getElementById("password");
            
    if((usuario == "")||(pass == "")){
        window.alert("Los campos usuario y contraseña no pueden estar vacios");
    }else{
        envia('login');
    }
}

