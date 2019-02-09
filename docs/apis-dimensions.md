---
id: apis-dimensions
title: dimensions
sidebar_label: dimensions
---

## Dimensions

To get the window or screen height/width of different devices, React Ape have an API called Dimensions (entire based in [React Native API](https://facebook.github.io/react-native/docs/dimensions)).

```JS
import { Dimensions } from 'react-ape';
```

Here are the methods that the Dimensions API provides:

```JS
Dimensions.get('window').height;
Dimensions.get('window').width;
Dimensions.get('screen').height;
Dimensions.get('screen').width;
```

Note: Methods like `set`, `addEventListener`, `removeEventListener` currently don't have support.
