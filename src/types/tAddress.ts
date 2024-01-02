export interface IDestination {
  address: string;
  area_id: number;
  area_name: string;
  city_id: number;
  city_name: string;
  country_id: number;
  country_name: string;
  direction: string;
  lat: number;
  lng: number;
  postcode: string;
  province_id: number;
  province_name: string;
  suburb_id: number;
  suburb_name: string;
}

export interface IAddress {
  id: number;
  name: string;
  receiver: string;
  phone: string;
  destination: IDestination;
  is_default: boolean;
}
