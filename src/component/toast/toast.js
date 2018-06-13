class Component {
  constructor(options) {

  }
}
class toast extends Component {
  constructor(options) {
    super(options);
    this.options = options;
    this.delay = this.options.delay || 3000;
    this.init();
  }
  init() {
    this.hideOldWarp();
    this.render()
    this.hide()
  }
  /**
   *[render 渲染dom]
   */
  render() {
    const odiv = document.createElement("div");
    odiv.className = "chestnuts-toast-wapper";
    let tpl = `
    <div class="chestnuts-toast-container">
      <i class = "iconfont ${this.options.status === 'info' ? 'icon-tips' :(this.options.status === 'success' ? 'icon-success':'icon-error'  )
      }"></i>
			<span class="chestnuts-toast-text">${this.options.content}</span>
    </div>
    `.trim();
    odiv.innerHTML = tpl;
    document.body.appendChild(odiv);
  }
  hideOldWarp() {
    const list = document.querySelector(".chestnuts-toast-wapper");
    if (list) {
      document.querySelectorAll(".chestnuts-toast-wapper")[this.getSelectedItem() - 1].setAttribute("class", "chestnuts-toast-wapper hide")
    }
  }
  getSelectedItem() {
    const selected = document.querySelectorAll(".chestnuts-toast-wapper").length;
    return selected;
  }
  /**
   *[bind 事件绑定]
   */
  hide() {
    var timer;
    let _this = this;
    window.clearTimeout(timer);
    timer = setTimeout(function () {
      const list = document.querySelector(".chestnuts-toast-wapper");
      document.body.removeChild(list);
    }, _this.options.delay)
  }
}