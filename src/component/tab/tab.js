class tab {
  constructor(options) {
    this.select = options.select || 0;
    this.header = options.header || document.querySelectorAll(".chestnuts-tab-header")[0];
    this.body = options.body || document.querySelectorAll(".chestnuts-tab-container")[0];
    this.headerLength = this.header.querySelectorAll(".tab-nav-item").length;
    this.render();
    this.bind();
  }

  render() {
    // default set
    // this.header.children 在IE中，children包含注释节点。 如果在ie下出现问题 请查看是否有注释节点
    // console.log(this.getChildNodes(this.header))
    this.header.querySelectorAll(".tab-nav-item")[this.select].classList.add("active");
    this.body.querySelectorAll(".chestnuts-tab-warp")[this.select].classList.add("active");
    // console.log(this.header.children[this.select])
    // let headerClassList = this.header.children[this.select].getAttribute("class");
    // let bodyClassList = this.body.children[this.select].getAttribute("class");
    // console.log(headerClassList)
    // if (headerClassList.indexOf("active") === -1) {
    //   this.header.children[this.select].setAttribute("class", headerClassList + " active");
    //   this.body.children[this.select].setAttribute("class", bodyClassList + " active");
    // }

    // var headerLength = this.header.querySelectorAll(".tab-nav-item").length,
    //   bodyLength = this.body.querySelectorAll(".chestnuts-tab-warp").length;
    for (let i = 0; i < this.headerLength; i++) {
      if (i != this.select) {
        this.header.querySelectorAll(".tab-nav-item")[i].classList.remove("active");
        this.body.querySelectorAll(".chestnuts-tab-warp")[i].classList.remove("active");
      }
    }


  }


  bind() {
    var _this = this;
    for (let i = 0; i < this.headerLength; i++) {
      this.header.querySelectorAll(".tab-nav-item")[i].onclick = function () {
        _this.select = _this.getItemIndex(this);
        _this.render();
      }
    }
  }

  getSelectedItem() {
    let selected = this.header.querySelector('.active');
    return selected;
  }

  getSelectedItemIndex() {
    return Array.from(this.header.querySelectorAll(".tab-nav-item")).indexOf(this.getSelectedItem());
  }

  getItemIndex(element) {
    return Array.from(this.header.querySelectorAll(".tab-nav-item")).indexOf(element);
  }
  /**
   * 获取子节点函数
   * @param {*} ele 
   */
  getChildNodes(ele) {
    var childArr = ele.children || ele.childNodes,
      childArrTem = new Array(); //  临时数组，用来存储符合条件的节点
    for (var i = 0, len = childArr.length; i < len; i++) {
      if (childArr[i].nodeType == 1) {
        childArrTem.push(childArr[i]);
      }
    }
    return childArrTem;
  }
}

new tab({
  select: 0,
  header: document.querySelectorAll(".chestnuts-tab-header")[0],
  body: document.querySelectorAll(".chestnuts-tab-container")[0]
})
new tab({
  select: 0,
  header: document.querySelector(".slide1"),
  body: document.querySelector(".slide-container1")
})
new tab({
  select: 1,
  header: document.querySelector(".slide2"),
  body: document.querySelector(".slide-container2")
})
new tab({
  select: 2,
  header: document.querySelector(".slide3"),
  body: document.querySelector(".slide-container3")
})