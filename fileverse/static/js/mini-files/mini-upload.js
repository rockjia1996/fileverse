initUploadPopUp();

function initUploadPopUp() {
    const uploadButton = document.querySelector(".upload-button");
    uploadButton.onclick = () => {
        const uploadPopUp = document.querySelector(".upload-pop-up");
        const background = document.querySelector(".page-content");

        if (uploadPopUp.classList.contains("display-active")) {
            background.classList.remove("blur-active");
            uploadPopUp.classList.replace("display-active", "display-disable");

        }
        else {
            background.classList.add("blur-active");
            uploadPopUp.classList.replace("display-disable", "display-active");
        }
    };
}


function createSVGDoneIcon() {
    const xml = "http://www.w3.org/2000/svg"
    const svg = document.createElementNS(xml, "svg");
    const path1 = document.createElementNS(xml, "path");
    const path2 = document.createElementNS(xml, "path");

    svg.setAttributeNS(null, "viewBox", "0 0 24 24");
    svg.setAttributeNS(null, "width", "24px");
    svg.setAttributeNS(null, "height", "24px");
    svg.setAttributeNS(null, "fill", "#00c896");

    path1.setAttributeNS(null, "d", "M0 0h24v24H0V0z");
    path1.setAttributeNS(null, "fill", "none");
    path2.setAttributeNS(null, "d", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z")


    svg.appendChild(path1);
    svg.appendChild(path2);

    return svg;
}


function createUploadEntry() { }


function UploadXHR(url, method, file) {
    this.url = url;
    this.method = method;
    this.file = file;
    this.xhr = new XMLHttpRequest();

}

function HttpHandler() {
    this.xhr = null;

    this.abort = () => this.xhr.abort();
    this.get = (url, config) => { };
    this.post = (url, config) => {
        this.xhr = new XMLHttpRequest();

        if (config.responseType)
            this.xhr.responseType = config.responseType;

        if (config.onReadyStateChange)
            this.xhr.onreadystatechange = (event) => config.onReadyStateChange(this.xhr, event);


        if (config.onLoad)
            this.xhr.onload = (event) => config.onLoad(event);

        if (config.onAbort)
            this.xhr.onabort = (event) => config.onAbort(event);


        if (config.onUploadProgress)
            this.xhr.upload.onprogress = (event) => config.onUploadProgress(event);


        if (url)
            this.xhr.open("POST", url);

        if (config.data !== undefined)
            this.xhr.send(config.data);

    }

    this.delete = (url, config) => {
        this.xhr = new XMLHttpRequest();

        if (url)
            this.xhr.open("DELETE", url);

        if (config.data !== undefined)
            this.xhr.send(config.data);
    };

}

function UploadFile(file) {
    this.file = file;
    this.uploadHandler = new HttpHandler();
    this.uploadFileUI = new UploadFileUI(file.name);

    this.validateFilename = () => { }

    this.initUpload = () => new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();
        const url = `files/upload/${this.file.name}`;
        const data = this.file;

        xhr.responseType = "json";
        xhr.upload.onprogress = (event) => {
            this.uploadFileUI.updateProgressBar(event.loaded, event.total);
        }

        xhr.onreadystatechange = (event) => {
            const state = xhr.readyState;
            const status = xhr.status;
            if (state === XMLHttpRequest.DONE && status === 200){
                this.uploadFileUI.removeSelf();
                resolve(xhr.response);
            }
        }

        xhr.onerror = (event) => {
            reject(event)
        }

        xhr.open("POST", url);
        xhr.send(data);

        this.uploadFileUI.cancelButtonOnClick = () => xhr.abort(); 
    });

}

function UploadFileUI(name) {
    this.name = name;
    this.uploadEntry = document.createElement("div");
    this.uploadEntryDetails = document.createElement("div");
    this.filename = document.createElement("span");
    this.progressBar = document.createElement("progress");
    this.cancelButton = document.createElement("button");

    this.styleElements = () => {
        this.uploadEntry.classList.add("upload-entry");
        this.uploadEntryDetails.classList.add("upload-entry__details");
        this.filename.textContent = this.name;

        this.uploadEntry.appendChild(this.uploadEntryDetails);
        this.uploadEntry.appendChild(this.cancelButton);

        this.uploadEntryDetails.appendChild(this.filename);
        this.uploadEntryDetails.appendChild(this.progressBar);

        this.progressBar.setAttribute("max", "100");
        this.progressBar.setAttribute("value", "0");
        this.cancelButton.appendChild(createSVGCancelIcon());
    }
    this.styleElements();

    this.updateProgressBar = (loaded, total) => {
        this.progressBar.value = (loaded / total) * 100;
    }

    this.cancelButtonOnClick = (action) => {
        this.cancelButton.onclick = action;
    }

    this.getHTML = () => this.uploadEntry;
    this.removeSelf = () => this.uploadEntry.remove();

}



function createSVGCancelIcon() {
    const xml = "http://www.w3.org/2000/svg"
    const svg = document.createElementNS(xml, "svg");
    const path1 = document.createElementNS(xml, "path");
    const path2 = document.createElementNS(xml, "path");

    svg.setAttributeNS(null, "viewBox", "0 0 24 24");
    svg.setAttributeNS(null, "width", "24px");
    svg.setAttributeNS(null, "height", "24px");
    svg.setAttributeNS(null, "fill", "#CC0000");

    path1.setAttributeNS(null, "d", "M0 0h24v24H0V0z");
    path1.setAttributeNS(null, "fill", "none");
    path2.setAttributeNS(null, "d", "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z")


    svg.appendChild(path1);
    svg.appendChild(path2);

    return svg;
}
