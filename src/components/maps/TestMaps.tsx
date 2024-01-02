import {
  GoogleMap,
  MarkerF,
  LoadScript,
  Autocomplete,
  GoogleMapProps,
  Data,
  DataF,
} from "@react-google-maps/api";
import { useMemo, useState } from "react";
// const ScriptLoaded = require("../../docs/ScriptLoaded").default;

export const TestMaps = () => {
  // const map = useGoogleMap();
  const [map, setmap] = useState<google.maps.Map | null>(null);
  const [clickedPlace, setClickedPlace] = useState<any>(null);
  const apiKeyMaps = process.env.NEXT_PUBLIC_API_GOOGLE_MAPS;
  // const center = useMemo(() => ({ lat: isLat, lng: isLng }), [isLat, isLng]);

  const position = {
    lat: -7.3369888,
    lng: 112.7509539,
  };
  const [latLng, setLatLng] = useState(position);

  const handleMapsClick = async (e: google.maps.MapMouseEvent | any) => {
    setLatLng(e.latLng);
    // setIsLat(e.latLng.lat());
    // setIsLng(e.latLng.lng());
    // map?.panTo(center);

    // const geocoder = new google.maps.Geocoder();
    // geocoder.geocode({ location: el.latLng }, (results, status) => {
    //   if (status === google.maps.GeocoderStatus.OK && results?.length) {
    //     setClickedPlace(results[0]);
    //   }
    // });

    const { latLng }: any = e;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng.lat()},${latLng.lng()}&key=${apiKeyMaps}`,
    );

    if (response.ok) {
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const clickedPlace = data.results[0];
        setClickedPlace(clickedPlace);
      }
    }
  };
  const onDataLoad = (data: google.maps.Data) => {
    console.log("data: ", data);
  };
  return (
    <GoogleMap
      // mapContainerStyle={mapContainerStyle}
      mapContainerClassName="mapsStyle"
      zoom={13}
      center={latLng}
      onClick={handleMapsClick}
    >
      {/* <Autocomplete onLoad={e => console.log(e)}>
        <input type="text" />
      </Autocomplete> */}
      {/* <InfoWindow position={center}>
          <>
            <h1>Location</h1>
          </>
        </InfoWindow> */}
      <MarkerF position={latLng} />
      <Data onLoad={onDataLoad} />
    </GoogleMap>
  );
};
