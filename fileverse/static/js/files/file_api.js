function updateUploadProgressBar(current, total, filename) {
    console.log(document.querySelectorAll(".detail__name"))
    const elements = document.querySelectorAll(".detail__name")
    
    for (element of elements){
        if (element.textContent === filename) {
            const progressBar = element.nextElementSibling;
            progressBar.value = (current / total) * 100;
            break;
        }
    }    
}

function uploadFile(event) {
    event.preventDefault()
    const selectedFiles = document.querySelector(".drop-zone__input").files;

    for (selected of selectedFiles) {
        console.log(selected)
        const url = "/files/upload/" + selected.name
        const uploadPromise = uploadHandler(selected, url)
        uploadPromise.then(msg => console.log(msg))
    }
}

function uploadHandler(file, url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        // report the progress
        xhr.upload.onprogress = (event) => {
            console.log(event)
            // display progress
            updateUploadProgressBar(event.loaded, event.total, file.name)
        };

        // set event handler
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 5) return;

            if (xhr.status >= 200 && xhr.status < 300) {
                resolve("ok")
            }
            else {
                reject("failed")
            }
        }

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

function getFileId(event) {
    let element = event.target

    if (element.name === "delete") {
        alert("onclick delete button, id = " + element.parentElement.parentElement.id)
    }

    if (element.name === "download") {
        alert("onclick download button, id =" + element.parentElement.parentElement.id)
    }
}


