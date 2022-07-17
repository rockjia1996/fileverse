function uploadHandler(cancelButton, url, file) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = event => {
            updateUploadProgressBar(selected.name, event.loaded, event.total);
        }

        xhr.upload.onerror = () => reject("error")
        
        xhr.onreadystatechange = () => {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                let date = new Date();
                resolve({
                    id: xhr.responseText,
                    name: selected.name,
                    size: selected.size,
                    date: date.toLocaleString()
                });
            }
        }

        xhr.open("POST", url);
        xhr.send(file);

        cancelButton.onclick = () => xhr.abort();
    })
}