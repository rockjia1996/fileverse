function uploadFile(event) {
    event.preventDefault()
    const selectedFiles = document.getElementById("uploadFiles").files;
    for (selected of selectedFiles) {
        console.log(selected)
        const url = "/files/upload/" + selected.name
        //const response = await fetch(url, { method: "post", body: selected })
        uploadHandler(selected, url)
        //console.log(response)
    }
}


function uploadHandler(file, url) {
    return new Promise( (resolve, reject) => {
        let xhr = new XMLHttpRequest();

        // report the progress
        xhr.upload.onprogress = (event) => {
            console.log(`Upload ${event.loaded} of ${event.total}`);
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



