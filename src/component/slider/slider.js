class Component {
  constructor(options) {

  }
}

class Slider extends Component {
  constructor(options) {
    super(options);
    this.options = options;
    this.container = document.getElementById(options.container) || document.querySelector(options.container);
    this.container.innerHTML = this.render();
    this.items = this.container.querySelectorAll(".slider-slide");
    this.timer = options.timer || 3000;
    this.sliderTo(0);
    this.setContainerHeight();
  }

  render() {
    const images = this.options.images;
    const content = images.map((image, index) => `
    <div class = "slider-slide">
				<img src="${image}" alt="${index}" />
      </div>
      `.trim());
    return `<div class="slider-wrapper">${content.join("")}</div>`
  }


  //  依赖注入
  registerPlugins(...plugins) {
    plugins.forEach((plugin, index) => {
      const pluginContainer = document.createElement("div");
      pluginContainer.className = "plugin-container";
      pluginContainer.innerHTML = plugin.render(this.options.images);
      this.container.appendChild(pluginContainer);

      plugin.action(this);
    })
  }

  // 自定义事件
  addEventListener(type, handler) {
    this.container.addEventListener(type, handler)
  }

  setContainerHeight() {
    setTimeout(() => {
      const height = this.container.querySelector(".slider-slide").offsetHeight;
      this.container.style.height = height + "px";
      this.container.querySelector(".slider-wrapper").style.height = height + "px";
    }, 100);

  }

  getSelectedItem() {
    const selected = this.container.querySelector(".slider-wrapper").querySelector(".active");
    return selected;
  }

  getSelectedItemIndex() {
    return Array.from(this.items).indexOf(this.getSelectedItem())
  }

  sliderTo(idx) {
    const selected = this.getSelectedItem();
    if (selected) {
      selected.className = "slider-slide";
    }
    const item = this.items[idx];
    if (item) {
      item.className = "slider-slide active";
    }

    const detail = {
      index: idx
    };
    const event = new CustomEvent("slide", {
      bubbles: true,
      detail
    })
    this.container.dispatchEvent(event)
  }

  sliderNext() {
    const currentIdx = this.getSelectedItemIndex();
    const nextIdx = (currentIdx + 1) % this.items.length;
    this.sliderTo(nextIdx)
  }

  slidePrev() {
    const currentIdx = this.getSelectedItemIndex();
    const previousIdx = (this.items.length + currentIdx - 1) % this.items.length;
    this.sliderTo(previousIdx);
  }

  start() {
    this.stop();
    this._timer = setInterval(() => {
      this.sliderNext()
    }, this.timer)
  }

  stop() {
    clearInterval(this._timer);
  }

}

const pluginController = {
  render(images) {
    return `
      <div class="slider-pagination">
      ${images.map((image, i) => `<span class="slider-pagination-bullet ${i === 0 ? 'active' : "" }"></span>`).join("")}
		</div>
      `.trim()
  },
  action(slider) {
    const controller = slider.container.querySelector(".slider-pagination");

    if (controller) {
      const buttons = document.querySelectorAll(".slider-pagination-bullet");
      controller.addEventListener('mouseover', evt => {
        const idx = Array.from(buttons).indexOf(evt.target);
        if (idx >= 0) {
          slider.sliderTo(idx);
          slider.stop();
        }
      });

      controller.addEventListener("mouseout", evt => {
        slider.start();
      });

      slider.container.addEventListener("slide", evt => {
        const idx = evt.detail.index;
        const selected = controller.querySelector(".active");
        if (selected) {
          selected.className = "slider-pagination-bullet";
        }
        buttons[idx].className = "slider-pagination-bullet active";
      });

    }
  }
}

const pluginPrev = {
  render() {
    return `<div class="slider-button-prev"></div>`;
  },
  action(slider) {
    const prev = slider.container.querySelector(".slider-button-prev");
    if (prev) {
      prev.addEventListener("click", evt => {
        slider.stop();
        slider.slidePrev();
        slider.start();
        evt.preventDefault();
      })
    }
  }
}

const pluginNext = {
  render() {
    return `<div class="slider-button-next"></div>`;
  },
  action(slider) {
    const next = slider.container.querySelector(".slider-button-next");
    if (next) {
      next.addEventListener("click", evt => {
        slider.stop();
        slider.sliderNext();
        slider.start();
        evt.preventDefault();
      })
    }
  }
}