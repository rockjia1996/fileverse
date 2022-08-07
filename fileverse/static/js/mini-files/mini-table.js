
const fileTable = new FileTable(document.getElementById("file-table"));
initFileTable(fileTable);

const searchBar = document.querySelector(".search-bar");
const searchContent = searchBar.children[0]
const searchCancel = searchBar.children[1];
const searchButton = searchBar.children[2]

searchCancel.onclick = () => {
    searchContent.value = "";

    const entries = fileTable.entries;
    entries.forEach(entry => {
        entry.entryHTML.classList.remove("display-disable")
    })
}

searchButton.onclick = () => {
    const searchName = searchContent.value;
    const entries = fileTable.entries;
    entries.forEach(entry => {
        const filename = entry.details.filename;
        const result = filename.match(searchName)
        if (!result) {
            entry.entryHTML.classList.add("display-disable")
        }
        else {
            entry.entryHTML.classList.remove("display-disable")
        }
    })
}

function Pagination() {
    this.paginationHTML = document.querySelector(".pagination")
    this.pageButtons = [];
    this.current = 1;
    this.rows = 8;

    this.paginationHTML.classList.add("pagination");

    this.addPageButton = (pageNumber) => {
        const listItem = document.createElement("li");
        const pageButton = document.createElement("button");

        listItem.appendChild(pageButton)
        pageButton.textContent = pageNumber;
        this.pageButtons.push(pageButton);

        pageButton.onclick = () => {
            const total = fileTable.entries.length;
            const startIndex = (pageNumber - 1) * this.rows
            const endIndex = startIndex + (this.rows - 1) > total
                ? total - 1
                : startIndex + (this.rows - 1);

            console.log(`${startIndex} to ${endIndex}`)
            const fileEntries = fileTable.entries.slice(startIndex, endIndex + 1)
            const beforePage = fileTable.entries.slice(0, startIndex);
            const afterPage = fileTable.entries.slice(endIndex + 2);

            beforePage.forEach(entry => entry.entryHTML.style = "display: none;")
            afterPage.forEach(entry => entry.entryHTML.style = "display: none;")
            fileEntries.forEach(entry => entry.entryHTML.style = "display: table-row;")

            this.pageButtons.forEach(button => {
                if (button.classList.contains("active-page")) {
                    button.classList.remove("active-page")
                }
            })

            pageButton.classList.add("active-page")
            this.current = pageNumber;
        }


        this.paginationHTML.appendChild(listItem)
        this.pageButtons.push(listItem)
    }

    this.initPagination = () => {
        const numOfPages = Math.ceil(fileTable.entries.length / this.rows);
        const entries = fileTable.entries;
        this.pageButtons.forEach(button => {
            button.remove();
        })
        console.log(entries.length)
        for (let i = 0; i < numOfPages; i++) {
            this.addPageButton(i + 1)
        }

        this.current = 1;
        this.pageButtons[0].classList.add("active-page")


        const total = fileTable.entries.length;
        const startIndex = (1 - 1) * this.rows
        const endIndex = startIndex + (this.rows - 1) > total
            ? total - 1
            : startIndex + (this.rows - 1);

        console.log(`${startIndex} to ${endIndex}`)
        const fileEntries = fileTable.entries.slice(startIndex, endIndex + 1)
        const beforePage = fileTable.entries.slice(0, startIndex);
        const afterPage = fileTable.entries.slice(endIndex + 1);

        console.log(afterPage)
        beforePage.forEach(entry => entry.entryHTML.style = "display: none;")
        afterPage.forEach(entry => entry.entryHTML.style = "display: none;")
        fileEntries.forEach(entry => entry.entryHTML.style = "display: table-row;")
    }

}

const pagination = new Pagination();

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

            pagination.initPagination();
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
            const selectedID = [];
            this.entries.forEach(entry => {
                if (entry.selected) {
                    selectedID.push(entry.details.id)
                }
            });
            menu.classList.replace("display-active", "display-disable");
            downloadFiles(selectedID)
        }

        deleteSelected.onclick = () => {
            const remain = this.entries.filter(async (entry) => {
                if (entry.selected === false) {
                    return entry;
                }
                else {
                    entry.removeSelf();
                    await deleteHandler(entry.details.id)
                }
            });

            menu.classList.replace("display-active", "display-disable");
            this.entries = remain;
        }

        selectAll.onclick = () => {
            this.entries.forEach(entry => {
                if (!entry.selected) {
                    entry.getHTML().click();
                }
            })
            menu.classList.replace("display-active", "display-disable");
        }

        deselectAll.onclick = () => {
            this.entries.forEach(entry => {
                if (entry.selected) {
                    entry.getHTML().click();
                }
            })
            menu.classList.replace("display-active", "display-disable");
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
            showInfo(filename, this.autoFileSizeUnit(size), date)
        }

        tableRow.onclick = (event) => {
            // If user clicks the actions on the right most cell, do nothing.
            if (event.target.tagName === "svg") return;
            if (event.target.tagName === "button") return;

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



function Directory(){
    this.root = null;
    this.currentPath = [];

    this.createFolder = () => {

    }

    this.deleteFolder = () => {

    }

    this.moveFolder = () => {

    }

    this.changeDirectory = () => {

    }
}

function Entry() {
    this.type = null;
    this.parent = null;
    this.children = null;
    this.content = null;


    this.setType = () => {

    }

    this.setParent = () => {

    }


    




}