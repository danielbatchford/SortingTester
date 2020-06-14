//Show a modal on call.
function showModal() {
  document.getElementById('modal').style.display = "block";
}

//Hides the modal on click outside of modal box
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//Called when clicking visual button. Adds FileReader event listener and clicks hidden html file button
function openAttachment() {
  document.getElementById('attachment').addEventListener('change', readFile, false);
  document.getElementById('attachment').click();
}

//Displays the file input on button
function fileSelected(input) {
  document.getElementById('btnAttachment').innerHTML = input.files[0].name;
}

//Read From a file
function readFile(evt) {

  var file = evt.target.files[0];
  if (file) {
    var reader = new FileReader();

    reader.onload = function (loadEvent) {
      var stringData = loadEvent.target.result;
      var data = stringData.replace(/[^0-9\-\.]/g, ' ').replace(/\s\s+/g, ' ').split(' ').map(Number);

      if (data.length <= 1) {
        document.getElementById("btnAttachment").innerHTML = "Data is too short";
        return;
      }
      computeAndUpdatePage(data);
    }
    reader.readAsText(file);
  } else {
    document.getElementById("btnAttachment").innerHTML = "Cannot Read From This File";
  }
}

//Display file results, context information and page boxes.
function computeAndUpdatePage(data) {

  var maxToDisplay = 30;

  //Show the read container
  document.getElementById('readContainer').style.display = "block";

  //"Found n results tooltip"
  document.getElementById("fileInfo").innerHTML = "Found " + data.length + " Elements. Your input was interpreted as:";

  //Display interpreted Results
  document.getElementById("readResult").innerHTML = displayResult(data, maxToDisplay);

  //Show the table
  document.getElementById('tableContainer').style.display = "block";

  //Build the table
  tableBuilder(data);

  //Show the output box
  document.getElementById("outputPreviewContainer").style.display = "block";
  //Show contents of the output box.
  document.getElementById("outputPreview").innerHTML = displayResult(data.sort(function (a, b) {
    return a - b;
  }), maxToDisplay);

}


function tableBuilder(data) {

  table = document.getElementById('table');

  start = performance.now();
  quickSort(data.slice(),0,data.length);
  table.rows[1].cells[3].innerHTML = timeFormat(performance.now() - start);

  start = performance.now();
  mergeSort(data.slice());
  table.rows[2].cells[3].innerHTML = timeFormat(performance.now() - start);

  start = performance.now();
  bubbleSort(data.slice());
  table.rows[3].cells[3].innerHTML = timeFormat(performance.now() - start);

  start = performance.now();
  selectionSort(data.slice());
  table.rows[4].cells[3].innerHTML = timeFormat(performance.now() - start);

  start = performance.now();
  insertionSort(data.slice());
  table.rows[5].cells[3].innerHTML = timeFormat(performance.now() - start);

  start = performance.now();
  heapSort(data.slice());
  table.rows[6].cells[3].innerHTML = timeFormat(performance.now() - start);

  start = performance.now();
  countingSort(data.slice());
  table.rows[7].cells[3].innerHTML = timeFormat(performance.now() - start);


  /*
  console.log("Before");
  console.log(data);
  console.log("QS");
  console.log(quickSort(data.slice()));
  console.log("MS");
  console.log(mergeSort(data.slice()));
  console.log("BS");
  console.log(bubbleSort(data.slice()));
  console.log("SS");
  console.log(selectionSort(data.slice()));
  console.log("IS");
  console.log(insertionSort(data.slice()));
  console.log("HS");
  console.log(heapSort(data.slice()));
  console.log("CS");
  console.log(countingSort(data.slice()));*/
}

//Display a result from an object array, in a formatted shortened string.
function displayResult(data, maxToDisplay) {

  var outputString = "";
  for (var i = 0, max = Math.min(data.length, maxToDisplay); i < max; i++) {
    outputString += data[i] + ", ";
  }

  if (data.length > maxToDisplay) outputString += " .....";

  return outputString;

}

//Format time into a string, in either nanoseconds, milliseconds or seconds.
function timeFormat(input) {
  if (input > 1000) {
    return (input / 1000).toFixed(1) + " s";
  }
  if (input > 1) {
    return input.toFixed(1) + " ms";
  }
  return (input * 1000).toFixed(1) + " ns";
}


//------------------------------------------
//The Below Code contains implemented sorting functions
//------------------------------------------

//ADD IN COMMENTS FOR SORT AND HELPER METHODS


function countingSort(data) { //not implemented yet

  return data;
}

function heapSort(data) { //not implemented yet

  return data;
}

function bubbleSort(data) {

  var length = data.length;
  var swapped = true;
  while (swapped) {
    swapped = false;
    for (var i = 0; i < length - 1; i++) {
      if (data[i] > data[i + 1]) {
        swapElements(data, i, i + 1);
        swapped = true;
      }
    }
  }

  return data;
}

function quickSort(data){
  return quickSortInternal(data,0,data.length);
}


function quickSortInternal(data, low, high) {
  var index;
  if (data.length > 1) {
    index = qsPartition(data, low, high);

    if (low < index - 1) {
      quickSortInternal(data, low, index - 1)
    }
    if (index < high) {
      quickSortInternal(data, index, high);
    }
  }
  return data;
}

function qsPartition(data, low, high) {
  var pivot = data[Math.floor((low + high) / 2)];
  i = low;
  j = high;

  while (i <= j) {
    while (data[i] < pivot) {
      i++;
    }
    while (data[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swapElements(data, i, j);
      i++;
      j--;
    }
  }
  return i;
}

function insertionSort(data) {

  for (var i = 1, length = data.length; i < length; i++) {
    var key = data[i];
    var j = i - 1;
    while (j >= 0 && data[j] > key) {
      data[j + 1] = data[j];
      j--;
    }
    data[j + 1] = key;
  }

  return data;
}


function mergeSort(data) {
  if (data.length <= 1) return data;

  var center = Math.floor(data.length / 2);

  return merge(mergeSort(data.slice(0, center)), mergeSort(data.slice(center)));
}



function merge(left, right) {
  var result = [], li = 0, ri = 0;


  while (li < left.length && ri < right.length) {
    if (left[li] < right[ri]) {
      result.push(left[li]);
      li++;
    } else {
      result.push(right[ri]);
      ri++;
    }
  }
  return result.concat(left.slice(li)).concat(right.slice(ri));
}

function selectionSort(data) {


  var length = data.length;

  for (var i = 0; i < length; i++) {
    var min = i;
    for (var j = i + 1; j < length; j++) {
      if (data[min] > data[j]) {
        min = j;
      }
    }
    if (min != i) {
      swapElements(data, i, min);
    }

  }

  return data;
}

//Helper function to swap two elements in an array (passed by reference)
function swapElements(data, a, b) {
  temp = data[a];
  data[a] = data[b];
  data[b] = temp;
}
