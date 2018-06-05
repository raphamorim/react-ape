function View(root, props, gibbonContext) {
  const { ctx } = gibbonContext;
  const { style = {} } = props;

  return {
    type: 'VIEW',
    props: props
  }
}

export default View;
