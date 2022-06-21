/**
 * @flow
 */

import type {ComponentType} from 'react';

export function getComponentDisplayName<T: {}>(Comp: ComponentType<T>): string {
  return Comp.displayName || Comp.name || 'Component';
}
