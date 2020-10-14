import React from 'react'
import styled from 'styled-components'
import logo from '../images/logo_ipsum.png'
import Image from 'react-image-resizer'
import useStore from '../stores/mainstore'

const Navigation = styled.nav`
  display: flex;
  background-color: #f3f3f3;
  height: 50px;
  padding: 10px;
  justify-content: center;
`

const NavWrapper = styled.div`
  display: flex;
  width: 90%;
  max-width: 1000px;
  justify-content: space-between;
`
const SelectWrapper = styled.div`
  display: flex;
  width: 70%;
  max-width: 1000px;
  justify-content: flex-end;
`

const LocationSelect = styled.select`
  margin: 0 10px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
  width: 50%;
  padding: 5px;
`

const RoomSelect = styled.select`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
  width: 50%;
  padding: 5px;
`

const Logo = () => {
  return <Image src={logo} height={50} width={200} />
}

const Locations = () => {
  const setLocation = useStore((state) => state.setLocation)
  const locations = useStore((state) => state.locations)

  return (
    <LocationSelect onChange={setLocation}>
      {locations.map((curValue, index) => (
        <option key={index} value={curValue}>
          {curValue}
        </option>
      ))}
    </LocationSelect>
  )
}

const Rooms = () => {
  const setRoom = useStore((state) => state.setRoom)
  const rooms = useStore((state) => state.rooms)

  return (
    <RoomSelect onChange={setRoom}>
      {rooms.map((curValue, index) => (
        <option key={index} value={curValue}>
          {curValue}
        </option>
      ))}
    </RoomSelect>
  )
}

const Navbar = () => {
  return (
    <div>
      <Navigation>
        <NavWrapper>
          <Logo />
          <SelectWrapper>
            <Locations />
            <Rooms />
          </SelectWrapper>
        </NavWrapper>
      </Navigation>
    </div>
  )
}

export default Navbar
