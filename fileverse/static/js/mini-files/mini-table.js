const fileTable = new FileTable(document.getElementById("file-table"));
initFileTable(fileTable);
function initFileTable(fileTable) {
    const url = "/files/username";
    fetch(url, { method: "GET" })
        .then(response => response.json())
        .then(responseJSON => {
            const fileList = responseJSON.fileList;
            fileList.forEach(details => {
                const { id, filename, date, size } = details;

                let formattedDate = new Date(date);
                formattedDate = formattedDate.toLocaleString();

                const entry = new FileTableEntry(id, filename, formattedDate, size);
                fileTable.addFileEntry(entry);
            })
        })
        .catch(error => console.log(error));


}

function FileTable(tableHTML) {
    this.tableHTML = tableHTML;
    this.entries = [];

    this.addFileEntry = (entry) => {
        this.entries.push(entry);
        this.addFileEntryHTML(entry.getHTML());
    }

    this.removeFileEntry = (id) => {
        const index = this.entries.find(entry => entry.details.id === id);
        if (index === -1) return;
        const entry = this.entries.splice(index, 1)[0];
        entry.removeSelf();
    }

    this.addFileEntryHTML = (entryHTML) => {
        const tableBody = this.tableHTML.children[1];
        tableBody.appendChild(entryHTML);
    }
}

function FileTableEntry(id, filename, date, size) {
    this.details = { id, filename, date, size }
    this.entryHTML = null;

    this.createHTML = () => {
        const { id, filename, date, size } = this.details;
        const tableRow = document.createElement("tr");
        const cellID = document.createElement("td");
        const cellFilename = document.createElement("td");
        const cellDate = document.createElement("td");
        const cellSize = document.createElement("td");
        const cellActions = document.createElement("td");
        const downloadButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        const infoButton = document.createElement("button");

        tableRow.appendChild(cellID);
        tableRow.appendChild(cellFilename);
        tableRow.appendChild(cellDate);
        tableRow.appendChild(cellSize);
        tableRow.appendChild(cellActions);
        cellActions.appendChild(downloadButton);
        cellActions.appendChild(deleteButton);
        cellActions.appendChild(infoButton)

        cellID.textContent = id;
        cellFilename.textContent = filename;
        cellDate.textContent = date;
        cellSize.textContent = this.autoFileSizeUnit(size);
        downloadButton.appendChild(createDownloadIcon());
        deleteButton.appendChild(createDeleteIcon());
        infoButton.appendChild(createInfoIcon());

        downloadButton.onclick = () => {
            downloadHandler(id);
        }

        deleteButton.onclick = () => {
            deleteHandler(id);
            tableRow.remove();
        }

        return tableRow;
    }

    this.updateDetails = (key, value) => {
        this.details[key] = value;
    }

    this.updateEntryHTML = () => {
        this.entryHTML = this.createHTML();
    }

    this.getHTML = () => {
        if (this.entryHTML)
            return this.entryHTML;

        this.entryHTML = this.createHTML();
        return this.entryHTML;
    }

    this.removeSelf = () => {
        this.entryHTML.remove();
    }

    this.autoFileSizeUnit = (size) => {
        const isB = (size) => size < 2 ** 10 ? true : false;
        const isKB = (size) => size >= 2 ** 10 && size < 2 ** 20 ? true : false;
        const isMB = (size) => size >= 2 ** 20 && size < 2 ** 30 ? true : false;
        const isGB = (size) => size >= 2 ** 30 ? true : false;


        if (isB(size)) return `${size} byte`;
        if (isKB(size)) return `${Math.round((size * 100) / 2 ** 10) / 100} Kb`;
        if (isMB(size)) return `${Math.round((size * 100) / 2 ** 20) / 100} Mb`;
        if (isGB(size)) return `${Math.round((size * 100) / 2 ** 30) / 100} Gb`;
    }
}

