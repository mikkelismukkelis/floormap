import React, { useState, useLayoutEffect } from 'react'
import styled from 'styled-components'
import useStore from '../stores/mainstore'
import Image from 'react-image-resizer'

const MapWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  min-width: 375px;
`

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}

// const printClickCoordinates = (e) => {
//   let mapwrapperWidth = document.getElementById('mapwrapper').clientWidth
//   let mapWidth = document.images[1].width

//   let mapwrapperHeight = document.getElementById('mapwrapper').clientHeight
//   let mapHeight = document.images[1].height

//   let mapStartX = (mapwrapperWidth - mapWidth) / 2
//   let mapStartY = (mapwrapperHeight - mapHeight) / 2

//   let mapStartPercentageX = mapStartX / mapwrapperWidth
//   let mapStartPercentageY = mapStartY / mapwrapperHeight

//   // let mapEndX = mapStartX + mapWidth
//   // let mapEndY = mapStartY + mapHeight

//   let percentageMultiplierX = mapWidth / mapwrapperWidth
//   let percentageMultiplierY = mapHeight / mapwrapperHeight

//   let calculatedX = (mapStartPercentageX + percentageMultiplierX * 0.3) * 100
//   let calculatedY = (mapStartPercentageY + percentageMultiplierY * 0.3) * 100

//   // let mapImage = document.images[1]

//   console.log('calculatedX ', calculatedX)
//   console.log('calculatedY ', calculatedY)
//   console.log('e.clientX ', e.clientX)
//   console.log('mapwrapperWidth ', mapwrapperWidth)
//   console.log('mapWidth ', mapWidth)
//   console.log('mapHeight ', mapHeight)
//   // console.log('mapImage ', mapImage)
// }

const LocationMap = () => {
  let selectedMap = useStore((state) => state.map)
  let mapWidth = useStore((state) => state.mapWidth)
  let mapheight = useStore((state) => state.mapHeight)

  const [width, height] = useWindowSize()

  const setMapWith = useStore((state) => state.setMapWith)
  const setMapHeight = useStore((state) => state.setMapHeight)

  setMapWith(width)
  setMapHeight(height - 70)

  return <Image src={selectedMap} width={mapWidth} height={mapheight} />
}

const Circle = () => {
  let circleStyle = useStore((state) => state.circleStyle)

  return <div style={circleStyle}></div>
}

const Map = () => {
  return (
    <MapWrapper id="mapwrapper">
      <LocationMap />
      <Circle />
    </MapWrapper>
  )
}

export default Map
