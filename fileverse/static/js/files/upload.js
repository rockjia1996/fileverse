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

function UploadFile(file) {
    this.file = file;
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
            if (state === XMLHttpRequest.DONE && status === 200) {
                this.uploadFileUI.removeSelf();
                resolve(xhr.response);
            }
        }

        xhr.onerror = (event) => {
            reject(event)
        }

        this.uploadFileUI.cancelButtonOnClick = () => xhr.abort();
        xhr.open("POST", url);
        xhr.send(data);

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

function createDownloadIcon() {
    /*
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
            <g>
                <rect fill="none" height="24" width="24"/>
            </g>
            <g>
                <path d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M17,11l-1.41-1.41L13,12.17V4h-2v8.17L8.41,9.59L7,11l5,5 L17,11z"/>
            </g>
        </svg>
    */
    const xml = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(xml, "svg");
    const g1 = document.createElementNS(xml, "g");
    const g2 = document.createElementNS(xml, "g");
    const rect = document.createElementNS(xml, "rect");
    const path = document.createElementNS(xml, "path");


    svg.setAttributeNS(null, "viewBox", "0 0 24 24");
    svg.setAttributeNS(null, "width", "24px");
    svg.setAttributeNS(null, "height", "24px");
    svg.setAttributeNS(null, "fill", "#4AD822");

    rect.setAttributeNS(null, "fill", "none");
    rect.setAttributeNS(null, "width", "24px");
    rect.setAttributeNS(null, "height", "24px");

    path.setAttributeNS(null, "d", "M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M17,11l-1.41-1.41L13,12.17V4h-2v8.17L8.41,9.59L7,11l5,5 L17,11z");

    svg.appendChild(g1);
    svg.appendChild(g2);

    g1.appendChild(rect);
    g2.appendChild(path)

    return svg
}

function createDeleteIcon() {

    /*
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M14.12 10.47L12 12.59l-2.13-2.12-1.41 1.41L10.59 14l-2.12 2.12 1.41 1.41L12 15.41l2.12 2.12 1.41-1.41L13.41 14l2.12-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"/>
        </svg>
    */
    const xml = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(xml, "svg");
    const path1 = document.createElementNS(xml, "path");
    const path2 = document.createElementNS(xml, "path");

    svg.setAttributeNS(null, "viewBox", "0 0 24 24");
    svg.setAttributeNS(null, "width", "24px");
    svg.setAttributeNS(null, "height", "24px");
    svg.setAttributeNS(null, "fill", "#DE334A");

    path1.setAttributeNS(null, "d", "M0 0h24v24H0V0z");
    path1.setAttributeNS(null, "fill", "none");
    path2.setAttributeNS(null, "d", "M14.12 10.47L12 12.59l-2.13-2.12-1.41 1.41L10.59 14l-2.12 2.12 1.41 1.41L12 15.41l2.12 2.12 1.41-1.41L13.41 14l2.12-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z");

    svg.appendChild(path1);
    svg.appendChild(path2);

    return svg
}

function createInfoIcon() {
    /*
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        </svg>
    */
    const xml = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(xml, "svg");
    const path1 = document.createElementNS(xml, "path");
    const path2 = document.createElementNS(xml, "path");

    svg.setAttributeNS(null, "viewBox", "0 0 24 24");
    svg.setAttributeNS(null, "width", "24px");
    svg.setAttributeNS(null, "height", "24px");
    svg.setAttributeNS(null, "fill", "#465A59");

    path1.setAttributeNS(null, "d", "M0 0h24v24H0V0z");
    path1.setAttributeNS(null, "fill", "none");
    path2.setAttributeNS(null, "d", "M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z");

    svg.appendChild(path1);
    svg.appendChild(path2);

    return svg

}





