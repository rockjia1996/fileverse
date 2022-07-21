function addTableRow(table, cells){
    let newRow = table.insertRow(0);
    let numOfCells = cells.length;

    for (let i = 0; i < numOfCells; i++){
        currentCell = newRow.insertCell(i);
        currentCell.appendChild(cells[i]);
    }
    return newRow;
}

function createUploadEntryArray(name){
    const filename = document.createTextNode(name);
    const progressBar = document.createElement("progress");
    const cancelButton = document.createElement("button");

    progressBar.max = "100";
    progressBar.value = "0";
    cancelButton.appendChild(document.createTextNode("Cancel"))

    return [filename, progressBar, cancelButton]
}

function createFileEntryArray(id, name, date, size){
    const fileId   = document.createTextNode(id);
    const filename = document.createTextNode(name);
    const modified = document.createTextNode(date);
    const fileSize = document.createTextNode(autoFileSizeUnit(size));

    return [fileId, filename, modified, fileSize];
}

function updateUploadProgressBar(name, loaded, total){
    const uploadEntries = document.getElementById("upload-table").children[1].children;

    for (entry of uploadEntries){
        const filename = entry.children[0].textContent;
        if (filename === name){
            const progressBar = entry.children[1].children[0];
            progressBar.value = (loaded / total) * 100;
            break;
        }
    }
}

function updateUploadTableButton(name, loaded, total){
    const uploadEntries = document.getElementById("upload-table").children[1].children;
    if (loaded !== total) return;

    for (entry of uploadEntries){
        const filename = entry.children[0].textContent;
        if (filename === name){
            const cancelButton = entry.children[2]
            cancelButton.children[0].textContent = "Clear";
            cancelButton.onclick = () => {
                entry.remove();

            } 
            break;
        }
    }
}


function autoFileSizeUnit(size){
    const isB = (size) => size < 2**10 ? true : false;
    const isKB = (size) => size >= 2**10 && size < 2**20 ? true : false;
    const isMB = (size) => size >= 2**20 && size < 2**30 ? true : false;
    const isGB = (size) => size >= 2**30 ? true : false;


    if (isB(size))  return `${size} byte`;
    if (isKB(size)) return `${Math.round((size*100) / 2**10) / 100} Kb`;
    if (isMB(size)) return `${Math.round((size*100) / 2**20) / 100} Mb`;
    if (isGB(size)) return `${Math.round((size*100) / 2**30) / 100} Gb`;
}
