initDropzone()

function initDropzone(){

    const inputElement = document.querySelector(".drop-zone__input");
    const dropZoneElement = document.querySelector(".drop-zone");
    
    inputElement.addEventListener("change", e => {
        const promises = [];

        for (selected of inputElement.files) {
                const table = document.getElementById("upload-table").children[1]
                const row = addTableRow(table, createUploadEntryArray(selected.name))
                const cancelButton = row.children[2].children[0];
                const url = `files/upload/${selected.name}`;
    
                uploadHandler(cancelButton, url, selected);
                
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
                // TO DO: implement the process of each file
                console.log(selected.name)
            }
    
        }
        dropZoneElement.classList.remove("drop-zone--over");
    })



}



function getSelectedFiles(){
    const dropzoneFiles = document.querySelector(".drop-zone");

}


