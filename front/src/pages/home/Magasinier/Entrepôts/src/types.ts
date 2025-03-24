export interface Entrepot {
  ID: string;
  Name: string;
  Address: string;
}

export interface Place {
  ID: string;
  Name: string;
  EntrepotID: string;
  ParentID: string | null;
  Path: string;
}

export interface ProductStocked {
  ID: string;
  ProductID: string;
  PlaceID: string;
  Quantity: number;
  DateEntree: string;
  DatePeremption: string;
}

export interface PlaceContent {
  Places: Place[];
  Products: ProductStocked[];
}