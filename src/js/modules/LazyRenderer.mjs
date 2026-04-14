export class LazyRenderer {
  constructor({ container, sentinel, renderItem, batchSize = 6 }) {
    this.container = container;
    this.sentinel = sentinel;
    this.renderItem = renderItem;
    this.batchSize = batchSize;
    this.items = [];
    this.offset = 0;
    this.observer = null;
  }

  renderNextBatch() {
    const batch = this.items.slice(this.offset, this.offset + this.batchSize);
    batch.forEach((item) => {
      this.container.insertAdjacentHTML("beforeend", this.renderItem(item));
    });
    this.offset += batch.length;
    if (this.offset >= this.items.length) this.observer.disconnect();
  }

  load(items) {
    if (this.observer) this.observer.disconnect();
    this.offset = 0;
    this.items = items;
    this.container.innerHTML = "";
    this.renderNextBatch();
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) this.renderNextBatch();
    });
    this.observer.observe(this.sentinel);
  }
}
