import Tabs from './components/tabs.js';

const tabs = [
  { title: 'Tab 1', content: 'Some text 1' },
  { title: 'Tab 2', content: 'Some text 2' },
  { title: 'Tab 3', content: 'Some text 3' },
];

const tabsComponent = new Tabs({
  element: document.querySelector('#solution'),
  tabs,
});

tabsComponent.subscribe('tab-selected', ({ title, content }) => {
  console.log(`Tab ${ title } was selected \n ${content}`);
});

const tabs1 = [
  { title: 'London', content: 'London is the capital city of England.' },
  { title: 'Paris', content: 'Paris is the capital of France.' },
  { title: 'Tokyo', content: 'Tokyo is the capital of Japan.' },
];

const tabsComponent1 = new Tabs({
  element: document.querySelector('#solution1'),
  tabs: tabs1,
});

tabsComponent1.subscribe('tab-selected', ({ title, content }) => {
  console.log(`Tab ${ title } was selected \n ${content}`);
});
