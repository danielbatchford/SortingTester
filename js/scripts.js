//Show a modal on call.
function showModal() {
  document.getElementById("modal").style.display = "block";
}

//Hides the modal on click outside of modal box
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//Called when clicking visual button. Adds FileReader event listener and clicks hidden html file button
function openAttachment() {
  document
    .getElementById("attachment")
    .addEventListener("change", readFile, false);
  document.getElementById("attachment").click();
}

//Displays the file input on button
function fileSelected(input) {
  document.getElementById("btnAttachment").innerHTML = input.files[0].name;
}

//Read From a file
function readFile(evt) {
  let file = evt.target.files[0];
  if (file) {
    let reader = new FileReader();

    reader.onload = function (loadEvent) {
      let stringData = loadEvent.target.result;

      //Formatting string data into an array of numbers. Removes n spaces, replacing with 1, then splits by this space into a number array.
      let data = stringData
        .replace(/[^0-9\-\.]/g, " ")
        .replace(/\s\s+/g, " ")
        .split(" ")
        .map(Number);

      //Ensures that data is of sufficient length
      if (data.length <= 1) {
        document.getElementById("btnAttachment").innerHTML =
          "Data is too short";
        return;
      }
      //Call the update script
      computeAndUpdatePage(data);
    };
    reader.readAsText(file);
  } else {
    //Reading file failed. Button is updated to display this error.
    document.getElementById("btnAttachment").innerHTML =
      "Cannot Read From This File";
  }
}

//Display file results, context information and page boxes.
function computeAndUpdatePage(data) {
  let maxToDisplay = 30;

  //Show the read container
  document.getElementById("readContainer").style.display = "block";

  //"Found n results tooltip"
  document.getElementById("fileInfo").innerHTML =
    "Found " + data.length + " Elements. Your input was interpreted as:";

  //Display interpreted Results
  document.getElementById("readResult").innerHTML = displayResult(
    data,
    maxToDisplay
  );

  //Show the table
  document.getElementById("tableContainer").style.display = "block";

  //Show the output box
  document.getElementById("outputPreviewContainer").style.display = "block";
  //Show contents of the output box.
  document.getElementById("outputPreview").innerHTML = displayResult(
    data.slice().sort(function (a, b) {
      return a - b;
    }),
    maxToDisplay
  );

  //Build the table
  tableBuilder(data);
}

//Calls various sorting functions and records their performance, then updates table elements.
function tableBuilder(data) {
  table = document.getElementById("table");

  start = performance.now();
  quickSort(data.slice(), 0, data.length);
  table.rows[1].cells[3].innerHTML = timeFormat(performance.now() - start);

  start = performance.now();
  mergeSort(data.slice());
  table.rows[2].cells[3].innerHTML = timeFormat(performance.now() - start);

  start = performance.now();
  heapSort(data.slice());
  table.rows[3].cells[3].innerHTML = timeFormat(performance.now() - start);

  start = performance.now();
  bubbleSort(data.slice());
  table.rows[4].cells[3].innerHTML = timeFormat(performance.now() - start);

  start = performance.now();
  selectionSort(data.slice());
  table.rows[5].cells[3].innerHTML = timeFormat(performance.now() - start);

  start = performance.now();
  insertionSort(data.slice());
  table.rows[6].cells[3].innerHTML = timeFormat(performance.now() - start);

  //Check to see if counting sort is applicable on the dataset (pos integers only)
  if (!data.some((v) => v < 0)) {
    start = performance.now();
    countingSort(data.slice());
    table.rows[7].cells[3].innerHTML = timeFormat(performance.now() - start);
  } else {
    table.rows[7].cells[3].innerHTML = "N/A - Positive Int Only";
  }

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
  

  if (!data.some((v) => v < 0)) {
    console.log("CS");
    console.log(countingSort(data.slice()));
  }*/
}

//Display a result from an object array, in a formatted shortened string.
function displayResult(
  data,

  maxToDisplay
) {
  let outputString = "";
  for (let i = 0, max = Math.min(data.length, maxToDisplay); i < max; i++) {
    outputString += data[i] + ", ";
  }

  if (data.length > maxToDisplay) outputString += " .....";

  return outputString;
}

//Format time into a string, in either nanoseconds, milliseconds or seconds.
function timeFormat(input) {
  if (input >= 1000) {
    return (input / 1000).toFixed(1) + " s";
  }
  if (input > 1) {
    return input.toFixed(1) + " ms";
  }
  return (input * 1000).toFixed(1) + " ns";
}

function countingSort(data) {
  let min = Math.min.apply(null, data);
  let max = Math.max.apply(null, data);
  let j = 0,
    length = data.length,
    count = [];

  for (let i = min; i <= max; i++) {
    count[i] = 0;
  }

  for (let i = 0; i < length; i++) {
    count[data[i]] += 1;
  }

  for (let i = min; i <= max; i++) {
    while (count[i] > 0) {
      data[j] = i;
      j++;
      count[i]--;
    }
  }

  return data;
}

function heapSort(data) {
  data = buildMaxHeap(data);

  last = data.length - 1;

  while (last > 0) {
    swapElements(data, 0, last);

    data = heapify(data, 0, last);

    last--;
  }
  return data;
}

function heapify(data, i, max) {
  var index, l, r;

  while (i < max) {
    index = i;

    l = 2 * i + 1;
    r = 2 * i + 2;

    if (l < max && data[l] > data[index]) {
      index = l;
    }
    if (r < max && data[r] > data[index]) {
      index = r;
    }
    if (index == i) {
      return data;
    }

    swapElements(data, i, index);
    i = index;
  }
  return data;
}

function buildMaxHeap(data) {
  var i;
  i = data.length / 2 - 1;
  i = Math.floor(i);

  while (i >= 0) {
    data = heapify(data, i, data.length);
    i -= 1;
  }
  return data;
}

function bubbleSort(data) {
  let length = data.length;
  let swapped = true;
  while (swapped) {
    swapped = false;
    for (let i = 0; i < length - 1; i++) {
      if (data[i] > data[i + 1]) {
        swapElements(data, i, i + 1);
        swapped = true;
      }
    }
  }

  return data;
}

//To allow shorter method signature for above function call
function quickSort(data) {
  return quickSortInternal(data, 0, data.length);
}

function quickSortInternal(data, low, high) {
  let index;
  if (data.length > 1) {
    index = quickSortPartition(data, low, high);

    if (low < index - 1) {
      quickSortInternal(data, low, index - 1);
    }
    if (index < high) {
      quickSortInternal(data, index, high);
    }
  }
  return data;
}

//Simulates rotating elements around a pivot based on element value
function quickSortPartition(data, low, high) {
  let pivot = data[Math.floor((low + high) / 2)];
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
  for (let i = 1, length = data.length; i < length; i++) {
    let key = data[i];
    let j = i - 1;
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

  let center = Math.floor(data.length / 2);

  return merge(mergeSort(data.slice(0, center)), mergeSort(data.slice(center)));
}

//Merges two lists together in an ordered fashion
function merge(left, right) {
  let result = [],
    li = 0,
    ri = 0;

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
  let length = data.length;

  for (let i = 0; i < length; i++) {
    let min = i;
    for (let j = i + 1; j < length; j++) {
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

//Helper function to swap two elements in an array  by reference
function swapElements(data, a, b) {
  temp = data[a];
  data[a] = data[b];
  data[b] = temp;
}
