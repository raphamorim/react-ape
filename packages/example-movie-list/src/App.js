import React from 'react'
import { render, Text } from '../../react-gibbon/reactGibbonEntry'

class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Text>Should be undefined</Text>
    )
  }
}

render(<App/>, document.getElementById('root'))
