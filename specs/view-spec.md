# View

## Defaults

- `position: relative`

## Specs

### 01 - Relative should be respected in Views of the same root level

- [See the test code](https://github.com/raphamorim/react-ape/blob/main/packages/react-ape/__tests__/specs/view-test.js)

```jsx
return [
  <View
    style={{width: 50, height: 50, backgroundColor: 'powderblue'}}
  />,
  <View
    style={{width: 100, height: 100, backgroundColor: 'skyblue'}}
  />,
  <View
    style={{width: 150, height: 150, backgroundColor: 'steelblue'}}
  />
];
```

![relative views in root level](images/view-spec-relative-root.png)