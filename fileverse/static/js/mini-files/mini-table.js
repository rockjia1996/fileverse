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
    const fileId       = document.createTextNode(id);
    const filename = document.createTextNode(name);
    const modified = document.createTextNode(date);
    const fileSize = document.createTextNode(size);

    return [fileId, filename, modified, fileSize];
}

function updateUploadProgressBar(name, loaded, total){
    const uploadEntries = document.getElementById("upload-table").children[1].children;


    for (entry of uploadEntries){
        const filename = entry.children[0].textContent;
        if (filename === name){
            const progressBar = entry.children[1].children[0];
            progressBar.value = (loaded / total) * 100;
        }
    }



}