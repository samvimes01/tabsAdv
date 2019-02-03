import Component from '../component.js';

export default class Tabs extends Component {
  constructor({ element, tabs }) {
    super({ element });
    this._tabs = tabs;
    this._currentTab = 0;

    this.getCurrentTabData = this.getCurrentTabData.bind(this);

    this._render();

    this.on('click', 'tab-header', (event) => {
      const { tabId } = event.target.dataset;

      this._currentTab = tabId;

      this._element.querySelector('[data-element = "tab-content"]').textContent = this._tabs[this._currentTab].content;

      this._highlightActiveTab(event.target);

      this.emit('tab-selected', this.getCurrentTabData());
    });
  }

  getCurrentTabData() {
    return this._tabs[this._currentTab];
  }

  _highlightActiveTab(currentTab) {
    const tabHeaders = this._element.querySelectorAll('[data-element = "tab-header"]');
    Array.prototype.forEach.call(tabHeaders, el => el.classList.remove('active'));
    currentTab.classList.add('active');
  }

  _render() {
    this._element.innerHTML = `
    <div class="tab">
    ${this._tabs.map((tab, i) => `
      <button data-element = "tab-header" data-tab-id = "${i}">${tab.title}</button>
      `).join('')}  
    </div>
  
    <div data-element = "tab-content" class="tabcontent">
      ${this.getCurrentTabData().content}
    </div>
    `;
  }
}
