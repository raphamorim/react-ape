function getDisplayName(Comp) {
  return Comp.displayName || Comp.name || 'Component';
}

export function createHOC(WrappedComponent, HOCDeclaration) {
  HOCDeclaration.displayName = `withNavigation(${getDisplayName(
    WrappedComponent
  )})`;
  HOCDeclaration.WrappedComponent = WrappedComponent;
  return HOCDeclaration;
}
