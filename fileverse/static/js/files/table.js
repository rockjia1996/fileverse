initTable();

function initTable() {
    const contextMenu = document.getElementById("context-menu");
    const scopes = document.querySelectorAll(".file-table__row");

    // Prevent the default behavior, if user right click out side the file enties.
    document.querySelector(".file-table")
        .firstElementChild
        .addEventListener("contextmenu", event => event.preventDefault());

    highlightLeftClick(scopes);
    customizeContextMenu(scopes, contextMenu);
    updateHighlight(scopes, contextMenu);
    openContextMenuInNewLocation(scopes, contextMenu);
}

//  Highlight the file entry while left click
function highlightLeftClick(entries) {
    entries.forEach(entry => {
        entry.addEventListener("click", event => {
            // Note that event.target is the a <td> cell, so its parent is row
            event.preventDefault();
            const rows = event.target.parentElement.parentElement.children;

            for (row of rows)
                row.classList.remove("active-row");

            event.target.parentElement.classList.add("active-row")
        });


    })
}

// Customize right click context menu
function customizeContextMenu(entries, contextMenu) {
    entries.forEach(entry => {
        entry.addEventListener("contextmenu", event => {

            //const contextMenu = document.getElementById("context-menu");
            event.preventDefault();

            const { clientX: mouseX, clientY: mouseY } = event;
            contextMenu.style.top = `${mouseY}px`;
            contextMenu.style.left = `${mouseX}px`;
            contextMenu.classList.add("visible");
            
            /* 
                Note that event.target is  <td> that is clicked on, 
                event.target.parentElement is <tr>
            */
            const rows = event.target.parentElement.parentElement.children;
    
            for (row of rows)
                row.classList.remove("active-row");
    
            event.target.parentElement.classList.add("active-row");
    
            const entry = event.target.parentElement;
            const fileId = entry.id;
            const options = document.getElementById("context-menu").children;
    
            options[0].onclick = () => {
                downloadFile(fileId);
                document.getElementById("context-menu").classList.remove("visible")
            }
    
            options[1].onclick = () => {
                deleteFile(fileId, entry)
                document.getElementById("context-menu").classList.remove("visible")
            }
        });
    });
}

// Close the context menu if user left click outside the menu
function updateHighlight(entries, contextMenu) {
    entries.forEach(entry => {
        entry.addEventListener("click", e => {
            if (e.target.offsetParent != contextMenu) {
                contextMenu.classList.remove("visible");
            }
        });
    });
}

// Right click in another area 
function openContextMenuInNewLocation(entries, contextMenu) {
    entries.forEach(entry => {
        entry.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            const { clientX: mouseX, clientY: mouseY } = event;
            contextMenu.style.top = `${mouseY}px`;
            contextMenu.style.left = `${mouseX}px`;
            contextMenu.classList.remove("visible");
            setTimeout(() => {
                contextMenu.classList.add("visible");
            });
        })
    })
}

// Update the file table UI
function updateFileEntry(id, filename, date, size){
    const table = document.querySelector(".file-table__body");

    const newEntry = table.insertRow(0);
    newEntry.id = id;
    
    const filenameCell = newEntry.insertCell(0)
    const dateCell = newEntry.insertCell(1);
    const sizeCell = newEntry.insertCell(2);

    filenameCell.appendChild(document.createTextNode(filename));
    dateCell.appendChild(document.createTextNode(date));
    sizeCell.appendChild(document.createTextNode(size));

    return newEntry;

}