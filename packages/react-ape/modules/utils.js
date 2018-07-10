export function getDisplayName(Comp) {
  return Comp.displayName || Comp.name || 'Component';
}
