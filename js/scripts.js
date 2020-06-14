//Show a modal on call.
function showModal() {
  document.getElementById('modal').style.display = "block";
}

//Hides the modal on click outside of modal box
window.onclick = function(event) {
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

    reader.onload = function(loadEvent) {
      var stringData = loadEvent.target.result;
      var data = stringData.replace(/[^0-9\-\.]/g, ' ').split(' ').map(Number); //HERE, REGEX IS INCLUDING LOTS OF UNNECCESSARY ZEROS. TRY REMOVING DUPE SPACES!!!

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
  document.getElementById("outputPreview").innerHTML = displayResult(data.sort(function(a, b) {
    return a - b;
  }), maxToDisplay);

}


function tableBuilder(data) {

  document.getElementById("table").rows[1].cells[3].innerHTML = quickSort(data, performance.now())[0];
  document.getElementById("table").rows[2].cells[3].innerHTML = mergeSort(data, performance.now())[0];
  document.getElementById("table").rows[3].cells[3].innerHTML = bubbleSort(data, performance.now())[0];
  document.getElementById("table").rows[4].cells[3].innerHTML = selectionSort(data, performance.now())[0];
  document.getElementById("table").rows[5].cells[3].innerHTML = insertionSort(data, performance.now())[0];
  document.getElementById("table").rows[6].cells[3].innerHTML = heapSort(data, performance.now())[0];
  document.getElementById("table").rows[7].cells[3].innerHTML = countingSort(data, performance.now())[0];

  console.log("Before");
  console.log(data);
  console.log("QS");
    console.log(quickSort(data)[1]);
  console.log("MS");
  console.log(mergeSort(data)[1]);
  console.log("HS");
  console.log(heapSort(data)[1]);
  console.log("CS");
  console.log(countingSort(data)[1]);
}

//Display a result from an integer array, in a formatted shortened string.
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
  if (input > 100) {
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

//ADD IN COMMENTS FOR SORT AND HELPER METHODS some weird reference thing going on here since heap and counting sort added
//move timestarted to outside functions, make them only return data


function countingSort(dataOrig, timeStarted) { //not implemented yet
  var data = dataOrig.slice();
  return [timeFormat(performance.now() - timeStarted),data];
}

function heapSort(dataOrig, timeStarted) { //not implemented yet
  var data = dataOrig.slice();
  return [timeFormat(performance.now() - timeStarted),data];
}

function bubbleSort(dataOrig, timeStarted) {
  var data = dataOrig.slice();
  var length = data.length;
  var swapped = true;
  while (swapped) {
    swapped = false;
    for (var i = 0; i < length - 1; i++) {
      if (data[i] > data[i + 1]) {
        var tmp = data[i];
        data[i] = data[i + 1];// use swap function
        data[i + 1] = tmp;
        swapped = true;
      }
    }
  }

  return [timeFormat(performance.now() - timeStarted),data];
}

function quickSort(dataOrig, timeStarted) {
  var data = dataOrig.slice();

  data = internalQuickSort(data, 0, data.length - 1);

  return [timeFormat(performance.now() - timeStarted),data];
}

//This function is needed to support recursion on the main timing quicksort function

function internalQuickSort(data, low, high) {

  var index;
  if (data.length > 1) {
    index = qsPartition(data, low, high);

  if (low < index - 1) {
    internalQuickSort(data, low, index - 1)
  }
  if (index < high) {
    internalQuickSort(data, index, high);
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

function insertionSort(dataOrig, timeStarted) {
  var data = dataOrig.slice();
  var length = data.length;

  for (var i = 1; i < length; i++) {
    var key = data[i];
    var j = i - 1;
    while (j >= 0 && data[j] > key) {
      data[j + 1] = data[j];
      j--;
    }
    data[j + 1] = key;
  }

  return [timeFormat(performance.now() - timeStarted),data];
}



function mergeSort(dataOrig, timeStarted) { //currently not working
  var data = dataOrig.slice();

  data = internalMergeSort(data);

  return [timeFormat(performance.now() - timeStarted),data];
}

function internalMergeSort(data) {
  if (data.length <= 1) return data;

  var center = Math.floor(data.length / 2);

  return merge(internalMergeSort(data.slice(0, center)), data.slice(center));
}


function merge(left, right) {
  var result = [];
  var li = 0;
  var ri = 0;

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

function selectionSort(dataOrig, timeStarted) {
  var data = dataOrig.slice();

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

  return [timeFormat(performance.now() - timeStarted),data];
}

//Helper function to swap two elements in an array (passed by reference)
function swapElements(data, a, b) {
  temp = data[a];
  data[a] = data[b];
  data[b] = temp;
}
