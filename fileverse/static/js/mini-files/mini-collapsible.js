
initCollapsibleUploadTable();

function initCollapsibleUploadTable(){
    const collapsible = document.querySelector(".collapsible");
    const content = collapsible.nextElementSibling;

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