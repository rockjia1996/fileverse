
function initTable(){
    const contextMenu = document.getElementById("context-menu");
    const scopes = document.querySelectorAll(".file-table__row");

    // Prevent the default behavior, if user right click out side the file enties.
    document.querySelector(".file-table")
            .firstElementChild
            .addEventListener("contextmenu", event => event.preventDefault());

    highlightLeftClick(scopes);

}


//  Highlight the file entry while left click
function highlightLeftClick(entries){
    entries.addEventListener("click", event => {
        // Note that event.target is the a <td> cell, so its parent is row
        event.preventDefault();
        const rows = event.target.parentElement.parentElement.children;

        for (row of rows)  
            row.classList.remove("active-row");
        
        event.target.parentElement.classList.add("active-row")
    });
}


// Customize right click context menu
function customizeContextMenu(entries){
    
}