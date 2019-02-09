import Component from '../component.js';

export default class Tabs extends Component {
  constructor({ element }) {
    super({ element });


    this._tabs = [...this._element.children].filter(el => el.matches('tab')).map((el) => {
      const tabTitle = el.getAttribute('title') || 'no-name';
      return { title: tabTitle, content: el.textContent };
    });

    this._currentTabIndex = 0;

    this.getCurrentTabData = this.getCurrentTabData.bind(this);

    this._render();

    this.on('click', 'tab-header', (event) => {
      const { tabId } = event.target.dataset;

      this._currentTabIndex = tabId;

      this._element.querySelector('[data-element = "tab-content"]').textContent = this._tabs[this._currentTabIndex].content;

      this._highlightActiveTab(event.target);

      const tabSelectEvent = new CustomEvent('tab-selected', {
        detail: {
          title: this._tabs[this._currentTabIndex].title,
          content: this._tabs[this._currentTabIndex].content,
        },
      });
      this._element.dispatchEvent(tabSelectEvent);
    });
  }

  getCurrentTabData() {
    return this._tabs[this._currentTabIndex];
  }

  _highlightActiveTab(currentTab) {
    const tabHeaders = this._element.querySelectorAll('[data-element = "tab-header"]');
    Array.prototype.forEach.call(tabHeaders, el => el.classList.remove('active'));
    currentTab.classList.add('active');
  }

  _render() {
    const tabHtml = `
    <div class="tabs-list">
    ${this._tabs.map((tab, i) => `
      <button data-element = "tab-header" data-tab-id = "${i}">${tab.title}</button>
      `).join('')}  
    </div>
  
    <div data-element = "tab-content" class="tabcontent">
      ${this.getCurrentTabData().content}
    </div>
    `;
    this._element.insertAdjacentHTML('afterbegin', tabHtml);
  }
}
