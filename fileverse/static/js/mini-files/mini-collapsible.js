
initCollapsibleUploadTable();
initCollapsibleFileTable();

function initCollapsibleUploadTable(){
    const content = document.querySelector("#upload-table");
    const collapsible = content.previousElementSibling;

    content.style.display = "none";

    collapsible.addEventListener("click", () => {
        collapsible.classList.toggle("active");
        const content = collapsible.nextElementSibling;


        if (content.style.display === "none")
            content.style.display = "";
        else
            content.style.display = "none";
    });
}

function initCollapsibleFileTable(){
    const content = document.querySelector("#file-table");
    const collapsible = content.previousElementSibling;


    content.style.display = "none";

    collapsible.addEventListener("click", () => {
        collapsible.classList.toggle("active");
        const content = collapsible.nextElementSibling;


        if (content.style.display === "none")
            content.style.display = "";
        else
            content.style.display = "none";
    });
}