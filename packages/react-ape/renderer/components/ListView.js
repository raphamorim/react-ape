class ListView {
  constructor(props) {
    this.props = props;

    this._renderList = [];
  }

  appendChild(fn) {
    this._renderList.push(fn);
  }

  children() {
    return this._renderList;
  }

  render(apeContext) {
    const { ctx } = apeContext;
    const { style = {}, dataSource, renderRow } = this.props;

    const callRenderFunctions = (renderFunction) => {
      renderFunction(apeContext);
    }

    this._renderList.forEach(callRenderFunctions);

    console.log(dataSource, renderRow)

  }
}

export default ListView;
