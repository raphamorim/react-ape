import React from 'react';
import { getDisplayName } from '../utils';
import { FocusPathContext } from './FocusPathContext';

/**
 * 
 *
 */
export function withNavigation(WrappedComponent) {
  return class extends React.Component {

    static WrappedComponent = WrappedComponent;
    static displayName = `withNavigation(${getDisplayName(
      WrappedComponent
    )})`;

    WrappedComponent,
    class extends React.Component {
      render() {
        return (
          <FocusPathContext.Provider value="app-nav">
            <WrappedComponent />
          </FocusPathContext.Provider>
        );
      }
    }
  );
}
