

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


function FileNode(content, type, parent, children) {
    this.content = content;
    this.type = type;

    this.parent = parent;
    this.children = children;

    this.addChild = (child) => this.children.push(child);
    this.addParent = (parent) => this.parent = parent;

    this.equals = (target) => {
        if (this.content.id === target.content.id)
            return true;
        else
            return false;
    }
}

function FileTree(root) {
    this.root = root;
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
        if (current.equals(target))
            return current;

        this.visited.push(current);
        const children = current.children;

        for (child of children) {
            let result = null;
            if (!this.visited.some(v => v.equals(child)))
                result = this.dfs(child, target);
            if (result)
                return result;
        }
    }
}

const root = new FileNode({ id: 0 }, "folder", null, []);

const node1 = new FileNode({ id: 1 }, "folder", root, []);
const node2 = new FileNode({ id: 2 }, "folder", root, []);
const node3 = new FileNode({ id: 3 }, "folder", root, []);

const node4 = new FileNode({ id: 4 }, "folder", node3, []);
const node5 = new FileNode({ id: 5 }, "folder", node3, []);
const node6 = new FileNode({ id: 6 }, "folder", node3, []);


const node7 = new FileNode({ id: 7 }, "folder", node5, []);
const node8 = new FileNode({ id: 8 }, "folder", node5, []);
const node9 = new FileNode({ id: 9 }, "folder", node5, []);
const node10 = new FileNode({ id: 10 }, "folder", node5, []);

const node11 = new FileNode({ id: 11 }, "folder", node1, []);
const node12 = new FileNode({ id: 12 }, "folder", node11, []);
const node13 = new FileNode({ id: 13 }, "folder", node11, []);
const node14 = new FileNode({ id: 14 }, "folder", node11, []);


root.addChild(node1);
root.addChild(node2);
root.addChild(node3);

node3.addChild(node4);
node3.addChild(node5);
node3.addChild(node6);

node5.addChild(node7);
node5.addChild(node8);
node5.addChild(node9);
node5.addChild(node10);

node1.addChild(node11);
node11.addChild(node12);
node11.addChild(node13);
node11.addChild(node14);


const testTree = new FileTree(root);
console.log(testTree.searchNode(node8));