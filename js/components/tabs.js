import Component from '../component.js';

export default class Tabs extends Component {
  constructor({ element }) {
    super({ element });


    this._tabs = [];
    Array.prototype.forEach.call(this._element.children, el => this._getTabObject(el));

    this._currentTab = 0;

    this.getCurrentTabData = this.getCurrentTabData.bind(this);

    this._render();

    this.on('click', 'tab-header', (event) => {
      const { tabId } = event.target.dataset;

      this._currentTab = tabId;

      this._element.querySelector('[data-element = "tab-content"]').textContent = this._tabs[this._currentTab].content;

      this._highlightActiveTab(event.target);

      const tabSelectEvent = new CustomEvent('tab-selected', {
        detail: {
          title: this._tabs[this._currentTab].title,
          content: this._tabs[this._currentTab].content,
        },
      });
      this._element.dispatchEvent(tabSelectEvent);
    });
  }

  getCurrentTabData() {
    return this._tabs[this._currentTab];
  }

  _getTabObject(el) {
    const tabTitle = el.getAttribute('title') ? el.getAttribute('title') : 'no-name';
    this._tabs.push({ title: tabTitle, content: el.textContent });
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
