import { createHTML } from './html';

export type TreeNode = string | TreeNode[];

function getChildren(node: HTMLInputElement): HTMLInputElement[] {
    const parent = node.parentElement;
    if (!(parent instanceof HTMLUListElement)) {
        return [];
    }
    for (let childIndex = 0; childIndex < parent.children.length; childIndex++) {
        if (parent.children[childIndex] !== node) {
            continue;
        }
        const potentialSiblingList = parent.children[childIndex + 3];
        if (!(potentialSiblingList instanceof HTMLUListElement)) {
            break;
        }
        return Array.from(potentialSiblingList.children).filter((e): e is HTMLInputElement => e instanceof HTMLInputElement);
    }
    return [];
}

function applyCheckedToDescendants(node: HTMLInputElement) {
    for (const child of getChildren(node)) {
        if (child.checked !== node.checked) {
            child.checked = node.checked;
            child.indeterminate = false;
            applyCheckedToDescendants(child);
        }
    }
}

function getParent(node: HTMLInputElement): HTMLInputElement | void {
    const parentUL = node.parentElement;
    if (!(parentUL instanceof HTMLUListElement)) {
        return;
    }
    const grandparentUL = parentUL.parentElement;
    if (!(grandparentUL instanceof HTMLUListElement)) {
        return;
    }
    let candidate: HTMLInputElement | void;
    for (const child of grandparentUL.children) {
        if (child instanceof HTMLInputElement) {
            candidate = child;
            continue;
        }
        if (child === parentUL) {
            return candidate;
        }
    }
}

function updateAncestors(node: HTMLInputElement) {
    const parent = getParent(node);
    if (!parent) {
        return;
    }
    let foundChecked = false;
    let foundUnchecked = false;
    let foundIndeterminate = false
    for (const child of getChildren(parent)) {
        if (child.checked) {
            foundChecked = true;
        }
        else {
            foundUnchecked = true;
        }
        if (child.indeterminate) {
            foundIndeterminate = true;
        }
    }
    if (foundIndeterminate || foundChecked && foundUnchecked) {
        parent.indeterminate = true;
    }
    else if (foundChecked) {
        parent.checked = true;
        parent.indeterminate = false;
    }
    else if (foundUnchecked) {
        parent.checked = false;
        parent.indeterminate = false;
    }
    updateAncestors(parent);
}

function applyCheckListener(node: HTMLInputElement) {
    node.addEventListener("change", function (e) {
        const target = e.target;
        if (!(target instanceof HTMLInputElement)) {
            return;
        }
        applyCheckedToDescendants(target);
        updateAncestors(target);
    });
}

function applyCheckListeners(node: HTMLUListElement) {
    for (const element of node.children) {
        if (element instanceof HTMLInputElement) {
            applyCheckListener(element);
        }
        else if (element instanceof HTMLUListElement) {
            applyCheckListeners(element);
        }
    }

}

function addCheckboxTreeNode(element: HTMLElement, TreeNode: TreeNode) {
    if (typeof TreeNode === "string") {
        element.appendChild(createHTML(["input", { type: "checkbox", id: TreeNode, checked: "true" }]));
        element.appendChild(createHTML(["label", { for: TreeNode }, TreeNode]));
    }
    else {
        const list = createHTML(["ul"]);
        for (let i = 0; i < TreeNode.length; i++) {
            const f = TreeNode[i];
            const last = i === TreeNode.length - 1;
            addCheckboxTreeNode(list, f);
            if (!last && typeof f === "string") {
                list.appendChild(createHTML(["br"]));
            }
        }
        element.appendChild(list);
    }
}

export function makeCheckboxTree(TreeNode: TreeNode) {
    const root = createHTML(["ul", { class: "treeview" }]);
    addCheckboxTreeNode(root, TreeNode);
    applyCheckListeners(root);
    return root;
}
