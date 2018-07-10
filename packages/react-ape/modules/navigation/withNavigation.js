import React from 'react';
import { createHOC } from '../utils';
import { FocusPathContext } from './FocusPathContext';

export function withNavigation(WrappedComponent) {
  return createHOC(
    WrappedComponent,
    class extends React.Component {
      constructor() {
        super(...arguments);
        this.state = {
          focusedPath: null
        };
      }
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
