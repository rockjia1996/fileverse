
const inputElement = document.querySelector(".drop-zone__input");
const dropZoneElement = document.querySelector(".drop-zone");

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

    detail.className = "detail";
    detailName.className = "detail__name";
    detailProgress.className = "detail__progress";
    detailCancel.className = "detail__cancel";

    detail.appendChild(detailName)
    detail.appendChild(detailProgress)
    detail.appendChild(detailCancel)

    detailName.textContent = filename;
    detailProgress.max = "100";
    detailProgress.value = "0";
    detailCancel.textContent = "Cancel";

    document.querySelector(".upload-details").appendChild(detail)
}