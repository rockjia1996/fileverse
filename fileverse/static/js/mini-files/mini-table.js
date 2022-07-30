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

    document.querySelector(".table-options-icon").onclick = () => {
        const menu = document.querySelector(".table-options")

        if (menu.classList.contains("display-active")) {
            menu.classList.remove("display-active");
            menu.classList.add("display-disable");
        }
        else {
            menu.classList.remove("display-disable")
            menu.classList.add("display-active");
        }

        const downloadSelected = menu.children[0];
        const deleteSelected = menu.children[1];
        const selectAll = menu.children[2];
        const deselectAll = menu.children[3];

        downloadSelected.onclick = () => {
            this.entries.forEach(entry => {
                if (entry.selected){

                }
            });
            menu.classList.replace("display-active", "display-disable");
        }

        deleteSelected.onclick = () => {

            
        }


    }







    this.addFileEntry = (entry) => {
        this.entries.push(entry);
        const tableBody = this.tableHTML.children[1];
        tableBody.appendChild(entry.getHTML())
    }

    this.removeFileEntry = (id) => {
        const index = this.entries.find(entry => entry.details.id === id);
        if (index === -1) return;
        const entry = this.entries.splice(index, 1)[0];
        entry.removeSelf();
    }
}

function FileTableEntry(id, filename, date, size) {
    this.details = { id, filename, date, size }
    this.entryHTML = null;
    this.selected = false;

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

        infoButton.onclick = () => {
            alert(`id = ${id}, filename =  ${filename}, size =  ${size}`)
        }

        tableRow.onclick = (event) => {
            // If user clicks the actions on the right most cell, do nothing.
            if (event.target.tagName === "svg") return;
            if (this.selected) {
                this.selected = false;
                tableRow.classList.remove("active-row")
                return;
            }
            this.selected = true;
            tableRow.classList.add("active-row");
        }

        return tableRow;
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



