import Tabs from './components/tabs.js';

const tabsElements = document.querySelectorAll('tabs');
const tabs = [];
Array.prototype.forEach.call(tabsElements, tabsElement => tabs.push(new Tabs({
  element: tabsElement,
})));

const tabsElement = document.querySelector('tabs');
tabsElement.addEventListener('tab-selected', (event) => {
  const { title } = event.detail;
  console.log(title);
});
