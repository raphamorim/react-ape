import React from 'react'
import { render, Text, Canvas } from '../../react-gibbon/reactGibbonEntry'

class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Text>
        Should be undefined
      </Text>
    )
  }
}

render(<App/>, document.getElementById('root'))
