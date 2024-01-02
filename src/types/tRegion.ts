export interface IRegion extends ICoordinat {
  id: number;
  name: string;
}
export interface IArea extends IRegion {
  postcode: string;
}

export interface ICoordinat {
  lat: number;
  lng: number;
}

export interface IKoordinatJson {
  address_components: any[];
  formatted_address: string;
  location: ICoordinat;
}

export interface ICoordinatRegionDetail extends IArea {
  suburb: IRegion;
  city: IRegion;
  province: IRegion;
  country: {
    id: number;
    name: string;
    code: string;
  };
}
