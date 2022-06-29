let isPickingMode = false;
let loadedStepIds = [{
	stepId: "11231sda213axczS",
	title: "Example element 1",
	queryPath: null,
}, {
	stepId: "08019283xSD1230xc",
	title: "Example element 2",
	queryPath: null,
}, {
	stepId: "7234jhxcSDXIs212x",
	title: "Example element 3",
	queryPath: null,
}, {
	stepId: "KywdexxSD12031241",
	title: "Example element 4",
	queryPath: null,
}];

let pickedElems = [];
let activeStepId = null;

const debounce = (func, wait, immediate) => {
	var timeout;

	return function() {
		var context = this,
		args = arguments;
		var callNow = immediate && !timeout;

		clearTimeout(timeout);
		timeout = setTimeout(function() {

			timeout = null;

			if (!immediate) {
				func.apply(context, args);
			}
		}, wait);

	    if (callNow) func.apply(context, args);
	}
};

var querySelectorAllWithEq = function(selector) {
	var remainingSelector = selector;
	var baseElement = document;
	var firstEqIndex = remainingSelector.indexOf(':eq(');
    console.log(firstEqIndex)

	while (firstEqIndex !== -1) {
		var leftSelector = remainingSelector.substring(0, firstEqIndex);
		var rightBracketIndex = remainingSelector.indexOf(')', firstEqIndex);
		var eqNum = remainingSelector.substring(firstEqIndex + 4, rightBracketIndex);
		eqNum = parseInt(eqNum, 10);

		console.log(leftSelector)
		var selectedElements = baseElement.querySelectorAll(leftSelector);
		console.log(selectedElements)
		if (eqNum >= selectedElements.length) {
			return [];
		}
		baseElement = selectedElements[eqNum];

		console.log(baseElement)

		remainingSelector = remainingSelector.substring(rightBracketIndex + 1).trim();
		console.log(remainingSelector)
	    firstEqIndex = remainingSelector.indexOf(':eq(');
	    console.log(firstEqIndex)
	}

	if (remainingSelector !== '') {
		return Array.from(baseElement.querySelectorAll(remainingSelector));
	}

	return [baseElement];
};

const dompath = element => {
    var path = '',
    i, innerText, tag, selector, classes;

    for (i = 0; element && element.nodeType == 1; element = element.parentNode, i++) {
        innerText = element.childNodes.length === 0 ? element.innerHTML : '';
        tag = element.tagName.toLowerCase();
        classes = element.className;

        // Skip <html> and <body> tags
        if (tag === "html" || tag === "body")
            continue;

        if (element.id !== '') {
            // If element has an ID, use only the ID of the element
            selector = '#' + element.id;

            // To use this with jQuery, return a path once we have an ID
            // as it's no need to look for more parents afterwards.
            //return selector + ' ' + path;
        } else if (classes.length > 0) {
            // If element has classes, use the element tag with the class names appended
            selector = tag + '.' + classes.replace(/ /g , ".");
        } else {
            // If element has neither, print tag with containing text appended (if any)
            selector = tag + ((innerText.length > 0) ? ":contains('" + innerText + "')" : "");
        }

        path = ' ' + selector + path;
    }
    return path;
};

const getDomPath = el => {
	var stack = [];
	while ( el.parentNode != null ) {
		var sibCount = 0;
		var sibIndex = 0;
		for ( var i = 0; i < el.parentNode.childNodes.length; i++ ) {
			var sib = el.parentNode.childNodes[i];
			if ( sib.nodeName == el.nodeName ) {
				if ( sib === el ) {
					sibIndex = sibCount;
				}
				sibCount++;
			}
		}
		if ( el.hasAttribute('id') && el.id != '' ) {
			stack.unshift('#' + el.id);
		} else if ( sibCount > 1 ) {
			stack.unshift(el.nodeName.toLowerCase() + ':eq(' + sibIndex + ')');
		} else {
			stack.unshift(el.nodeName.toLowerCase());
		}
		el = el.parentNode;
	}

  	return stack.slice(1); // removes the html element
};

const onMouseMove = e => {
	document.querySelectorAll(".nlx-unique-picker_by_roma").forEach(elem =>
		elem.classList.remove("nlx-unique-picker_by_roma"));

	e.target.classList.add("nlx-unique-picker_by_roma");
};

const debounceMouseMove = debounce(onMouseMove, 200);

const onClick = e => {
	e.stopPropagation();
	e.preventDefault();

	e.target.classList.remove("nlx-unique-picker_by_roma")

	const arrayPath = getDomPath(e.target);
	const domPath = dompath(e.target);

	console.warn("elem:")
	console.log(e.target)

	console.warn("path1")
	console.log(domPath);
	console.log(document.querySelectorAll(domPath));

	console.warn("path2")
	console.log(arrayPath);
	console.log(arrayPath.join(" "));
	console.log(querySelectorAllWithEq(arrayPath.join(" ")));
	// console.log(document.querySelectorAll(arrayPath.join(" ")));

	let title = null;

	loadedStepIds = loadedStepIds.map(item => {
		if (activeStepId !== item.stepId)
			return item;

		title = item.title;
		return {
			...item,
			queryPath: domPath,
		}
	});

	document.getElementById(activeStepId).classList.add("nlx-unique-picker_by_roma-button_assigned");

	activeStepId = null;

	e.target.addEventListener("click", () => {
		const id = activeStepId;
		alert(`StepID with title: "${title}"`)
	});

	document.removeEventListener("mousemove", debounceMouseMove);
};

const startPicking = stepId => {
	isPickingMode = true;
	activeStepId = stepId;

	document.addEventListener("mousemove", debounceMouseMove);
	document.addEventListener("click", onClick, { capture: true, once: true });
};

const stopPicking = () => {
	isPickingMode = false;
	activeStepId = null;

	document.removeEventListener("mousemove", debounceMouseMove);
};

const highlightAssigned = stepId => {
	const queryPath = loadedStepIds.find(item => item.stepId === stepId).queryPath;

	if (!queryPath)
		return;
	const elems = querySelectorAllWithEq(queryPath);

	if (elems.length > 1)
		throw new Error("More then one element is picked by the rule");

	const elem = elems[0];
	elem.classList.add("nlx-unique-picker_by_roma-highlited");
};

const removeHighlightAssigned = () => {
	document.querySelectorAll(".nlx-unique-picker_by_roma-highlited").forEach(item =>
		item.classList.remove("nlx-unique-picker_by_roma-highlited"));
};

const template = `<div class="nlx-unique-picker_by_roma-wrapper">
	<h2>
		Click on element to assign it
	</h2>

	<ul>
		${loadedStepIds.map(({ stepId, title }) => `
			<li>
				<button
					id="${stepId}"
					class="nlx-unique-picker_by_roma-button"
				>
					<b>
						${title}
					</b>
					<p>
						Step ID: ${stepId}
					</p>
				</button>
			</li>
		`).join('')}
	</ul>
</div>`;

document.querySelector("body").insertAdjacentHTML('beforeend', template);
document.querySelectorAll(".nlx-unique-picker_by_roma-button").forEach(elem => {
	elem.addEventListener("click", () => { startPicking(elem.id) });
	elem.addEventListener("mouseover", () => { highlightAssigned(elem.id) });
	elem.addEventListener("mouseleave", removeHighlightAssigned);
})