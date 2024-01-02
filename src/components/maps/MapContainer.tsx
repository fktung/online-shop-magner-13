// const center = { lat: -7.3369888, lng: 112.7509539 };
import React, { ReactNode, useMemo, useState } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

interface IPoint {
  lat: number;
  lng: number;
}

interface IMap {
  children: ReactNode;
}

const MapContainer: React.FC<IMap> = props => {
  const { children } = props;
  const apiKeyMaps = process.env.NEXT_PUBLIC_API_GOOGLE_MAPS;

  const onError = (err: any) => console.log("onError: ", err);
  return (
    <LoadScript
      googleMapsApiKey={`${apiKeyMaps}`}
      libraries={["drawing", "visualization", "places"]}
      version="weekly"
      onError={onError}
      preventGoogleFontsLoading={false}
    >
      {children}
    </LoadScript>
  );
};

export default React.memo(MapContainer);
