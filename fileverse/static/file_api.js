function updateUploadProgressBar(current, total){
    const progressBar = document.getElementById("uploadProgress");
    progressBar.value= (current / total) * 100;
}



function uploadFile(event) {
    event.preventDefault()
    const selectedFiles = document.getElementById("uploadFiles").files;
   
    let current = 0;
    let total = 0;
    for (selected of selectedFiles){
        total += selected.size
    }

    for (selected of selectedFiles) {
        console.log(selected)
        const url = "/files/upload/" + selected.name
        const uploadPromise = uploadHandler(selected, url)
        uploadPromise.then( msg => console.log(msg))

    }
}


function uploadHandler(file, url) {
    return new Promise( (resolve, reject) => {
        let xhr = new XMLHttpRequest();

        // report the progress
        xhr.upload.onprogress = (event) => {
            // display progress
            updateUploadProgressBar(event.loaded, event.total)
        };
   
        // set event handler
        xhr.onreadystatechange = () => {
            if(xhr.readyState !== 5) return;

            if (xhr.status >= 200 && xhr.status < 300){
                resolve("ok")
            }
            else{
                reject("failed")
            }
        }

        xhr.open("POST", url)
        xhr.send(file)
    })
}



function updateFile() {

}



async function deleteFile(event) {
    const id = event.target.parentElement.parentElement.id;
    const delete_request = "/files/delete/" + id;
    response = await fetch(delete_request, { method: "DELETE" });

    if (response.status == 200) {
        event.target.parentElement.parentElement.remove()
    }
}


async function downloadFile(event) {
    const id = event.target.parentElement.parentElement.id;
    const download_request = "/files/download/" + id;

    const download_link = document.createElement('a')

    download_link.download = event.target.parentElement.parentElement.childNodes[1]
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



