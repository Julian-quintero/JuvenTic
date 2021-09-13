var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus()
})

var btn2 = document.getElementById("menu1");

btn2.onclick = function() {
console.log('click');
    }
    