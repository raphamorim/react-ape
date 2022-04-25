// import withFocusable from './withFocusable';
// import withNavigation from './withNavigation';

import React, { useState, useEffect } from 'react';

/*
	USAGE:
		const Item = ({focused, setFocus, focusPath}) => {
			focused = (focused) ? 'focused' : 'unfocused'
			return (
				<View onClick={() => { setFocus() }}>
  					<Text>It's {focused} Item</Text>
				</View>
			)
		}

		const FocusableItem = withFocusable(Item)

		function App({currentFocusPath}) {
			return <FocusableItem focusPath='item-1'/>
*/


function withNavigation(ReactApeComponent) {
	function Navigate() {
		const [currentFocusPath, setFocusPath] = useState(null);

		return (
			<ReactApeComponent 
				setFocusPath={setFocusPath} 
				currentFocusPath={currentFocusPath} 
			/>
		);
	}

	return Navigate;
}

export default {
	// withFocusable,
	withNavigation
}