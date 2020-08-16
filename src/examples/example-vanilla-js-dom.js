import Temporis from '../index';

function createElement(type, className, text) {
  const element = document.createElement(type);
  if (className) element.classList.add(className);
  if (text) {
    const textElement = document.createTextNode(text);
    element.appendChild(textElement);
  }
  return element;
}

function refreshPreview(element, temporisInstance) {
  const currentItem = temporisInstance.getCurrentItem();
  if (currentItem !== undefined) {
    const history = temporisInstance.getHistory();
    element.innerHTML = `
      <div style="display: flex; width: 100%;">
        <div style="flex-basis: 61%; padding: 20px;">
          <h3>Current Item</h3>
          <pre style="font-size: 20px;">${JSON.stringify(currentItem, null, 2)}</pre>
        </div>
        <div style="flex-basis: 39%; padding: 20px; background: #192849; color: #eee;">
          <h3>History</h3>
          <pre>${JSON.stringify(history, null, 2)}</pre>
        </div>
      </div>
    `;
  }
}

// create elements
const rootElement = document.getElementById('root-vanilla-js');

const sectionElement = createElement('div', 'section');
const headerElement = createElement('h1', '', 'Vanilla JS');
const controlsElement = createElement('div', 'controls');
const actionsElement = createElement('div', 'actions');
const previewElement = createElement('div', 'preview');

const btnAddElement = createElement('button', 'actions-button', 'Add');
const btnUndoElement = createElement('button', 'actions-button', 'Undo');
const btnRedoElement = createElement('button', 'actions-button', 'Redo');

// render elements
rootElement.appendChild(sectionElement);

sectionElement.appendChild(headerElement);
sectionElement.appendChild(controlsElement);
sectionElement.appendChild(previewElement);

controlsElement.appendChild(actionsElement);

actionsElement.appendChild(btnAddElement);
actionsElement.appendChild(btnUndoElement);
actionsElement.appendChild(btnRedoElement);

// init temporis
const temporis = Temporis();
temporis.pushOne({ count: 1 });
refreshPreview(previewElement, temporis);

// event listeners
btnAddElement.addEventListener('click', (e) => {
  e.preventDefault();
  const currentItemMaybe = temporis.getCurrentItem();
  const count = currentItemMaybe ? currentItemMaybe.count + 1 : 1;
  temporis.pushOne({ count });
  refreshPreview(previewElement, temporis);
});

btnUndoElement.addEventListener('click', (e) => {
  e.preventDefault();
  temporis.undo();
  refreshPreview(previewElement, temporis);
});

btnRedoElement.addEventListener('click', (e) => {
  e.preventDefault();
  temporis.redo();
  refreshPreview(previewElement, temporis);
});
