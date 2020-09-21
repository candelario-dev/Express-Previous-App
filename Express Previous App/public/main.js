

let trash = document.getElementsByClassName("fa-trash");
let urgent = document.getElementsByClassName('fa-exclamation-circle')
// let done = document.getElementsByClassName('fa-check-square')
//******************************DON'T TOUCH******************************

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const id = this.parentNode.parentNode.childNodes[3].getAttribute("id")
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'msg': msg,
            'id': id
          })
        }).then(function (response) {
          window.location.reload()
        })
    });
});
//*****************************DON'T TOUCH***********************************
Array.from(urgent).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const id = this.parentNode.parentNode.childNodes[3].getAttribute("id")
        fetch('messages', {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'msg': msg,
            'id': id
          })
        }).then(function (response) {
          window.location.reload()
        })
    });
});
//*********************Don't touch***********************************************


document.getElementById('clearAll').onclick = removeAll;


function removeAll(){

  fetch('/removeAll', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },

  }).then(function (response) {
    console.log(response)
    window.location.reload()
  })
};
