/*
initFileTableContextMenu();

function initFileTableContextMenu() {
    const contextMenu = document.getElementById("file-table-context-menu");
    const scopes = document.querySelectorAll("#file-table tbody tr");

    document.getElementById("file-table")
        .firstElementChild
        .addEventListener("contextmenu", event => event.preventDefault());


    highlightFileTableLeftClick(scopes);
    customizeFileTableContextMenu(scopes, contextMenu);
    updateHighlight(scopes, contextMenu);
    openContextMenuInNewLocation(scopes, contextMenu);

}

function addFileEntryContextMenu(entry){
    const contextMenu = document.getElementById("file-table-context-menu");
    const scopes = [entry];

    highlightFileTableLeftClick(scopes);
    customizeFileTableContextMenu(scopes, contextMenu);
    updateHighlight(scopes, contextMenu);
    openContextMenuInNewLocation(scopes, contextMenu);
}

function highlightFileTableLeftClick(entries) {
    entries.forEach(entry => {
        entry.addEventListener("click", event => {
            // Note that event.target is the a <td> cell, so its parent is row
            event.preventDefault();
            const rows = event.target.parentElement.parentElement.children;

            for (row of rows)
                row.classList.remove("active-row");

            event.target.parentElement.classList.add("active-row");
            console.log(event)
        });
    })

}

function customizeFileTableContextMenu(entries, contextMenu) {
    entries.forEach(entry => {
        entry.addEventListener("contextmenu", event => {
            event.preventDefault();

            const { clientX: mouseX, clientY: mouseY } = event;
            contextMenu.style.top = `${mouseY}px`;
            contextMenu.style.left = `${mouseX}px`;
            contextMenu.classList.add("visible");


            const rows = event.target.parentElement.parentElement.children;

            for (row of rows)
                row.classList.remove("active-row");

            event.target.parentElement.classList.add("active-row");

            const entry = event.target.parentElement;
            const fileId = entry.children[0].textContent;
            const options = document.getElementById("file-table-context-menu").children;


            options[0].onclick = () => {
                downloadHandler(fileId);
                document.getElementById("file-table-context-menu").classList.remove("visible")
            }

            options[1].onclick = () => {
                deleteHandler(fileId)
                entry.remove();
                document.getElementById("file-table-context-menu").classList.remove("visible")
            }
        });


    })
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

function FileTableContextMenu(options){
    this.menuHTML = null;
    this.options = options;

    this.createHTML = () => {
        const menu = document.createElement("div");

        this.options.forEach((option) => {
            const button = document.createElement("button");
            button.textContent = option.name;
            button.onclick = option.action;
            menu.appendChild(button);
        });

        menu.classList.add("context-menu")
        this.menuHTML = menu;
    }

    this.addOption = (option) => {
        this.options.push(option);
        this.createHTML();
    }

    this.getHTML = () => {
        if (this.menuHTML)
            return this.menuHTML;
        this.createHTML();
        return this.menuHTML;
    }

}

*/