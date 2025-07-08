import { NaturalDimensions, ClientDimensions } from '../types/dimensions'


type MarkerProps = {
    coords: {x: number, y: number};
    naturalDimensions: NaturalDimensions;
    imgDimensions: ClientDimensions;
}
const Marker = ({coords, naturalDimensions, imgDimensions}: MarkerProps) => {
    const { naturalWidth, naturalHeight } = naturalDimensions;
    const { width, height } = imgDimensions;
    const {x, y} = coords;
    const coordX = (x/naturalWidth) * width;
    const coordY = (y/naturalHeight) * height; 

  return (
    <span className="relative flex" style={{top: coordY, left: coordX}}>
      <span className='animate-ping absolute inline-flex w-3 h-3 bg-red-600 opacity-50 rounded-full'></span>
      <i className="inline-flex fa-solid fa-location-dot absolute z-10 text-red-800"></i>
    </span>
    // <i className="inline-flex fa-solid fa-location-dot absolute z-10 text-red-800" style={{top: coordY, left: coordX}}></i>
  )
}

export default Marker