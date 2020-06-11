//Called when clicking visual button. Adds FileReader event listener and clicks hidden html file button
function openAttachment() {
  document.getElementById('attachment').addEventListener('change', readFile, false);
  document.getElementById('attachment').click();
}

//Displays the file input and test button.
function fileSelected(input) {
  document.getElementById('btnAttachment').innerHTML = input.files[0].name;
}

//Read From a file and display the interpreted result
function readFile(evt) {

  var f = evt.target.files[0];
  if (f) {
    var r = new FileReader();

    r.onload = function(e) {
      var stringData = e.target.result;

      document.getElementById('readInfo').style.display = "block";
      document.getElementById('tableContainer').style.display = "block";

      stringData = stringData.replace(/\D/g, ' ').replace(/\s\s+/g, ' '); //Clean up this regex
      document.getElementById("readResult").innerHTML = stringData;
      tableBuilder(stringData.split(' ').map(Number));
    }
    r.readAsText(f);


  } else {
    document.getElementById("btnAttachment").innerHTML = "Cannot Read From This File";
  }
}

function tableBuilder(data) {
  console.log(data);
}
