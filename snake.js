function myFunction() {
    alert("Hello");
    //console.log("Hello");
}

var form2 = document.getElementById('id01');
// When the user clicks anywhere outside of the form, close it
document.onclick = function(event) {     
    if (event.target == form2) {         
        form2.style.display = 'none'; 
    }
}
