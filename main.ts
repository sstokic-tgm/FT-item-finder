import { makeCheckboxTree, TreeNode, getLeafStates } from './checkboxTree';
import { downloadItems, getResultsTable, Item, getMaxItemLevel } from './itemLookup';

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
        "Legs", [
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
            "-Allow gacha",
        ],
        "-Guardian",
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
        const tree = makeCheckboxTree(filter);
        tree.addEventListener("change", updateResults);
        target.innerText = "";
        target.appendChild(tree);
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
            updateResults();
        }
    });
}

applyDragDrop();

downloadItems().then(() => {
    const element = document.getElementById("loading");
    if (element) {
        element.hidden = true;
    }

    for (const name of ["filter group", "priority group", "results group"]) {
        const element = document.getElementById(name);
        if (element) {
            element.hidden = false;
        }
    }

    const levelrange = document.getElementById("levelrange");
    if (!(levelrange instanceof HTMLInputElement)) {
        throw "Internal error";
    }
    levelrange.max = `${getMaxItemLevel()}`;
    levelrange.value = levelrange.max;
    levelrange.dispatchEvent(new Event("input"));
    updateResults();
});

function compare(lhs: number, rhs: number) {
    if (lhs == rhs) {
        return 0;
    }
    return lhs < rhs ? -1 : 1;
}

function updateResults() {
    const filters: ((item: Item) => boolean)[] = [];

    { //character filter
        const characterFilterList = document.getElementById("characterFilters")?.children[0];
        if (!(characterFilterList instanceof HTMLUListElement)) {
            throw "Internal error";
        }
        const characterStates = getLeafStates(characterFilterList);
        filters.push((item: Item): boolean => {
            return characterStates[item.character];
        });
    }

    { //parts filter
        const partsFilterList = document.getElementById("partsFilter")?.children[0];
        if (!(partsFilterList instanceof HTMLUListElement)) {
            throw "Internal error";
        }
        const partsStates = getLeafStates(partsFilterList);
        filters.push((item: Item): boolean => {
            return partsStates[item.part];
        });
    }

    { //availability filter
        const availabilityFilterList = document.getElementById("availabilityFilter")?.children[0];
        if (!(availabilityFilterList instanceof HTMLUListElement)) {
            throw "Internal error";
        }
        const availabilityStates = getLeafStates(availabilityFilterList);
        if (!availabilityStates["Gold"]) {
            filters.push(item => item.price_type !== "gold");
        }
        if (!availabilityStates["AP"]) {
            filters.push(item => item.price_type !== "ap");
        }
        if (!availabilityStates["Parcel enabled"]) {
            filters.push(item => !item.parcel_enabled);
        }
        if (!availabilityStates["Parcel disabled"]) {
            filters.push(item => item.parcel_enabled);
        }
        if (availabilityStates["Exclude unavailable items"]) {
            filters.push(item => item.available_in_shop);
        }
    }

    { //misc filter
        const levelrange = document.getElementById("levelrange");
        if (!(levelrange instanceof HTMLInputElement)) {
            throw "Internal error";
        }
        const maxLevel = parseInt(levelrange.value);
        filters.push((item: Item) => item.level <= maxLevel);
    }

    const comparators: ((lhs: Item, rhs: Item) => number)[] = [];

    {
        const priorityList = document.getElementById("priority list");
        if (!(priorityList instanceof HTMLOListElement)) {
            throw "Internal error";
        }
        const texts = Array.from(priorityList.childNodes).filter(node => !node.textContent?.includes('\n')).map(node => node.textContent);
        for (const text of texts) {
            switch (text) {
                case "Movement Speed":
                    comparators.push((lhs: Item, rhs: Item) => compare(lhs.movement, rhs.movement));
                    break;
                case "Charge":
                    comparators.push((lhs: Item, rhs: Item) => compare(lhs.charge, rhs.charge));
                    break;
                case "Lob":
                    comparators.push((lhs: Item, rhs: Item) => compare(lhs.lob, rhs.lob));
                    break;
                case "Str":
                    comparators.push((lhs: Item, rhs: Item) => compare(lhs.str, rhs.str));
                    break;
                case "Dex":
                    comparators.push((lhs: Item, rhs: Item) => compare(lhs.dex, rhs.dex));
                    break;
                case "Sta":
                    comparators.push((lhs: Item, rhs: Item) => compare(lhs.sta, rhs.sta));
                    break;
                case "Will":
                    comparators.push((lhs: Item, rhs: Item) => compare(lhs.wil, rhs.wil));
                    break;
                case "Serve":
                    comparators.push((lhs: Item, rhs: Item) => compare(lhs.serve, rhs.serve));
                    break;
                case "Quickslots":
                    comparators.push((lhs: Item, rhs: Item) => compare(lhs.quickslots, rhs.quickslots));
                    break;
                case "Buffslots":
                    comparators.push((lhs: Item, rhs: Item) => compare(lhs.buffslots, rhs.buffslots));
                    break;
                case "HP":
                    comparators.push((lhs: Item, rhs: Item) => compare(lhs.hp, rhs.hp));
                    break;
                //case "AP cost":
                //    comparators.push((lhs: Item, rhs: Item) => compare(lhs. , rhs.));
                //    break;
                //case "Gold cost":
                //    comparators.push((lhs: Item, rhs: Item) => compare(lhs. , rhs.));
                //    break;
            }
        }
    }

    const table = getResultsTable(
        item => filters.every(filter => filter(item)),
        (items, item) => {
            if (items.length === 0) {
                return [item];
            }
            for (const comparator of comparators) {
                switch (comparator(items[0], item)) {
                    case -1:
                        return [item];
                    case 1:
                        return items;
                }
            }
            return [...items, item];
        }
    );
    const target = document.getElementById("results");
    if (!target) {
        return;
    }
    target.innerText = "";
    target.appendChild(table);
}

function setMaxLevelDisplayUpdate() {
    const levelDisplay = document.getElementById("levelDisplay");
    if (!(levelDisplay instanceof HTMLLabelElement)) {
        throw "Internal error";
    }
    const levelrange = document.getElementById("levelrange");
    if (!(levelrange instanceof HTMLInputElement)) {
        throw "Internal error";
    }
    const callback = () => {
        levelDisplay.textContent = `Max level requirement: ${levelrange.value}`;
        updateResults();
    };
    levelrange.addEventListener("input", callback);
    callback();
}

setMaxLevelDisplayUpdate();