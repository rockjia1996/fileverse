initDropzone()
function initDropzone() {
    const inputElement = document.querySelector(".drop-zone__input");
    const dropZoneElement = document.querySelector(".drop-zone");
    
    inputElement.addEventListener("change", e => {
        const table = document.querySelector(".upload-table-container");
        for (selected of inputElement.files) {

            // Check repeated filename 
            const filename = selected.name;




            const uploadEntry = new UploadFile(selected);
            const uploadEntryUI = uploadEntry.uploadFileUI;
            table.appendChild(uploadEntryUI.getHTML());



            const promise = uploadEntry.initUpload();
            promise.then(
                details => {
                    let formattedDate = new Date(details.date);
                    formattedDate = formattedDate.toLocaleString();
                    const fileTableEntry = new FileTableEntry(
                        details.id,
                        details.filename,
                        formattedDate,
                        details.size
                    )
                    fileTable.addFileEntry(fileTableEntry)
                    pagination.initPagination();

                }
            )

        }
    })

    dropZoneElement.addEventListener("dragover", e => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
    });

    dropZoneElement.addEventListener("click", e => {
        inputElement.click();
    })

    dropZoneElement.addEventListener("dragleave", e => {
        dropZoneElement.classList.remove("drop-zone--over")
    })

    dropZoneElement.addEventListener("dragend", e => {
        dropZoneElement.classList.remove("drop-zone--over")
    })

    dropZoneElement.addEventListener("drop", e => {
        e.preventDefault();
        if (e.dataTransfer.files.length) {
            inputElement.files = e.dataTransfer.files;


            for (selected of inputElement.files) {
                // TO DO: implement the process of each file
                console.log(selected.name)
            }

        }
        dropZoneElement.classList.remove("drop-zone--over");
    })



}




function DropZone(dropzoneHTML) {
    this.dropzoneHTML = dropzoneHTML;

}

