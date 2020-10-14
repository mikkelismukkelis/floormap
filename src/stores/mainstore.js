import create from 'zustand'
import defaultmap from '../images/defaultmap.jpg'
import espoo from '../images/espoo.jpg'
import kuopio1 from '../images/kuopio1.jpg'
import kuopio2 from '../images/kuopio2.jpg'

let locations = ['Select location', 'Espoo', 'Kuopio 1', 'Kuopio 2']

let locationRooms = {
  default: ['Select location first'],
  espoo: [
    'Select room',
    'Byte',
    'Database',
    'Helene',
    'Hotspot',
    'Hub',
    'Jean',
    'Keyboard',
    'Kilo',
    'Kitchen',
    'Lounge',
    'Mega',
    'Modem',
    'Mouse',
    'Network',
    'Pixel',
    'Rack',
    'Recovery',
    'Router',
    'Screen',
    'Security',
    'Server',
    'Standalone',
    'System',
    'Tera',
    'Tools',
    'Tove',
    'Workstation',
  ],
  kuopio1: ['Select room', 'Aku', 'Iines', 'Laku', 'Taku', 'Teppo'],
  kuopio2: ['Select room', 'Merkurius', 'Venus', 'Maa', 'Mars'],
}

let roomCoordinates = {
  espoobyte: [19, 49],
  espoodatabase: [52, 24],
  espoohelene: [52, 0],
  espoohotspot: [38, 52],
  espoohub: [53, 68],
  espoojean: [48, 10],
  espookeyboard: [52, 43],
  espookilo: [16, 49],
  espookitchen: [18, 15],
  espoolounge: [28, 1],
  espoomega: [18, 43],
  espoomodem: [46, 68],
  espoomouse: [52, 46],
  espoonetwork: [52, 20],
  espoopixel: [22, 68],
  espoorack: [70, 14],
  espoorecovery: [31, 57],
  espoorouter: [50, 68],
  espooscreen: [47, 44],
  espoosecurity: [7, 18],
  espooserver: [70, 8],
  espoostandalone: [2, 43],
  espoosystem: [47, 23],
  espootera: [24, 54],
  espootools: [10, 17],
  espootove: [47, 0],
  espooworkstation: [38, 80],
  kuopio1aku: [75, 43],
  kuopio1iines: [25, 95],
  kuopio1laku: [10, 20],
  kuopio1taku: [25, 95],
  kuopio1teppo: [10, 20],
  kuopio2merkurius: [12, 19],
  kuopio2venus: [33, 80],
  kuopio2maa: [65, 8],
  kuopio2mars: [66, 73],
}

let maps = { defaultmap, espoo, kuopio1, kuopio2 }

// This is for changing map coordinates to mapwrapper coordinates to make
// circles appear on right places on any resolutions after scaling map
const circleScaling = (left, top) => {
  let mapwrapperWidth = document.getElementById('mapwrapper').clientWidth
  let mapWidth = document.images[1].width

  let mapwrapperHeight = document.getElementById('mapwrapper').clientHeight
  let mapHeight = document.images[1].height

  console.log('mapHeight ', mapHeight)

  let mapStartX = (mapwrapperWidth - mapWidth) / 2
  let mapStartY = (mapwrapperHeight - mapHeight) / 2 + 70

  console.log('mapStartY ', mapStartY)

  let mapStartPercentageX = mapStartX / mapwrapperWidth
  let mapStartPercentageY = mapStartY / mapwrapperHeight

  let percentageMultiplierX = mapWidth / mapwrapperWidth
  let percentageMultiplierY = mapHeight / mapwrapperHeight

  let calculatedLeft =
    (mapStartPercentageX + (percentageMultiplierX * left) / 100) * 100
  let calculatedHeight =
    (mapStartPercentageY + (percentageMultiplierY * top) / 100) * 100

  let calculatedCircleRadius = mapHeight / 10

  return [calculatedLeft, calculatedHeight, calculatedCircleRadius]
}

const useStore = create((set, get) => ({
  map: maps.defaultmap,

  mapWidth: 1000,

  setMapWith: (newSize) => {
    set({ mapWidth: newSize })
  },

  mapHeight: 800,

  setMapHeight: (newSize) => {
    set({ mapHeight: newSize })
  },

  locations: locations,

  rooms: locationRooms.default,

  setRooms: (e) => {
    // Lets remove spaces and make small letters
    let selectedLocation = e.target.value.split(' ').join('').toLowerCase()
    console.log('Rooms changed to: ', selectedLocation)
    set({ rooms: locationRooms.selectedLocation })
  },

  location: 'Select location',

  setLocation: (e) => {
    // Lets remove spaces and make small letters
    let selectedLocation = e.target.value.split(' ').join('').toLowerCase()
    const hideCircle = get().hideCircle
    const resetRoom = get().resetRoom

    resetRoom()

    console.log('Location changed to: ', selectedLocation)
    console.log('Rooms in location: ', locationRooms[selectedLocation])
    console.log('Map changed to: ', maps[selectedLocation])

    if (selectedLocation === 'selectlocation') {
      set({
        location: selectedLocation,
        rooms: locationRooms.default,
        map: maps.defaultmap,
      })

      hideCircle()
    } else {
      console.log('OUJEE ', locationRooms[selectedLocation])
      set({
        location: selectedLocation,
        rooms: locationRooms[selectedLocation],
        map: maps[selectedLocation],
      })

      hideCircle()
    }
  },

  room: 'Select location first',

  resetRoom: () => {
    set({ room: 'Select room' })
  },

  setRoom: (e) => {
    // Lets remove spaces and make small letters
    let selectedLocation = get().location
    let selectedRoom = e.target.value.split(' ').join('').toLowerCase()

    const showCircle = get().showCircle
    const hideCircle = get().hideCircle

    console.log('Room changed to: ', selectedRoom)

    if (selectedRoom === 'selectlocationfirst') {
      set({
        room: 'Select location first',
      })

      hideCircle()
    } else if (selectedRoom === 'selectroom') {
      set({
        room: 'Select location first',
      })

      hideCircle()
    } else if (selectedRoom === undefined) {
      hideCircle()
    } else {
      set({
        room: selectedRoom,
      })

      let roomX = roomCoordinates[selectedLocation + selectedRoom][0]
      let roomY = roomCoordinates[selectedLocation + selectedRoom][1]

      showCircle(roomX, roomY)
    }
  },

  circleStyle: {
    display: 'none',
    left: '50%',
    top: '50%',
    position: 'absolute',
    border: '4px solid red',
    background: '#ffece6',
    opacity: '0.7',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
  },

  showCircle: (left, top) => {
    let [scaledLeft, scaledTop, scaledCircleRadius] = circleScaling(left, top)

    set({
      circleStyle: {
        display: 'inline',
        left: `${scaledLeft}%`,
        top: `${scaledTop}%`,
        position: 'absolute',
        border: '4px solid red',
        background: '#ffece6',
        opacity: '0.7',
        borderRadius: '50%',
        width: `${scaledCircleRadius}px`,
        height: `${scaledCircleRadius}px`,
      },
    })
  },
  hideCircle: () => {
    set({
      circleStyle: {
        display: 'none',
        left: '50%',
        top: '50%',
        position: 'absolute',
        border: '4px solid red',
        background: '#ffece6',
        opacity: '0.7',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
      },
    })
  },
}))

export default useStore
