import Tabs from './components/tabs.js';

const tabsElements = document.querySelectorAll('tabs');
[...tabsElements].forEach(element => new Tabs({ element }));

const tabsElement = document.querySelector('tabs');
tabsElement.addEventListener('tab-selected', (event) => {
  const { title } = event.detail;
  console.log(title);
});
