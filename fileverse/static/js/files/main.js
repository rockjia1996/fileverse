

const data = [
    {
        id: 1,
        name: "some filename",
        size: 123569,
        date: "Aug 10 2022, 15:14",
        type: "file",
        parent: "",
        children: null
    }
]


function FileNode(id, name, size, date, type, parent, children) {
    this.id = id;
    this.name = name;
    this.size = size;
    this.date = date;
    this.type = type;

    this.parent = parent;
    this.children = children;

    this.addChild = (child) => this.children.push(child);
    this.addParent = (parent) => this.parent = parent;
}

function FileTree(root){
    this.root =  root;
    this.currentPath = [];

    this.visited = [];

    this.addNode = (parent, node) => {
        const parentNode = this.searchNode(parent);
        parentNode.addChild(node);
    }

    this.removeNode = (node) => {
    }

    this.searchNode = (target) => {
        const found = this.dfs(this.root, target);
        this.visited = [];
        return found;
    }

    this.dfs = (current, target) => {
        if (current.id === target.id) 
            return current;

        this.visited.push(current);
        const children = current.children;

        for (child of children){
            let result = null;
            if (!this.visited.some(v => v.id === child.id))
                result = this.dfs(child, target);
            if (result)
                return result;
        }
    }
}

const root = new FileNode(0, "root node", null , null, "folder", null, []);

const node1 = new FileNode(1, null, null , null, "folder", root, []);
const node2 = new FileNode(2, null, null , null, "folder", root, []);
const node3 = new FileNode(3, null, null , null, "folder", root, []);

const node4 = new FileNode(4, null, null , null, "folder", node3, []);
const node5 = new FileNode(5, null, null , null, "folder", node3, []);
const node6 = new FileNode(6, null, null , null, "folder", node3, []);

root.addChild(node1);
root.addChild(node2);
root.addChild(node3);

node3.addChild(node4);
node3.addChild(node5);
node3.addChild(node6);

const testTree = new FileTree(root);
console.log(testTree.searchNode(node6));
