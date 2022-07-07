
function uploadFile(event) {
    event.preventDefault()

    const selectedFiles = document.querySelector(".drop-zone__input").files;
    
    for (selected of selectedFiles) {
        const promise = uploadHandler(selected, `files/upload/${selected.name}`);
        promise.then((result) => {
            const contextMenu = document.getElementById("context-menu");
            const newFileEntry = [updateFileEntry(result.id, result.name, result.date, result.size)]
            highlightLeftClick(newFileEntry)
            customizeContextMenu(newFileEntry, contextMenu)
            updateHighlight(newFileEntry, contextMenu)

        }).catch((result) => console.log(result))
    }
    
}

function uploadHandler(file, url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        // report the progress
        xhr.upload.onprogress = event => updateUploadProgressBar(event.loaded, event.total, file.name);
        
        let date = new Date();
        xhr.upload.onerror = () => reject("error")

        xhr.onreadystatechange = () => {
            if (xhr.readyState == XMLHttpRequest.DONE){
                resolve({
                    id: xhr.responseText,
                    name: file.name, 
                    size: file.size, 
                    date: date.toLocaleString()
                });
            }
        }
        /*
        xhr.upload.onload = (event) => {
            console.log(event)
            resolve({
                id: xhr.responseText,
                name: file.name, 
                size: file.size, 
                date: date.toLocaleString()
            });
        }
        */
        
        xhr.open("POST", url)
        xhr.send(file)
    })
}

function updateFile() {
}

async function deleteFile(id, entry) {
    const delete_request = "/files/delete/" + id;
    response = await fetch(delete_request, { method: "DELETE" });

    if (response.status == 200) {
        entry.remove()
    }
}

async function downloadFile(id) {
    const download_request = "/files/download/" + id;
    const download_link = document.createElement('a')
    download_link.href = download_request
    download_link.click()
}

// Update the progress bar UI
function updateUploadProgressBar(current, total, filename) {
    const elements = document.querySelectorAll(".detail__name")
    
    for (element of elements){
        if (element.textContent === filename) {
            const progressBar = element.nextElementSibling;
            progressBar.value = (current / total) * 100;
            break;
        }
    }    
}

