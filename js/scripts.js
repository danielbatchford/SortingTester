function openAttachment() {
  document.getElementById('attachment').click();
}

function fileSelected(input){
  document.getElementById('btnAttachment').innerHTML = input.files[0].name;
  document.getElementById('testBtn').style.display = 'inline-block';
}

function computeData(){
console.log("Hello World")
}
