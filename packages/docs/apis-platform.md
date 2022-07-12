---
id: apis-platform
title: Platform
sidebar_label: Platform
---

When building a cross-platform app, you'll want to re-use as much code as possible. You'll probably have different scenarios where different code might be necessary.

For instance, you may want to implement separated visual components for `LG-webOS` and `Samsung-Tizen`.

React-Ape provides the Platform module to easily organize your code and separate it by platform:

```js
import { Platform } from 'react-ape';

console.log(Platform('webos')); // true
console.log(Platform('tizen')); // false
console.log(Platform('orsay')); // false
```