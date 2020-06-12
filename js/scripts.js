window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function showModal() {
  document.getElementById('modal').style.display = "block";
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

//Read From a file and display the interpreted result
function readFile(evt) {

  var f = evt.target.files[0];
  if (f) {
    var r = new FileReader();

    r.onload = function(e) {
      var stringData = e.target.result;

      document.getElementById('readContainer').style.display = "block";


      data = stringData.replace(/\D/g, ' ').replace(/\s\s+/g, ' ').split(' ').map(Number); //Clean up this regex, work with neg numbers

      if (data.length <= 1) {
        document.getElementById("btnAttachment").innerHTML = "Data is too short";
        return;
      }
      var stringToDisplay = "";
      var maxToDisplay = 15;

      for (var i = 0, cap = Math.min(data.length, maxToDisplay); i < cap; i++) {
        stringToDisplay += data[i] + ", ";
      }

      if (data.length > maxToDisplay) {
        stringToDisplay += " .....";
      }

      document.getElementById("readResult").innerHTML = stringToDisplay;
      document.getElementById("fileInfo").innerHTML = "Found " + data.length + " Elements. Your input was interpreted as:";
      tableBuilder(data);
      displayResult(data, maxToDisplay);
    }
    r.readAsText(f);


  } else {
    document.getElementById("btnAttachment").innerHTML = "Cannot Read From This File";
  }
}

function tableBuilder(data) {

  document.getElementById('tableContainer').style.display = "block";
  //document.getElementById("table").rows[1].cells[3].innerHTML = quickSort(data, performance.now());
  document.getElementById("table").rows[2].cells[3].innerHTML = mergeSort(data, performance.now());
  document.getElementById("table").rows[3].cells[3].innerHTML = bubbleSort(data, performance.now());
  document.getElementById("table").rows[4].cells[3].innerHTML = selectionSort(data, performance.now());
  document.getElementById("table").rows[5].cells[3].innerHTML = insertionSort(data, performance.now());


}

function displayResult(data, maxToDisplay) {
  console.log("Called");
  document.getElementById("outputPreviewContainer").style.display = "block";

  var outputData = data.sort();
  var s = "";
  for (var i = 0, max = Math.min(outputData.length, maxToDisplay); i < max; i++) {
    s += outputData[i] + " ";
  }

  if(outputData.length > maxToDisplay) s+=" .....";
  document.getElementById("outputResult").innerHTML = s;
}

function timeFormat(input) {
  if (input > 100) {
    return (input / 1000).toFixed(1) + " s";
  }
  if (input > 1) {
    return input.toFixed(1) + " ms";
  }
  return (input * 1000).toFixed(1) + " ns";
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
        data[i] = data[i + 1];
        data[i + 1] = tmp;
        swapped = true;
      }
    }
  }

  return timeFormat(performance.now() - timeStarted);
}

function quickSort(dataOrig, timeStarted) {
  var data = dataOrig.slice();

  console.log(data);
  internalQuickSort(data, 0, data.length - 1);

  console.log(data);
  return timeFormat(performance.now() - timeStarted);
}

function internalQuickSort(origdata, low, high) {
  var data = origdata.slice();
  var index;
  if (data.length > 1) {
    index = qsPartition(data.slice(), low, high);
  }
  if (left < index - 1) {
    internalQuickSort(data, low, index - 1)
  }
  if (index < right) {
    internalQuickSort(data, index, high);
  }
  return data;
} //Not done yet

function qsPartition(data, low, high) {
  var pivot = data[Math.floor((low + high)) / 2];
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
      temp = data[i];
      data[i] = data[j];
      data[j] = temp;
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

  return timeFormat(performance.now() - timeStarted);
}

function mergeSort(dataOrig, timeStarted) {
  var data = dataOrig.slice();
  return timeFormat(performance.now() - timeStarted);
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
      var tmp = data[i];
      data[i] = data[min];
      data[min] = tmp;
    }

  }

  return timeFormat(performance.now() - timeStarted);
}
