function addTableRow(table, cells){
    let newRow = table.insertRow(0);
    let numOfCells = cells.length;

    for (let i = 0; i < numOfCells; i++){
        currentCell = newRow.insertCell(i);
        currentCell.appendChild(document.createTextNode(cells[i]));
    }
}