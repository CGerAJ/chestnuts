class tab {
  constructor(options) {
    this.select = options.select || 0;
    this.container = options.container || document.querySelector(".chestnuts-tab-wapper");
    this.header = this.getChildNodes(this.container)[0];
    this.body = this.getChildNodes(this.container)[1];
    this.navLength = this.getNavLength();
    this.render();
    this.bind();
  }
  /**
   *[render 渲染dom]
   */
  render() {
    for (let i = 0; i < this.navLength; i++) {
      this.getChildNodes(this.header)[i].classList.add("active");
      this.getChildNodes(this.body)[i].classList.add("active");
      if (i != this.select) {
        this.getChildNodes(this.header)[i].classList.remove("active");
        this.getChildNodes(this.body)[i].classList.remove("active");
      }
    }
  }
  /**
   *[bind 事件绑定]
   */
  bind() {
    let _this = this;
    for (let i = 0; i < this.navLength; i++) {
      this.getChildNodes(this.header)[i].onclick = function () {
        _this.select = _this.getItemIndex(this);
        _this.render();
      }
    }
  }
  /**
   * [getItemIndex 获取选中元素的index]
   * @param {*} element 
   */
  getItemIndex(element) {
    return Array.from(this.getChildNodes(this.header)).indexOf(element);
  }
  /**
   * [getChildNodes 获取子节点函数]
   * @param {*} ele 元素
   */
  getChildNodes(ele) {
    let childArr = ele.children || ele.childNodes,
      childArrTem = new Array(); //  临时数组，用来存储符合条件的节点
    for (let i = 0, len = childArr.length; i < len; i++) {
      if (childArr[i].nodeType == 1) {
        childArrTem.push(childArr[i]);
      }
    }
    return childArrTem;
  }
  /**
   *[getNavLength 获取导航长度]
   * @renturn nav长度
   */
  getNavLength() {
    return this.getChildNodes(this.header).length;
  }
}