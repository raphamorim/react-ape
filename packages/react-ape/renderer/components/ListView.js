function ListView(root, props, apeContext) {
  const { ctx } = apeContext;
  const { style = {}, renderRow, dataSource } = props;
  const list = []

  dataSource.forEach((data, idx) => list.push(renderRow(data, idx)))
  console.log(list);
  // return list

  return {
    type: 'LISTVIEW',
    props: props
  }
}

export default ListView;
