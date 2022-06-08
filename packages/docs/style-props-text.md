---
id: style-props-text
title: Text Style Props
sidebar_label: Text Style Props
---

# Reference

## Props

### `color`

| Type               |
| ------------------ |
| color (RGB, HSL or named colors according [CSS3/SVG specification](https://www.w3.org/TR/css-color-3/#svg-color)) |

---

### `fontFamily`

| Type   |
| ------ |
| string |

---

### `fontSize`

| Type   |
| ------ |
| number |

---

### `fontStyle`

| Type                         |
| ---------------------------- |
| enum(`'normal'`, `'italic'`) |

---

### `fontWeight`

Specifies font weight. The values `'normal'` and `'bold'` are supported for most fonts. Not all fonts have a variant for each of the numeric values, in that case the closest one is chosen.

| Type                                                                                                        | Default    |
| ----------------------------------------------------------------------------------------------------------- | ---------- |
| enum(`'normal'`, `'bold'`, `'100'`, `'200'`, `'300'`, `'400'`, `'500'`, `'600'`, `'700'`, `'800'`, `'900'`) | `'normal'` |

---

### `fontVariant`

| Type                                                                                                       | Default |
| ---------------------------------------------------------------------------------------------------------- | ------- |
| array of enum(`'small-caps'`, `'oldstyle-nums'`, `'lining-nums'`, `'tabular-nums'`, `'proportional-nums'`) | `[]`    |

---

### `letterSpacing`

Increase or decrease the spacing between characters. By default there is no extra letter spacing.

| Type   |
| ------ |
| number |

---

### `lineHeight`

| Type   |
| ------ |
| number |

---

### `textAlign`

Specifies text alignment.

| Type                                                         | Default  |
| ------------------------------------------------------------ | -------- |
| enum(`'auto'`, `'left'`, `'right'`, `'center'`, `'justify'`) | `'auto'` |

---

### `textShadowColor`

| Type               |
| ------------------ |
| color (RGB, HSL or named colors according [CSS3/SVG specification](https://www.w3.org/TR/css-color-3/#svg-color)) |

---

### `textTransform`

| Type                                                         | Default  |
| ------------------------------------------------------------ | -------- |
| enum(`'none'`, `'uppercase'`, `'lowercase'`, `'capitalize'`) | `'none'` |
