// Modules
import React from 'react'
import styled from 'styled-components'
import { Reset } from 'styled-reset'

// Components
import Navbar from './components/Navbar'
import Map from './components/Map'

const MainWrapper = styled.section`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  width: 100%;
  height: 100%;
`

function App() {
  return (
    <MainWrapper>
      <Reset />
      <Navbar />
      <Map />
    </MainWrapper>
  )
}

export default App
