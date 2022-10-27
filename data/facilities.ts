export interface Facility {
  facilityCategoryTypeCode: number;
  categoryName: string;
  order: number;
  facilityDetails: FacilityDetails[];
}

interface FacilityDetails {
  facilityName: string;
  displayIconTypeCode: number;
  facilityTypeCode: number;
  distance: undefined;
  active: boolean;
  isVisible: boolean;
}
