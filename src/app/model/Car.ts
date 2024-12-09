import {FuelType} from './FuelType';

export interface CreateCar{
  brand : string;
  model : string;
  year : number;
  price : number;
  fuelType : FuelType;
  mileage: number;
  color : string;
  img: string;
}

export interface Car extends CreateCar{
  id : number;
}
