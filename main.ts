import { makeCheckboxTree, TreeNode } from './checkboxTree';

const characterFilters = [
    "Characters", [
        "Niki",
        "LunLun",
        "Lucy",
        "Shua",
        "Dhanpir",
        "Pochi",
        "Al",
    ],
];

const partsFilter = [
    "Parts", [
        "Head", [
            "Hat",
            "Hair",
            "Dye",
        ],
        "Upper",
        "Lower",
        "Shoes", [
            "Shoes",
            "Socks",
        ],
        "Aux", [
            "Hand",
            "Backpack",
            "Face"
        ],
        "Racket",
    ],
];

const availabilityFilter = [
    "Availability", [
        "Shop", [
            "Gold",
            "AP",
            "Allow gacha",
        ],
        "Guardian",
        "Parcel enabled",
        "Parcel disabled",
        "Exclude unavailable items",
    ],
];

function getName(node: HTMLInputElement): string | null | void {
    const parent = node.parentElement;
    if (!(parent instanceof HTMLUListElement)) {
        return "";
    }
    let found = false;
    for (const child of parent.children) {
        if (found) {
            return child.textContent;
        }
        if (child === node) {
            found = true;
        }
    }
}

function addFilterTrees() {
    const filters: [TreeNode, string][] = [
        [characterFilters, "characterFilters"],
        [partsFilter, "partsFilter"],
        [availabilityFilter, "availabilityFilter"],
    ];
    for (const [filter, name] of filters) {
        const target = document.getElementById(name);
        if (!target) {
            return;
        }
        target.innerText = "";
        target.appendChild(makeCheckboxTree(filter));
    }
}

addFilterTrees();

let dragged: HTMLElement;

function applyDragDrop() {
    document.addEventListener("dragstart", ({ target }) => {
        if (!(target instanceof HTMLElement)) {
            return;
        }
        dragged = target;
    });

    document.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    document.addEventListener("drop", ({ target }) => {
        if (!(target instanceof HTMLElement)) {
            return;
        }
        if (target.className == "dropzone" && target !== dragged) {
            if (dragged.parentNode !== target.parentNode) { //disallow dragging across different lists
                return;
            }
            const list = Array.from(dragged.parentNode?.children ?? new HTMLCollection);
            const index = list.indexOf(dragged);
            dragged.remove();
            if (index > list.indexOf(target)) {
                target.before(dragged);
            } else {
                target.after(dragged);
            }
        }
    });
}

applyDragDrop();