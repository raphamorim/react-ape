function View(root, props, apeContext) {
  const { ctx } = apeContext;
  const { style = {} } = props;

  return {
    type: 'VIEW',
    props: props
  }
}

export default View;
