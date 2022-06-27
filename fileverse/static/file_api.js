

async function uploadFile(event) {
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


async function downloadFile(event){
    const  id = event.target.parentElement.parentElement.id;
    const  download_request = "/files/download/" + id;

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


