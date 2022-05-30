---
id: apis-dimensions
title: Dimensions
sidebar_label: Dimensions
---

To get the window or screen height/width of different devices, React Ape have an API called Dimensions (entire based in [React Native API](https://facebook.github.io/react-native/docs/dimensions)).

You can get the application window's width and height using the following code:

```jsx
import { Dimensions } from 'react-ape';
```

> Although dimensions are available immediately, they may change (e.g due to device rotation, foldable devices etc) so any rendering logic or styles that depend on these constants should try to call this function on every render, rather than caching the value (for example, using inline styles rather than setting a value in a `StyleSheet`).

# Reference

---

### `get()`

```jsx
static get(dim)
```

Initial dimensions are set before runApplication is called so they should be available before any other require's are run, but may be updated later.

```JS
const { width, height } = Dimensions.get('window');

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
```

**Parameters:**

| Name                                                               | Type   | Description                                                                       |
| ------------------------------------------------------------------ | ------ | --------------------------------------------------------------------------------- |
| **dim** <div className="label basic required two-lines">`required`</div> | string | Returns value for the dimension. |

---

### `addEventListener()`

```jsx
static addEventListener(handler)
```

Add an event handler. Fires when a property within the `Dimensions` object changes. The argument to the event handler is a [`DimensionsValue`](#dimensionsvalue) type object.

```JS
Dimensions.addEventListener((dimensionsValue) => {
  console.log(dimensionsValue);
});
```

---

### `removeEventListener()`

```jsx
static removeEventListener(handler)
```

Remove an event handler.

```JS
function listenerHandler() {
	// does something here...
}

// Add event listener to Dimensions
Dimensions.addEventListener(listenerHandler);

// Remove event listener to Dimensions
Dimensions.removeEventListener(listenerHandler);
```

---

# Type Definitions

### DimensionsValue

**Properties:**

| Name   | Type                                        | Description                             |
| ------ | ------------------------------------------- | --------------------------------------- |
| window | [DisplayMetrics](apis-dimensions#displaymetrics) | Size of the visible Application window. |
| screen | [DisplayMetrics](apis-dimensions#displaymetrics) | Size of the device's screen.            |

### DisplayMetrics

| Type   |
| ------ |
| object |

**Properties:**

| Name      | Type   |
| --------- | ------ |
| width     | number |
| height    | number |
| scale     | number |
| fontScale | number |
