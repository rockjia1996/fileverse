const contextMenu = document.getElementById("context-menu");
//const scope = document.querySelector("body");
//const scope = document.querySelector(".file-table__body")
const scopes = document.querySelectorAll(".file-table__row")

document.querySelector(".file-table")
    .firstElementChild
    .addEventListener("contextmenu", event => {
        event.preventDefault();
    })



// Left click hightlight file entry
scopes.forEach(scope => {
    scope.addEventListener("click", event => {
        event.preventDefault();
        const rows = event.target.parentElement.parentElement.children;

        for (row of rows)
            row.classList.remove("active-row")

        event.target.parentElement.classList.add("active-row")
    })
});

// Right click pops context menu
scopes.forEach(scope => {
    scope.addEventListener("contextmenu", event => {
        event.preventDefault();
        const { clientX: mouseX, clientY: mouseY } = event;
        contextMenu.style.top = `${mouseY}px`;
        contextMenu.style.left = `${mouseX}px`;
        contextMenu.classList.add("visible");

        const rows = event.target.parentElement.parentElement.children;


        for (row of rows)
            row.classList.remove("active-row")
        event.target.parentElement.classList.add("active-row");

        const entry = event.target.parentElement;
        const fileId = entry.id;
        const options = document.getElementById("context-menu").children;

    console.log(entry.id)
        options[0].addEventListener("click", () => downloadFile(fileId) )
        options[1].addEventListener("click", () => deleteFile(fileId, entry) )
    
    })
});

scopes.forEach(scope => {
    scope.addEventListener("click", e => {
        if (e.target.offsetParent != contextMenu) {
            contextMenu.classList.remove("visible");
        }
    })
})

scopes.forEach(scope => {

    scope.addEventListener("contextmenu", (event) => {
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


/*
const normalizePosition = (mouseX, mouseY) => {
    const {
        left: scopeOffsetX,
        top: scopeOffsetY,
    } = scope.getBoundingClientRect();

    const scopeX = mouseX - scopeOffsetX;
    const scopeY = mouseY - scopeOffsetY;

    const outOfBoundsOnX = scopeX + contextMenu.clientWidth > scope.clientWidth;    
    const outOfBoundsOnY = scopeY + contextMenu.clientHeight > scope.clientHeight;

    let normalizedX = mouseX;
    let normalizedY = mouseY;

    if (outOfBoundsOnX){
        normalizedX = scopeOffsetX + scope.clientWidth - contextMenu.clientWidth;
    }

    if (outOfBoundsOnY){
        normalizedY = scopeOffsetY + scope.clientHeight - contextMenu.clientHeight;
    }
    return { normalizedX, normalizedY};
}

scope.addEventListener("contextmenu", event =>{
    event.preventDefault();

    const { offsetX: mouseX, offsetY: mouseY } = event;
    const { normalizedX, normalizedY } = normalizePosition(mouseX, mouseY);

    contextMenu.style.top = `${normalizedY}px`;
    contextMenu.style.left = `${normalizedX}px`;

    contextMenu.classList.remove("visible");

    setTimeout(() => {
        contextMenu.classList.add("value");
    })
})

*/