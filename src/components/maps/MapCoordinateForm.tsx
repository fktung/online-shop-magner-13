import { useLayout } from "@/hooks/layouts";
import { ICoordinat, ICoordinatRegionDetail } from "@/types";
import { GoogleMap, DataF, MarkerF } from "@react-google-maps/api";
import React, { useCallback, useEffect, useMemo, useState } from "react";

interface IProps {
  // setMarkerJson?: any;
  coordinat?: ICoordinat;
  setSelectCoordinat?: (el: ICoordinat) => void;
  setIsCoordinat?: (props: ICoordinat) => void;
  markerShow?: boolean;
  hideOpition?: boolean;
  isRegionDetail?: ICoordinatRegionDetail;
  setIsPosCodeMatch?: (e: boolean) => void;
}

export const MapCoordinateForm = (props: IProps) => {
  const { setIsMessage, setIsError } = useLayout();
  const apiKeyMaps = process.env.NEXT_PUBLIC_API_GOOGLE_MAPS;
  const {
    coordinat,
    markerShow,
    setSelectCoordinat,
    setIsCoordinat,
    hideOpition,
    isRegionDetail,
    setIsPosCodeMatch,
  } = props;
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [showPoints, setShowPoints] = useState<boolean>(true);
  const [isArryPosCode, setIsArryPosCode] = useState<string[]>([]);

  const center: google.maps.LatLngLiteral = useMemo(
    () => ({ lat: -7.2754417, lng: 112.6302826 }),
    [],
  );

  const onMapLoad = useCallback((map: google.maps.Map) => {
    // console.log("map.data: ", map.data);
    // if (markerShow) setShowPoints(true);
    setMap(map);
  }, []);
  // const infoWindow = new google.maps.InfoWindow();
  const myLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setIsCoordinat && setIsCoordinat(pos);
          setSelectCoordinat && setSelectCoordinat(pos);
        },
      );
    } else {
      setIsError(true);
      setIsMessage("broser tidak suport");
    }
  };

  const getGeocoder = async (latLng: ICoordinat) => {
    // Use the Google Maps Geocoder for geocoding
    const geocoder = new google.maps.Geocoder();
    const arryPosCode: string[] = [];
    try {
      const response = await geocoder.geocode({ location: latLng });
      if (response.results && response.results.length > 0) {
        response.results.map(row => {
          const postCode = row.address_components.find(component =>
            component.types.includes("postal_code"),
          )?.long_name;
          if (postCode && !arryPosCode.includes(postCode)) {
            arryPosCode.push(postCode);
          }
        });
      }
      setIsArryPosCode(arryPosCode);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const dataOptions = useMemo<google.maps.Data.DataOptions | null>(() => {
    return map !== null
      ? {
          map,
          controlPosition: google.maps.ControlPosition.TOP_LEFT,
          controls: ["Point"],
          drawingMode: "Point", //  "LineString" or "Polygon".
          featureFactory: (
            geometry: google.maps.Data.Geometry,
          ): google.maps.Data.Feature => {
            geometry.forEachLatLng(e => {
              const latLng = {
                lat: e.lat(),
                lng: e.lng(),
              };
              setSelectCoordinat && setSelectCoordinat(latLng);
              getGeocoder(latLng);
            });
            setShowPoints(false);
            return new google.maps.Data.Feature({
              id: "1",
              geometry,
            });
          },
        }
      : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  useEffect(() => {
    if (isRegionDetail) {
      setIsArryPosCode([isRegionDetail?.postcode]);
    }
  }, [isRegionDetail]);

  useEffect(() => {
    if (isRegionDetail) {
      setIsPosCodeMatch &&
        setIsPosCodeMatch(isArryPosCode.includes(isRegionDetail?.postcode));
    }
  }, [isArryPosCode, isRegionDetail, setIsPosCodeMatch]);

  return (
    <GoogleMap
      mapContainerClassName="mapsStyle"
      zoom={coordinat ? 16 : 10}
      center={coordinat || center}
      onLoad={onMapLoad}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        gestureHandling: "greedy", // greedy / cooperative / auto
        zoomControl: !hideOpition,
        fullscreenControl: !hideOpition,
      }}
    >
      {!hideOpition && (
        <button
          onClick={myLocation}
          className="absolute self-center ml-[28%] xs:ml-[36%] sm:ml-[42%] mt-2 px-4 py-1 rounded-lg text-sm sm:text-base bg-white hover:bg-zinc-200 active:scale-90 transition-all duration-300"
        >
          Lokasi saya
        </button>
      )}
      {dataOptions !== null ? <DataF options={dataOptions} /> : <div>null</div>}
      {markerShow && showPoints && <MarkerF position={coordinat || center} />}
    </GoogleMap>
  );
};
