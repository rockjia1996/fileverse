function uploadHandler(cancelButton, url, file) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = event => {
            updateUploadProgressBar(file.name, event.loaded, event.total);
            updateUploadTableButton(file.name, event.loaded, event.total);
        }

        xhr.upload.onerror = () => reject("error")

        xhr.onreadystatechange = () => {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                let date = new Date().toLocaleString('en-US', { timeZone: 'UTC' });
                resolve({
                    id: xhr.responseText,
                    name: file.name,
                    size: file.size,
                    date: date
                });
            }
        }

        xhr.open("POST", url);
        xhr.send(file);

        cancelButton.onclick = () => xhr.abort();
    })
}

function downloadHandler(id) {
    const downloadRequest = "/files/download/" + id;
    const downloadLink = document.createElement('a');
    downloadLink.href = downloadRequest;
    downloadLink.click();
}

async function deleteHandler(id) {
    const deleteRequest = "/files/delete/" + id;
    const response = await fetch(deleteRequest, { method: "DELETE" });

    return response.status;
}


function downloadFiles(idArray) {
    console.log(idArray)
    const url = "/files/download_files";

    fetch(url, {
        method: "POST",
        body: JSON.stringify({'fileIDs': idArray}),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        console.log(response)
        return response.blob();
    }).then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "downloads.zip"
        link.click();
        window.URL.revokeObjectURL(url)
    })




}