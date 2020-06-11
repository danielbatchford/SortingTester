
window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    
function showModal(){
  document.getElementById('modal').style.display = "block";
}
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

      document.getElementById('readResultContainer').style.display = "block";


      data = stringData.replace(/\D/g, ' ').replace(/\s\s+/g, ' ').split(' ').map(Number); //Clean up this regex, work with neg numbers


      var stringToDisplay = "";
      var maxToDisplay = 15;

      for (var i = 0, cap = Math.min(data.length, maxToDisplay); i < cap; i++) {
        stringToDisplay += data[i] + ", ";
      }
      if (data.length > maxToDisplay) {
        stringToDisplay += " ...";
      }

      document.getElementById("readResult").innerHTML = stringToDisplay;
      document.getElementById("fileInfo").innerHTML = "Found " + data.length +" Elements. Your input was interpreted as:";
      tableBuilder(data);
    }
    r.readAsText(f);


  } else {
    document.getElementById("btnAttachment").innerHTML = "Cannot Read From This File";
  }
}

function tableBuilder(data) {
    document.getElementById('tableContainer').style.display = "block";
    document.getElementById("table").rows[1].cells[3].innerHTML = quickSort(data,performance.now());
    document.getElementById("table").rows[2].cells[3].innerHTML = mergeSort(data,performance.now());
    document.getElementById("table").rows[3].cells[3].innerHTML = bubbleSort(data,performance.now());
    document.getElementById("table").rows[4].cells[3].innerHTML = selectionSort(data,performance.now());
  document.getElementById("table").rows[5].cells[3].innerHTML = insertionSort(data,performance.now());

  console.log(insertionSort(data, performance.now()));
}

function timeFormat(input){
  if(input > 1){
    return input.toFixed(1)+" ms";
  }
  return (input*1000).toFixed(1)+" ns";
}

function bubbleSort(data, timeStarted) {

  var length = data.length;
  var swapped = true;
  while (swapped) {
    swapped = false;
    for (var i = 0; i < length - 1; i++) {
      if (data[i] > data[i + 1]) {
        var tmp = data[i];
        data[i] = data[i + 1];
        data[i + 1] = tmp;
        swapped = true;
      }
    }
  }

  return timeFormat(performance.now() - timeStarted);
}

function quickSort(data, timeStarted) {
    return timeFormat(performance.now() - timeStarted);
}

function insertionSort(data, timeStarted) {

  var length = data.length;

  for(var i = 1; i < length; i++){
    var key = data[i];
    var j = i-1;
    while(j >= 0 && data[j] > key){
      data[j+1] = data[j];
      j--;
    }
      data[j+1] = key;
  }

    return timeFormat(performance.now() - timeStarted);
}

function mergeSort(data, timeStarted) {
    return timeFormat(performance.now() - timeStarted);
}

function selectionSort(data, timeStarted) {
    return timeFormat(performance.now() - timeStarted);
}
