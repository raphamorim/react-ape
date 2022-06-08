---
id: style-props-view
title: View Style Props
sidebar_label: View Style Props
---

### Example

```jsx
import React from "react";
import { View, StyleSheet } from "react-ape";

const ViewStyleProps = () => {
    return (
      <View style={styles.container}>
        <View style={styles.top} />
        <View style={styles.middle} />
        <View style={styles.bottom} />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
  },
  top: {
    backgroundColor: "grey",
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  middle: {
    backgroundColor: "beige",
    borderWidth: 5,
  },
  bottom: {
    backgroundColor: "pink",
    borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default ViewStyleProps;
```

# Reference

## Props

### `backgroundColor`

| Type               |
| ------------------ |
| color (RGB, HSL or named colors according [CSS3/SVG specification](https://www.w3.org/TR/css-color-3/#svg-color)) |

---

### `borderBottomColor`

| Type               |
| ------------------ |
| color (RGB, HSL or named colors according [CSS3/SVG specification](https://www.w3.org/TR/css-color-3/#svg-color)) |

---

### `borderBottomEndRadius`

| Type   |
| ------ |
| number |

---

### `borderBottomLeftRadius`

| Type   |
| ------ |
| number |

---

### `borderBottomRightRadius`

| Type   |
| ------ |
| number |

---

### `borderBottomStartRadius`

| Type   |
| ------ |
| number |

---

### `borderBottomWidth`

| Type   |
| ------ |
| number |

---

### `borderColor`

| Type               |
| ------------------ |
| color (RGB, HSL or named colors according [CSS3/SVG specification](https://www.w3.org/TR/css-color-3/#svg-color)) |

---

### `borderEndColor`

| Type               |
| ------------------ |
| color (RGB, HSL or named colors according [CSS3/SVG specification](https://www.w3.org/TR/css-color-3/#svg-color)) |

---

### `borderLeftColor`

| Type               |
| ------------------ |
| color (RGB, HSL or named colors according [CSS3/SVG specification](https://www.w3.org/TR/css-color-3/#svg-color)) |

---

### `borderLeftWidth`

| Type   |
| ------ |
| number |

---

### `borderRadius`

If the rounded border is not visible, try applying `overflow: 'hidden'` as well.

| Type   |
| ------ |
| number |

---

### `borderRightColor`

| Type               |
| ------------------ |
| color (RGB, HSL or named colors according [CSS3/SVG specification](https://www.w3.org/TR/css-color-3/#svg-color)) |

---

### `borderRightWidth`

| Type   |
| ------ |
| number |

---

### `borderStartColor`

| Type               |
| ------------------ |
| color (RGB, HSL or named colors according [CSS3/SVG specification](https://www.w3.org/TR/css-color-3/#svg-color)) |

---

### `borderStyle`

| Type                                    |
| --------------------------------------- |
| enum(`'solid'`, `'dotted'`, `'dashed'`) |

---

### `borderTopColor`

| Type               |
| ------------------ |
| color (RGB, HSL or named colors according [CSS3/SVG specification](https://www.w3.org/TR/css-color-3/#svg-color)) |

---

### `borderTopEndRadius`

| Type   |
| ------ |
| number |

---

### `borderTopLeftRadius`

| Type   |
| ------ |
| number |

---

### `borderTopRightRadius`

| Type   |
| ------ |
| number |

---

### `borderTopStartRadius`

| Type   |
| ------ |
| number |

---

### `borderTopWidth`

| Type   |
| ------ |
| number |

---

### `borderWidth`

| Type   |
| ------ |
| number |

---

### `opacity`

| Type   |
| ------ |
| number |
