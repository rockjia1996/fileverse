
const inputElement = document.querySelector(".drop-zone__input");
const dropZoneElement = document.querySelector(".drop-zone");

inputElement.addEventListener("change", e => {
    for (selected of inputElement.files) {
        addUploadFileEntry(selected.name)
    }
} )


dropZoneElement.addEventListener("dragover", e => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
});

dropZoneElement.addEventListener("click", e => {
    inputElement.click();
})

dropZoneElement.addEventListener("dragleave", e => {
        dropZoneElement.classList.remove("drop-zone--over")
} )

dropZoneElement.addEventListener("dragend", e => {
    dropZoneElement.classList.remove("drop-zone--over")
} )

dropZoneElement.addEventListener("drop", e => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;


        for (selected of inputElement.files) {
            addUploadFileEntry(selected.name)
        }

    }
    dropZoneElement.classList.remove("drop-zone--over");
})


function addUploadFileEntry(filename) {
    let detail = document.createElement("div");
    let detailName = document.createElement("span");
    let detailProgress = document.createElement("progress");
    let detailCancel = document.createElement("button");
    let detailCancelIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    detail.className = "detail";
    detailName.className = "detail__name";
    detailProgress.className = "detail__progress";
    detailCancel.className = "detail__cancel";
    detailCancelIcon.classList.add("cancel-icon");

    detail.appendChild(detailName)
    detail.appendChild(detailProgress)
    detail.appendChild(detailCancel)

    detailCancel.appendChild(detailCancelIcon)

    detailName.textContent = filename;
    detailProgress.max = "100";
    detailProgress.value = "0";

    document.querySelector(".upload-details").appendChild(detail)


    detailCancel.onclick = () => alert("abort")

}

function removeUploadFileEntries(){
    let details = document.querySelector(".upload-details");

    let removeChildren = [];
    for (child of details.children){
        const currentProgress = child.children[1].value;
        if (currentProgress === 100)
            removeChildren.push(child)
    }

    for (let i = 0; i < removeChildren.length; i++)
        details.removeChild(removeChildren[i])

}