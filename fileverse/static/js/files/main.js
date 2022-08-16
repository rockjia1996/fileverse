function fakeDataAPI(num) {
    const fakeData = [];
    for (let i = 0; i < num; i++) {
        let now = new Date();
        now = now.toLocaleTimeString();

        fakeData.push({
            id: i,
            name: `test file ${i}`,
            date: now,
            size: Math.floor(Math.random() * 1000),
        })

    }
    return fakeData;
}

function createFileIcon() {
    /*
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
            fill="#29465b">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
                d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
        </svg>
    */
    const xml = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(xml, "svg");
    const path1 = document.createElementNS(xml, "path");
    const path2 = document.createElementNS(xml, "path");

    svg.setAttributeNS(null, "viewBox", "0 0 24 24");
    svg.setAttributeNS(null, "width", "24px");
    svg.setAttributeNS(null, "height", "24px");
    svg.setAttributeNS(null, "fill", "#29465b");

    path1.setAttributeNS(null, "d", "M0 0h24v24H0V0z");
    path1.setAttributeNS(null, "fill", "none");
    path2.setAttributeNS(null, "d", "M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z");

    svg.appendChild(path1);
    svg.appendChild(path2);

    return svg
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

function FileNode(content) {
    this.content = content;

    this.equals = (target) => {
        if (this.content.id === target.content.id)
            return true;
        else
            return false;
    }

    this.getContentJSON = () => this.content;

    this.onDownload = () => {
        const { id } = this.content;
        const downloadURL = "/files/download/" + id;
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadURL;
        downloadLink.click();
    }

    this.onDelete = async () => {
        const { id } = this.content;
        const deleteRequest = "/files/delete/" + id;
        const response = await fetch(deleteRequest, { method: "DELETE" });
        return response.status;
    }
}

function FileTree() {
    this.nodes = [];
    this.controller = null;

    this.setController = (controller) => this.controller = controller;


    this.init = (data) => {
        data.forEach(content => {
            this.addNode(new FileNode(content));
        })
    }

    this.addNode = (target) => {
        this.nodes.push(target);
    }


    this.deleteNode = (target) => {
        const index = this.nodes.findIndex(node => node.equals(target));
        //this.node[index].onDelete();
        this.nodes.splice(index, 1);
    }

    this.sliceNodes = (start, end) => {
        const selectedNodes = this.nodes.slice(start, end);
        const contentJSON = [];
        selectedNodes.forEach(node => contentJSON.push(node.getContentJSON()))
        return contentJSON;
    }

    this.getNodeCount = () => this.nodes.length;
}

function FileTableView() {
    this.html = document.querySelector(".directory");
    this.controller = null;

    this.setController = (controller) => this.controller = controller;
    this.insertRowHTML = (id, name, date, size) => {
        const fileSVG = createFileIcon();
        const downloadSVG = createDownloadIcon();
        const deleteSVG = createDeleteIcon();
        const infoSVG = createInfoIcon();

        const row = document.createElement('div');
        const typeCell = document.createElement('div');
        const filenameCell = document.createElement('div');
        const dateCell = document.createElement('div');
        const actionsCell = document.createElement('div');
   
        typeCell.appendChild(fileSVG);
        filenameCell.textContent = name;
        dateCell.textContent = date;
        actionsCell.appendChild(downloadSVG);
        actionsCell.appendChild(deleteSVG);
        actionsCell.appendChild(infoSVG);

        row.appendChild(typeCell);
        row.appendChild(filenameCell);
        row.appendChild(dateCell);
        row.appendChild(actionsCell);

        downloadSVG.onclick = () => {
            this.controller.downloadFile(id);
        }

        deleteSVG.onclick = () => {
            row.remove();
            this.controller.deleteFile(id);
        }

        infoSVG.onclick = () => {
            const details = document.querySelector(".details-pop-up");
            const filename = document.querySelector(".details-pop-up div input:nth-of-type(1)");
            const fileSize = document.querySelector(".details-pop-up div input:nth-of-type(2)");
            const modified = document.querySelector(".details-pop-up div input:nth-of-type(3)");
            const closeButton = document.querySelector(".details-pop-up div button");

            filename.value = name;
            fileSize.value = size;
            modified.value = date;

            closeButton.onclick = () => details.style.display = "none";
            details.style.display = "block"
        }
        this.html.appendChild(row);
    }

    this.render = (entries) => {

        let displayed = document.querySelectorAll(".directory > div");
        for (let i = 1; i < displayed.length; i++){
            displayed[i].remove()
        }

        entries.forEach(content => {
            const {id, name, date, size} = content;
            this.insertRowHTML(id, name, date, size);
        })
        
    }
}

function PaginationView() {
    this.html = document.querySelector(".pagination");
    this.total = null;
    this.currentPage = 1;
    this.pageRows = 10;
    this.controller = null;

    this.setController = (controller) => this.controller = controller;

    this.addButton = (pageNum) => {
        const listItem = document.createElement("li");
        const button  = document.createElement("button");
        button.textContent = pageNum;

        if (pageNum === this.currentPage){
            button.style.background = "#008AD8";
            button.style.color = "#fff";
        }

        button.onclick = () => {
            const otherButtons = document.querySelectorAll(".pagination li button");
            otherButtons.forEach(btn => {
                btn.style.background = "";
                btn.style.color = "#000";
            })
            button.style.background = "#008AD8";
            button.style.color = "#fff";

            this.currentPage = pageNum;
            this.controller.loadPage(pageNum, this.pageRows)

        }

        listItem.appendChild(button);
        this.html.appendChild(listItem);
    }

    this.render = (total) => {
        this.total = total;

        const displayed = document.querySelectorAll(".pagination li");
        for(let i = 0; i < displayed.length; i++)
            displayed[i].remove();


        const numOfPages = Math.ceil(total / this.pageRows);
        for (let i = 0; i < numOfPages; i++)
            this.addButton(i+1);
    }
}

function SearchBarView() {
    this.html = document.querySelector(".search-bar");
    
}


function Controller() {
    this.tableView = null;
    this.treeModel = null;
    this.pagination = null;

    this.deleteFile = (id) => {
        console.log(`controller handles id ${id} deletion`)
        this.treeModel.deleteNode(new FileNode({id}));
        this.pagination.render(this.treeModel.getNodeCount());
    }

    this.uploadFile = () => {
    }

    this.downloadFile = (id) => {
        console.log(`controller handles id ${id} download`)
    }

    this.loadPage = (currentPage, rows) => {
        const startIndex = (currentPage - 1) * rows;
        const endIndex = currentPage * rows;
        const data = this.treeModel.sliceNodes(startIndex, endIndex);
        this.tableView.render(data);
    }

    this.init = (data) => {
        this.treeModel.init(data);
        this.pagination.render(data.length);
        this.loadPage(this.pagination.currentPage, this.pagination.pageRows)
    }

}

const data = fakeDataAPI(100);
const tableView = new FileTableView();
const treeModel = new FileTree();
const pagination = new PaginationView();
const controller = new Controller();

tableView.setController(controller);
treeModel.setController(controller);
pagination.setController(controller);
controller.tableView = tableView;
controller.treeModel = treeModel;
controller.pagination = pagination; 

controller.init(data);