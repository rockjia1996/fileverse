function fakeDataAPI(num){
    const fakeData =[];
    for(let i = 0; i < num; i++){
        let now = new Date();
        now = now.toLocaleTimeString();
        
        fakeData.push({
            id: i,
            name: `test file ${i}`,
            date: now,
            size: Math.floor(Math.random() * 1000),
            type: "file",
            parent: null,
            children: null
        })

    }
    return fakeData;
}
let data = fakeDataAPI(10);
console.log(data)


function FileNode(content) {
    this.content = content;

    this.equals = (target) => {
        if (this.content.id === target.content.id)
            return true;
        else
            return false;
    }

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
    
    this.addNode = (target) => {
        this.nodes.push(target);
    }

    this.deleteNode = (target) => {
        const index = this.node.findIndex(node => node.equals(target));
        this.node[index].onDelete();
        this.nodes.splice(index, 1);
    }
}




function Controller() {

}