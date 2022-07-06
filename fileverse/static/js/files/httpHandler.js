

function postRequestHandler(url, data, config){
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.onprogress = (event) => {

        }

        xhr.onload = event => resolve(event)
        xhr.onerror = event => reject(event)
        xhr.onabort = event => reject(event)
        
        xhr.open("POST", url);
        xhr.send(data);

    })

}


