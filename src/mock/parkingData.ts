
export interface ParkingSpot {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  latitude: number; // Added for compatibility with filter code
  longitude: number; // Added for compatibility with filter code
  pricePerHour: number;
  availableSpaces: number;
  totalSpaces: number;
  address: string;
  city: string; // Added for search functionality
  openingHours: string;
  facilities: string[];
  covered: boolean; // Added for filter functionality
  evCharging: boolean; // Added for filter functionality
  type: 'street' | 'garage' | 'lot'; // Added for filter functionality
  image?: string; // Added for compatibility with modal
  rating?: number; // Added for compatibility with modal
  reviews?: number; // Added for compatibility with modal
  features?: string[]; // Added for compatibility with modal
}

export const parkingSpots: ParkingSpot[] = [
  // London spots (existing)
  {
    id: "park-1",
    name: "Soho Square Parking",
    location: {
      lat: 51.5156,
      lng: -0.1323
    },
    latitude: 51.5156, // Added for compatibility
    longitude: -0.1323, // Added for compatibility
    pricePerHour: 8.50,
    availableSpaces: 25,
    totalSpaces: 120,
    address: "10 Soho Square, London W1D 3QD",
    city: "London",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Electric Vehicle Charging", "Disabled Access"],
    covered: true,
    evCharging: true,
    type: "garage"
  },
  {
    id: "park-2",
    name: "Covent Garden Car Park",
    location: {
      lat: 51.5117,
      lng: -0.1231
    },
    latitude: 51.5117,
    longitude: -0.1231,
    pricePerHour: 10.00,
    availableSpaces: 5,
    totalSpaces: 80,
    address: "Parker St, London WC2B 5NT",
    city: "London",
    openingHours: "6:00 - 00:00",
    facilities: ["Security Cameras", "Valet Service", "Car Wash"],
    covered: true,
    evCharging: false,
    type: "garage"
  },
  {
    id: "park-3",
    name: "Marylebone Parking",
    location: {
      lat: 51.5223,
      lng: -0.1546
    },
    latitude: 51.5223,
    longitude: -0.1546,
    pricePerHour: 7.20,
    availableSpaces: 0,
    totalSpaces: 60,
    address: "34-36 Gloucester Pl, London W1U 8HE",
    city: "London",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Disabled Access"],
    covered: true,
    evCharging: false,
    type: "garage"
  },
  {
    id: "park-4",
    name: "Liverpool Street Parking",
    location: {
      lat: 51.5180,
      lng: -0.0823
    },
    latitude: 51.5180,
    longitude: -0.0823,
    pricePerHour: 9.50,
    availableSpaces: 42,
    totalSpaces: 100,
    address: "35 Great Eastern St, London EC2A 3ER",
    city: "London",
    openingHours: "5:30 - 23:00",
    facilities: ["Security Cameras", "Electric Vehicle Charging", "Car Wash"],
    covered: false,
    evCharging: true,
    type: "lot"
  },
  {
    id: "park-5",
    name: "Camden Town Parking",
    location: {
      lat: 51.5390,
      lng: -0.1426
    },
    latitude: 51.5390,
    longitude: -0.1426,
    pricePerHour: 6.80,
    availableSpaces: 15,
    totalSpaces: 50,
    address: "101 Camden High St, London NW1 7JN",
    city: "London",
    openingHours: "6:00 - 22:00",
    facilities: ["Security Cameras", "Disabled Access"],
    covered: false,
    evCharging: false,
    type: "street"
  },
  {
    id: "park-6",
    name: "Oxford Street Car Park",
    location: {
      lat: 51.5148,
      lng: -0.1418
    },
    latitude: 51.5148,
    longitude: -0.1418,
    pricePerHour: 11.25,
    availableSpaces: 32,
    totalSpaces: 180,
    address: "Oxford St, London W1C 1DL",
    city: "London",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Electric Vehicle Charging", "Valet Service", "Disabled Access"],
    covered: true,
    evCharging: true,
    type: "garage"
  },
  {
    id: "park-7",
    name: "South Bank Parking",
    location: {
      lat: 51.5056,
      lng: -0.1146
    },
    latitude: 51.5056,
    longitude: -0.1146,
    pricePerHour: 8.90,
    availableSpaces: 8,
    totalSpaces: 65,
    address: "Upper Ground, London SE1 9PP",
    city: "London",
    openingHours: "6:00 - 00:00",
    facilities: ["Security Cameras", "Disabled Access"],
    covered: false,
    evCharging: false,
    type: "lot"
  },
  {
    id: "park-8",
    name: "Tower Hill Parking",
    location: {
      lat: 51.5097,
      lng: -0.0789
    },
    latitude: 51.5097,
    longitude: -0.0789,
    pricePerHour: 9.70,
    availableSpaces: 28,
    totalSpaces: 75,
    address: "50 Lower Thames St, London EC3R 6DT",
    city: "London",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Electric Vehicle Charging"],
    covered: true,
    evCharging: true,
    type: "street"
  },

  // Reading spots
  {
    id: "reading-1",
    name: "The Oracle Car Park",
    location: { lat: 51.4585, lng: -0.9738 },
    latitude: 51.4585,
    longitude: -0.9738,
    pricePerHour: 5.50,
    availableSpaces: 45,
    totalSpaces: 200,
    address: "5-9 Riverside, Reading RG1 2AG",
    city: "Reading",
    openingHours: "6:00 - 23:00",
    facilities: ["Security Cameras", "Disabled Access"],
    covered: true,
    evCharging: false,
    type: "garage"
  },
  {
    id: "reading-2",
    name: "Reading Station Car Park",
    location: { lat: 51.4618, lng: -0.9733 },
    latitude: 51.4618,
    longitude: -0.9733,
    pricePerHour: 6.20,
    availableSpaces: 12,
    totalSpaces: 150,
    address: "Station Rd, Reading RG1 1LX",
    city: "Reading",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Electric Vehicle Charging"],
    covered: false,
    evCharging: true,
    type: "lot"
  },
  {
    id: "reading-3",
    name: "Broad Street Mall Parking",
    location: { lat: 51.4556, lng: -0.9690 },
    latitude: 51.4556,
    longitude: -0.9690,
    pricePerHour: 4.80,
    availableSpaces: 0,
    totalSpaces: 80,
    address: "Broad St, Reading RG1 2BH",
    city: "Reading",
    openingHours: "7:00 - 22:00",
    facilities: ["Security Cameras", "Disabled Access"],
    covered: true,
    evCharging: false,
    type: "garage"
  },
  {
    id: "reading-4",
    name: "Civic Centre Car Park",
    location: { lat: 51.4544, lng: -0.9663 },
    latitude: 51.4544,
    longitude: -0.9663,
    pricePerHour: 3.50,
    availableSpaces: 23,
    totalSpaces: 120,
    address: "Civic Centre, Reading RG1 7TD",
    city: "Reading",
    openingHours: "6:00 - 20:00",
    facilities: ["Security Cameras"],
    covered: false,
    evCharging: false,
    type: "lot"
  },
  {
    id: "reading-5",
    name: "Castle Street Parking",
    location: { lat: 51.4571, lng: -0.9671 },
    latitude: 51.4571,
    longitude: -0.9671,
    pricePerHour: 4.20,
    availableSpaces: 8,
    totalSpaces: 60,
    address: "Castle St, Reading RG1 7SN",
    city: "Reading",
    openingHours: "8:00 - 18:00",
    facilities: ["Security Cameras"],
    covered: false,
    evCharging: false,
    type: "street"
  },
  {
    id: "reading-6",
    name: "Riverside Retail Park",
    location: { lat: 51.4623, lng: -0.9755 },
    latitude: 51.4623,
    longitude: -0.9755,
    pricePerHour: 2.00,
    availableSpaces: 67,
    totalSpaces: 300,
    address: "Riverside Retail Park, Reading RG1 3QS",
    city: "Reading",
    openingHours: "6:00 - 23:00",
    facilities: ["Security Cameras", "Electric Vehicle Charging"],
    covered: false,
    evCharging: true,
    type: "lot"
  },
  {
    id: "reading-7",
    name: "Gun Street Car Park",
    location: { lat: 51.4558, lng: -0.9704 },
    latitude: 51.4558,
    longitude: -0.9704,
    pricePerHour: 5.00,
    availableSpaces: 18,
    totalSpaces: 90,
    address: "Gun St, Reading RG1 2JR",
    city: "Reading",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Disabled Access"],
    covered: true,
    evCharging: false,
    type: "garage"
  },
  {
    id: "reading-8",
    name: "King's Road Parking",
    location: { lat: 51.4598, lng: -0.9695 },
    latitude: 51.4598,
    longitude: -0.9695,
    pricePerHour: 3.80,
    availableSpaces: 31,
    totalSpaces: 100,
    address: "King's Rd, Reading RG1 4EX",
    city: "Reading",
    openingHours: "7:00 - 19:00",
    facilities: ["Security Cameras"],
    covered: false,
    evCharging: false,
    type: "street"
  },

  // Liverpool spots
  {
    id: "liverpool-1",
    name: "Liverpool ONE Car Park",
    location: { lat: 53.4023, lng: -2.9852 },
    latitude: 53.4023,
    longitude: -2.9852,
    pricePerHour: 6.00,
    availableSpaces: 55,
    totalSpaces: 250,
    address: "5 Wall St, Liverpool L1 8JQ",
    city: "Liverpool",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Electric Vehicle Charging", "Disabled Access"],
    covered: true,
    evCharging: true,
    type: "garage"
  },
  {
    id: "liverpool-2",
    name: "Albert Dock Parking",
    location: { lat: 53.3998, lng: -2.9934 },
    latitude: 53.3998,
    longitude: -2.9934,
    pricePerHour: 4.50,
    availableSpaces: 22,
    totalSpaces: 180,
    address: "Albert Dock, Liverpool L3 4BB",
    city: "Liverpool",
    openingHours: "6:00 - 22:00",
    facilities: ["Security Cameras", "Disabled Access"],
    covered: false,
    evCharging: false,
    type: "lot"
  },
  {
    id: "liverpool-3",
    name: "Lime Street Station Parking",
    location: { lat: 53.4081, lng: -2.9773 },
    latitude: 53.4081,
    longitude: -2.9773,
    pricePerHour: 7.20,
    availableSpaces: 8,
    totalSpaces: 120,
    address: "Lime St, Liverpool L1 1JD",
    city: "Liverpool",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Electric Vehicle Charging"],
    covered: true,
    evCharging: true,
    type: "garage"
  },
  {
    id: "liverpool-4",
    name: "Bold Street Parking",
    location: { lat: 53.4042, lng: -2.9806 },
    latitude: 53.4042,
    longitude: -2.9806,
    pricePerHour: 5.80,
    availableSpaces: 0,
    totalSpaces: 75,
    address: "Bold St, Liverpool L1 4JA",
    city: "Liverpool",
    openingHours: "8:00 - 20:00",
    facilities: ["Security Cameras"],
    covered: false,
    evCharging: false,
    type: "street"
  },
  {
    id: "liverpool-5",
    name: "Cavern Quarter Car Park",
    location: { lat: 53.4060, lng: -2.9850 },
    latitude: 53.4060,
    longitude: -2.9850,
    pricePerHour: 4.00,
    availableSpaces: 35,
    totalSpaces: 95,
    address: "Mathew St, Liverpool L2 6RE",
    city: "Liverpool",
    openingHours: "7:00 - 23:00",
    facilities: ["Security Cameras", "Disabled Access"],
    covered: true,
    evCharging: false,
    type: "garage"
  },
  {
    id: "liverpool-6",
    name: "Queen Square Car Park",
    location: { lat: 53.4083, lng: -2.9831 },
    latitude: 53.4083,
    longitude: -2.9831,
    pricePerHour: 3.50,
    availableSpaces: 48,
    totalSpaces: 140,
    address: "Queen Square, Liverpool L1 1RG",
    city: "Liverpool",
    openingHours: "6:00 - 22:00",
    facilities: ["Security Cameras"],
    covered: false,
    evCharging: false,
    type: "lot"
  },
  {
    id: "liverpool-7",
    name: "Castle Street Parking",
    location: { lat: 53.4077, lng: -2.9888 },
    latitude: 53.4077,
    longitude: -2.9888,
    pricePerHour: 6.50,
    availableSpaces: 12,
    totalSpaces: 85,
    address: "Castle St, Liverpool L2 0NE",
    city: "Liverpool",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Electric Vehicle Charging"],
    covered: true,
    evCharging: true,
    type: "garage"
  },
  {
    id: "liverpool-8",
    name: "Paradise Street Parking",
    location: { lat: 53.4014, lng: -2.9868 },
    latitude: 53.4014,
    longitude: -2.9868,
    pricePerHour: 5.20,
    availableSpaces: 27,
    totalSpaces: 110,
    address: "Paradise St, Liverpool L1 8JF",
    city: "Liverpool",
    openingHours: "7:00 - 21:00",
    facilities: ["Security Cameras", "Disabled Access"],
    covered: false,
    evCharging: false,
    type: "street"
  },

  // Manchester spots
  {
    id: "manchester-1",
    name: "Arndale Centre Car Park",
    location: { lat: 53.4808, lng: -2.2426 },
    latitude: 53.4808,
    longitude: -2.2426,
    pricePerHour: 7.50,
    availableSpaces: 38,
    totalSpaces: 300,
    address: "49 High St, Manchester M4 3AH",
    city: "Manchester",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Electric Vehicle Charging", "Disabled Access"],
    covered: true,
    evCharging: true,
    type: "garage"
  },
  {
    id: "manchester-2",
    name: "Deansgate Car Park",
    location: { lat: 53.4794, lng: -2.2451 },
    latitude: 53.4794,
    longitude: -2.2451,
    pricePerHour: 6.80,
    availableSpaces: 15,
    totalSpaces: 180,
    address: "Deansgate, Manchester M3 2BW",
    city: "Manchester",
    openingHours: "6:00 - 23:00",
    facilities: ["Security Cameras", "Disabled Access"],
    covered: true,
    evCharging: false,
    type: "garage"
  },
  {
    id: "manchester-3",
    name: "Piccadilly Station Parking",
    location: { lat: 53.4773, lng: -2.2309 },
    latitude: 53.4773,
    longitude: -2.2309,
    pricePerHour: 8.20,
    availableSpaces: 42,
    totalSpaces: 200,
    address: "London Rd, Manchester M1 2PB",
    city: "Manchester",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Electric Vehicle Charging"],
    covered: false,
    evCharging: true,
    type: "lot"
  },
  {
    id: "manchester-4",
    name: "Northern Quarter Parking",
    location: { lat: 53.4843, lng: -2.2359 },
    latitude: 53.4843,
    longitude: -2.2359,
    pricePerHour: 5.50,
    availableSpaces: 0,
    totalSpaces: 90,
    address: "Oldham St, Manchester M1 1JQ",
    city: "Manchester",
    openingHours: "8:00 - 20:00",
    facilities: ["Security Cameras"],
    covered: false,
    evCharging: false,
    type: "street"
  },
  {
    id: "manchester-5",
    name: "Spinningfields Car Park",
    location: { lat: 53.4781, lng: -2.2509 },
    latitude: 53.4781,
    longitude: -2.2509,
    pricePerHour: 9.00,
    availableSpaces: 33,
    totalSpaces: 150,
    address: "Spinningfields, Manchester M3 3JE",
    city: "Manchester",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Electric Vehicle Charging", "Valet Service"],
    covered: true,
    evCharging: true,
    type: "garage"
  },
  {
    id: "manchester-6",
    name: "King Street Parking",
    location: { lat: 53.4816, lng: -2.2442 },
    latitude: 53.4816,
    longitude: -2.2442,
    pricePerHour: 6.20,
    availableSpaces: 19,
    totalSpaces: 80,
    address: "King St, Manchester M2 6AZ",
    city: "Manchester",
    openingHours: "7:00 - 22:00",
    facilities: ["Security Cameras", "Disabled Access"],
    covered: false,
    evCharging: false,
    type: "street"
  },
  {
    id: "manchester-7",
    name: "Oxford Road Car Park",
    location: { lat: 53.4713, lng: -2.2400 },
    latitude: 53.4713,
    longitude: -2.2400,
    pricePerHour: 4.80,
    availableSpaces: 51,
    totalSpaces: 220,
    address: "Oxford Rd, Manchester M13 9PL",
    city: "Manchester",
    openingHours: "6:00 - 21:00",
    facilities: ["Security Cameras", "Electric Vehicle Charging"],
    covered: false,
    evCharging: true,
    type: "lot"
  },
  {
    id: "manchester-8",
    name: "Salford Quays Parking",
    location: { lat: 53.4714, lng: -2.2973 },
    latitude: 53.4714,
    longitude: -2.2973,
    pricePerHour: 3.50,
    availableSpaces: 78,
    totalSpaces: 400,
    address: "The Quays, Salford M50 3AZ",
    city: "Manchester",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Disabled Access"],
    covered: false,
    evCharging: false,
    type: "lot"
  },

  // Leeds spots
  {
    id: "leeds-1",
    name: "Trinity Leeds Car Park",
    location: { lat: 53.7969, lng: -1.5446 },
    latitude: 53.7969,
    longitude: -1.5446,
    pricePerHour: 6.50,
    availableSpaces: 44,
    totalSpaces: 280,
    address: "70 Boar Ln, Leeds LS1 6HW",
    city: "Leeds",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Electric Vehicle Charging", "Disabled Access"],
    covered: true,
    evCharging: true,
    type: "garage"
  },
  {
    id: "leeds-2",
    name: "Leeds Station Car Park",
    location: { lat: 53.7955, lng: -1.5487 },
    latitude: 53.7955,
    longitude: -1.5487,
    pricePerHour: 7.80,
    availableSpaces: 26,
    totalSpaces: 150,
    address: "New Station St, Leeds LS1 5DL",
    city: "Leeds",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Electric Vehicle Charging"],
    covered: true,
    evCharging: true,
    type: "garage"
  },
  {
    id: "leeds-3",
    name: "Merrion Centre Parking",
    location: { lat: 53.8014, lng: -1.5393 },
    latitude: 53.8014,
    longitude: -1.5393,
    pricePerHour: 4.20,
    availableSpaces: 67,
    totalSpaces: 200,
    address: "Merrion Way, Leeds LS2 8NG",
    city: "Leeds",
    openingHours: "6:00 - 22:00",
    facilities: ["Security Cameras", "Disabled Access"],
    covered: true,
    evCharging: false,
    type: "garage"
  },
  {
    id: "leeds-4",
    name: "Briggate Street Parking",
    location: { lat: 53.7991, lng: -1.5418 },
    latitude: 53.7991,
    longitude: -1.5418,
    pricePerHour: 5.80,
    availableSpaces: 8,
    totalSpaces: 70,
    address: "Briggate, Leeds LS1 6HD",
    city: "Leeds",
    openingHours: "8:00 - 18:00",
    facilities: ["Security Cameras"],
    covered: false,
    evCharging: false,
    type: "street"
  },
  {
    id: "leeds-5",
    name: "Leeds University Car Park",
    location: { lat: 53.8072, lng: -1.5533 },
    latitude: 53.8072,
    longitude: -1.5533,
    pricePerHour: 3.00,
    availableSpaces: 0,
    totalSpaces: 180,
    address: "University of Leeds, Leeds LS2 9JT",
    city: "Leeds",
    openingHours: "6:00 - 20:00",
    facilities: ["Security Cameras", "Electric Vehicle Charging"],
    covered: false,
    evCharging: true,
    type: "lot"
  },
  {
    id: "leeds-6",
    name: "Headrow Car Park",
    location: { lat: 53.8000, lng: -1.5440 },
    latitude: 53.8000,
    longitude: -1.5440,
    pricePerHour: 6.00,
    availableSpaces: 21,
    totalSpaces: 120,
    address: "The Headrow, Leeds LS1 8TL",
    city: "Leeds",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Disabled Access"],
    covered: true,
    evCharging: false,
    type: "garage"
  },
  {
    id: "leeds-7",
    name: "Crown Point Retail Park",
    location: { lat: 53.7888, lng: -1.5207 },
    latitude: 53.7888,
    longitude: -1.5207,
    pricePerHour: 2.50,
    availableSpaces: 89,
    totalSpaces: 350,
    address: "Crown Point Rd, Leeds LS10 1HR",
    city: "Leeds",
    openingHours: "6:00 - 23:00",
    facilities: ["Security Cameras", "Electric Vehicle Charging"],
    covered: false,
    evCharging: true,
    type: "lot"
  },
  {
    id: "leeds-8",
    name: "Kirkgate Market Parking",
    location: { lat: 53.7973, lng: -1.5383 },
    latitude: 53.7973,
    longitude: -1.5383,
    pricePerHour: 4.50,
    availableSpaces: 34,
    totalSpaces: 90,
    address: "34 George St, Leeds LS2 7HY",
    city: "Leeds",
    openingHours: "7:00 - 19:00",
    facilities: ["Security Cameras"],
    covered: false,
    evCharging: false,
    type: "street"
  },

  // Coventry spots
  {
    id: "coventry-1",
    name: "Belgrade Plaza Car Park",
    location: { lat: 52.4082, lng: -1.5106 },
    latitude: 52.4082,
    longitude: -1.5106,
    pricePerHour: 4.50,
    availableSpaces: 32,
    totalSpaces: 160,
    address: "Belgrade Plaza, Coventry CV1 1DD",
    city: "Coventry",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Electric Vehicle Charging", "Disabled Access"],
    covered: true,
    evCharging: true,
    type: "garage"
  },
  {
    id: "coventry-2",
    name: "Coventry Station Car Park",
    location: { lat: 52.4007, lng: -1.5181 },
    latitude: 52.4007,
    longitude: -1.5181,
    pricePerHour: 5.20,
    availableSpaces: 18,
    totalSpaces: 120,
    address: "Station Square, Coventry CV1 2FL",
    city: "Coventry",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Electric Vehicle Charging"],
    covered: false,
    evCharging: true,
    type: "lot"
  },
  {
    id: "coventry-3",
    name: "Cathedral Lanes Shopping Centre",
    location: { lat: 52.4088, lng: -1.5088 },
    latitude: 52.4088,
    longitude: -1.5088,
    pricePerHour: 3.80,
    availableSpaces: 45,
    totalSpaces: 200,
    address: "7 Cathedral Lanes, Coventry CV1 1LL",
    city: "Coventry",
    openingHours: "6:00 - 22:00",
    facilities: ["Security Cameras", "Disabled Access"],
    covered: true,
    evCharging: false,
    type: "garage"
  },
  {
    id: "coventry-4",
    name: "Broadgate Car Park",
    location: { lat: 52.4098, lng: -1.5120 },
    latitude: 52.4098,
    longitude: -1.5120,
    pricePerHour: 4.00,
    availableSpaces: 0,
    totalSpaces: 85,
    address: "Broadgate, Coventry CV1 1NF",
    city: "Coventry",
    openingHours: "8:00 - 20:00",
    facilities: ["Security Cameras"],
    covered: false,
    evCharging: false,
    type: "street"
  },
  {
    id: "coventry-5",
    name: "University of Coventry Parking",
    location: { lat: 52.4068, lng: -1.4993 },
    latitude: 52.4068,
    longitude: -1.4993,
    pricePerHour: 2.80,
    availableSpaces: 67,
    totalSpaces: 180,
    address: "Priory St, Coventry CV1 5FB",
    city: "Coventry",
    openingHours: "6:00 - 20:00",
    facilities: ["Security Cameras", "Electric Vehicle Charging"],
    covered: false,
    evCharging: true,
    type: "lot"
  },
  {
    id: "coventry-6",
    name: "Whitefriars Car Park",
    location: { lat: 52.4105, lng: -1.5142 },
    latitude: 52.4105,
    longitude: -1.5142,
    pricePerHour: 3.50,
    availableSpaces: 23,
    totalSpaces: 140,
    address: "Whitefriars St, Coventry CV1 2DS",
    city: "Coventry",
    openingHours: "7:00 - 21:00",
    facilities: ["Security Cameras", "Disabled Access"],
    covered: true,
    evCharging: false,
    type: "garage"
  },
  {
    id: "coventry-7",
    name: "Far Gosford Street Parking",
    location: { lat: 52.4021, lng: -1.5048 },
    latitude: 52.4021,
    longitude: -1.5048,
    pricePerHour: 3.20,
    availableSpaces: 41,
    totalSpaces: 100,
    address: "Far Gosford St, Coventry CV1 5ED",
    city: "Coventry",
    openingHours: "8:00 - 18:00",
    facilities: ["Security Cameras"],
    covered: false,
    evCharging: false,
    type: "street"
  },
  {
    id: "coventry-8",
    name: "Arena Shopping Park",
    location: { lat: 52.4203, lng: -1.4897 },
    latitude: 52.4203,
    longitude: -1.4897,
    pricePerHour: 1.50,
    availableSpaces: 156,
    totalSpaces: 400,
    address: "Arena Shopping Park, Coventry CV6 6AS",
    city: "Coventry",
    openingHours: "6:00 - 23:00",
    facilities: ["Security Cameras", "Electric Vehicle Charging"],
    covered: false,
    evCharging: true,
    type: "lot"
  },

  // Leicester spots
  {
    id: "leicester-1",
    name: "Highcross Shopping Centre",
    location: { lat: 52.6342, lng: -1.1397 },
    latitude: 52.6342,
    longitude: -1.1397,
    pricePerHour: 5.50,
    availableSpaces: 48,
    totalSpaces: 250,
    address: "7 Highcross St, Leicester LE1 4SD",
    city: "Leicester",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Electric Vehicle Charging", "Disabled Access"],
    covered: true,
    evCharging: true,
    type: "garage"
  },
  {
    id: "leicester-2",
    name: "Leicester Station Car Park",
    location: { lat: 52.6270, lng: -1.1244 },
    latitude: 52.6270,
    longitude: -1.1244,
    pricePerHour: 6.20,
    availableSpaces: 22,
    totalSpaces: 140,
    address: "London Rd, Leicester LE2 0QB",
    city: "Leicester",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Electric Vehicle Charging"],
    covered: false,
    evCharging: true,
    type: "lot"
  },
  {
    id: "leicester-3",
    name: "Haymarket Shopping Centre",
    location: { lat: 52.6356, lng: -1.1323 },
    latitude: 52.6356,
    longitude: -1.1323,
    pricePerHour: 4.80,
    availableSpaces: 0,
    totalSpaces: 180,
    address: "Haymarket, Leicester LE1 3YG",
    city: "Leicester",
    openingHours: "6:00 - 22:00",
    facilities: ["Security Cameras", "Disabled Access"],
    covered: true,
    evCharging: false,
    type: "garage"
  },
  {
    id: "leicester-4",
    name: "Granby Street Parking",
    location: { lat: 52.6334, lng: -1.1347 },
    latitude: 52.6334,
    longitude: -1.1347,
    pricePerHour: 4.20,
    availableSpaces: 15,
    totalSpaces: 75,
    address: "Granby St, Leicester LE1 6FB",
    city: "Leicester",
    openingHours: "8:00 - 20:00",
    facilities: ["Security Cameras"],
    covered: false,
    evCharging: false,
    type: "street"
  },
  {
    id: "leicester-5",
    name: "King Power Stadium Parking",
    location: { lat: 52.6204, lng: -1.1420 },
    latitude: 52.6204,
    longitude: -1.1420,
    pricePerHour: 3.50,
    availableSpaces: 112,
    totalSpaces: 300,
    address: "Filbert Way, Leicester LE2 7FL",
    city: "Leicester",
    openingHours: "6:00 - 23:00",
    facilities: ["Security Cameras", "Electric Vehicle Charging"],
    covered: false,
    evCharging: true,
    type: "lot"
  },
  {
    id: "leicester-6",
    name: "Abbey Meadows Car Park",
    location: { lat: 52.6398, lng: -1.1301 },
    latitude: 52.6398,
    longitude: -1.1301,
    pricePerHour: 3.00,
    availableSpaces: 34,
    totalSpaces: 120,
    address: "Abbey St, Leicester LE1 3BA",
    city: "Leicester",
    openingHours: "7:00 - 19:00",
    facilities: ["Security Cameras", "Disabled Access"],
    covered: false,
    evCharging: false,
    type: "lot"
  },
  {
    id: "leicester-7",
    name: "Curve Theatre Car Park",
    location: { lat: 52.6413, lng: -1.1368 },
    latitude: 52.6413,
    longitude: -1.1368,
    pricePerHour: 4.50,
    availableSpaces: 28,
    totalSpaces: 90,
    address: "60 Rutland St, Leicester LE1 1SB",
    city: "Leicester",
    openingHours: "6:00 - 24:00",
    facilities: ["Security Cameras", "Electric Vehicle Charging"],
    covered: true,
    evCharging: true,
    type: "garage"
  },
  {
    id: "leicester-8",
    name: "Cultural Quarter Parking",
    location: { lat: 52.6385, lng: -1.1285 },
    latitude: 52.6385,
    longitude: -1.1285,
    pricePerHour: 3.80,
    availableSpaces: 56,
    totalSpaces: 150,
    address: "Peacock Ln, Leicester LE1 5PZ",
    city: "Leicester",
    openingHours: "8:00 - 22:00",
    facilities: ["Security Cameras"],
    covered: false,
    evCharging: false,
    type: "street"
  },

  // Cambridge spots
  {
    id: "cambridge-1",
    name: "Grand Arcade Car Park",
    location: { lat: 52.2053, lng: 0.1218 },
    latitude: 52.2053,
    longitude: 0.1218,
    pricePerHour: 7.20,
    availableSpaces: 35,
    totalSpaces: 180,
    address: "Corn Exchange St, Cambridge CB2 3QF",
    city: "Cambridge",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Electric Vehicle Charging", "Disabled Access"],
    covered: true,
    evCharging: true,
    type: "garage"
  },
  {
    id: "cambridge-2",
    name: "Cambridge Station Car Park",
    location: { lat: 52.1943, lng: 0.1370 },
    latitude: 52.1943,
    longitude: 0.1370,
    pricePerHour: 8.50,
    availableSpaces: 19,
    totalSpaces: 120,
    address: "Station Rd, Cambridge CB1 2JW",
    city: "Cambridge",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Electric Vehicle Charging"],
    covered: false,
    evCharging: true,
    type: "lot"
  },
  {
    id: "cambridge-3",
    name: "Lion Yard Shopping Centre",
    location: { lat: 52.2064, lng: 0.1207 },
    latitude: 52.2064,
    longitude: 0.1207,
    pricePerHour: 6.80,
    availableSpaces: 0,
    totalSpaces: 200,
    address: "Lion Yard, Cambridge CB2 3NA",
    city: "Cambridge",
    openingHours: "6:00 - 22:00",
    facilities: ["Security Cameras", "Disabled Access"],
    covered: true,
    evCharging: false,
    type: "garage"
  },
  {
    id: "cambridge-4",
    name: "King Street Parking",
    location: { lat: 52.2081, lng: 0.1174 },
    latitude: 52.2081,
    longitude: 0.1174,
    pricePerHour: 5.50,
    availableSpaces: 12,
    totalSpaces: 60,
    address: "King St, Cambridge CB1 1LH",
    city: "Cambridge",
    openingHours: "8:00 - 18:00",
    facilities: ["Security Cameras"],
    covered: false,
    evCharging: false,
    type: "street"
  },
  {
    id: "cambridge-5",
    name: "University of Cambridge Parking",
    location: { lat: 52.2042, lng: 0.1149 },
    latitude: 52.2042,
    longitude: 0.1149,
    pricePerHour: 4.00,
    availableSpaces: 67,
    totalSpaces: 150,
    address: "Trinity Ln, Cambridge CB2 1TQ",
    city: "Cambridge",
    openingHours: "6:00 - 20:00",
    facilities: ["Security Cameras", "Electric Vehicle Charging"],
    covered: false,
    evCharging: true,
    type: "lot"
  },
  {
    id: "cambridge-6",
    name: "Park Street Car Park",
    location: { lat: 52.2058, lng: 0.1234 },
    latitude: 52.2058,
    longitude: 0.1234,
    pricePerHour: 6.00,
    availableSpaces: 24,
    totalSpaces: 100,
    address: "Park St, Cambridge CB1 1JH",
    city: "Cambridge",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Disabled Access"],
    covered: true,
    evCharging: false,
    type: "garage"
  },
  {
    id: "cambridge-7",
    name: "Grafton Centre Car Park",
    location: { lat: 52.2158, lng: 0.1434 },
    latitude: 52.2158,
    longitude: 0.1434,
    pricePerHour: 3.50,
    availableSpaces: 89,
    totalSpaces: 300,
    address: "Grafton Centre, Cambridge CB1 1PS",
    city: "Cambridge",
    openingHours: "6:00 - 23:00",
    facilities: ["Security Cameras", "Electric Vehicle Charging"],
    covered: false,
    evCharging: true,
    type: "lot"
  },
  {
    id: "cambridge-8",
    name: "Jesus Lane Parking",
    location: { lat: 52.2118, lng: 0.1249 },
    latitude: 52.2118,
    longitude: 0.1249,
    pricePerHour: 5.20,
    availableSpaces: 18,
    totalSpaces: 80,
    address: "Jesus Ln, Cambridge CB5 8BA",
    city: "Cambridge",
    openingHours: "7:00 - 19:00",
    facilities: ["Security Cameras"],
    covered: false,
    evCharging: false,
    type: "street"
  },

  // Sheffield spots
  {
    id: "sheffield-1",
    name: "Meadowhall Shopping Centre",
    location: { lat: 53.4140, lng: -1.4127 },
    latitude: 53.4140,
    longitude: -1.4127,
    pricePerHour: 4.50,
    availableSpaces: 156,
    totalSpaces: 500,
    address: "Valley Centertainment, Sheffield S9 1EP",
    city: "Sheffield",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Electric Vehicle Charging", "Disabled Access"],
    covered: false,
    evCharging: true,
    type: "lot"
  },
  {
    id: "sheffield-2",
    name: "Sheffield Station Car Park",
    location: { lat: 53.3782, lng: -1.4623 },
    latitude: 53.3782,
    longitude: -1.4623,
    pricePerHour: 6.20,
    availableSpaces: 28,
    totalSpaces: 140,
    address: "Sheaf St, Sheffield S1 2BP",
    city: "Sheffield",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Electric Vehicle Charging"],
    covered: true,
    evCharging: true,
    type: "garage"
  },
  {
    id: "sheffield-3",
    name: "The Moor Car Park",
    location: { lat: 53.3749, lng: -1.4659 },
    latitude: 53.3749,
    longitude: -1.4659,
    pricePerHour: 3.80,
    availableSpaces: 42,
    totalSpaces: 160,
    address: "The Moor, Sheffield S1 4PF",
    city: "Sheffield",
    openingHours: "6:00 - 22:00",
    facilities: ["Security Cameras", "Disabled Access"],
    covered: true,
    evCharging: false,
    type: "garage"
  },
  {
    id: "sheffield-4",
    name: "Fargate Street Parking",
    location: { lat: 53.3808, lng: -1.4700 },
    latitude: 53.3808,
    longitude: -1.4700,
    pricePerHour: 5.20,
    availableSpaces: 0,
    totalSpaces: 75,
    address: "Fargate, Sheffield S1 2HE",
    city: "Sheffield",
    openingHours: "8:00 - 20:00",
    facilities: ["Security Cameras"],
    covered: false,
    evCharging: false,
    type: "street"
  },
  {
    id: "sheffield-5",
    name: "University of Sheffield Parking",
    location: { lat: 53.3811, lng: -1.4885 },
    latitude: 53.3811,
    longitude: -1.4885,
    pricePerHour: 2.80,
    availableSpaces: 73,
    totalSpaces: 200,
    address: "Western Bank, Sheffield S10 2TN",
    city: "Sheffield",
    openingHours: "6:00 - 20:00",
    facilities: ["Security Cameras", "Electric Vehicle Charging"],
    covered: false,
    evCharging: true,
    type: "lot"
  },
  {
    id: "sheffield-6",
    name: "Crucible Theatre Car Park",
    location: { lat: 53.3805, lng: -1.4681 },
    latitude: 53.3805,
    longitude: -1.4681,
    pricePerHour: 4.80,
    availableSpaces: 21,
    totalSpaces: 90,
    address: "55 Norfolk St, Sheffield S1 1DA",
    city: "Sheffield",
    openingHours: "7:00 - 23:00",
    facilities: ["Security Cameras", "Disabled Access"],
    covered: true,
    evCharging: false,
    type: "garage"
  },
  {
    id: "sheffield-7",
    name: "Kelham Island Car Park",
    location: { lat: 53.3944, lng: -1.4729 },
    latitude: 53.3944,
    longitude: -1.4729,
    pricePerHour: 3.20,
    availableSpaces: 45,
    totalSpaces: 120,
    address: "Alma St, Sheffield S3 8SA",
    city: "Sheffield",
    openingHours: "8:00 - 18:00",
    facilities: ["Security Cameras"],
    covered: false,
    evCharging: false,
    type: "street"
  },
  {
    id: "sheffield-8",
    name: "Attercliffe Retail Park",
    location: { lat: 53.3913, lng: -1.4234 },
    latitude: 53.3913,
    longitude: -1.4234,
    pricePerHour: 1.50,
    availableSpaces: 234,
    totalSpaces: 400,
    address: "Attercliffe Common, Sheffield S9 2LX",
    city: "Sheffield",
    openingHours: "6:00 - 23:00",
    facilities: ["Security Cameras", "Electric Vehicle Charging"],
    covered: false,
    evCharging: true,
    type: "lot"
  },

  // Bristol spots
  {
    id: "bristol-1",
    name: "Cabot Circus Car Park",
    location: { lat: 51.4597, lng: -2.5843 },
    latitude: 51.4597,
    longitude: -2.5843,
    pricePerHour: 6.50,
    availableSpaces: 52,
    totalSpaces: 280,
    address: "Glass House, Bristol BS1 3BX",
    city: "Bristol",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Electric Vehicle Charging", "Disabled Access"],
    covered: true,
    evCharging: true,
    type: "garage"
  },
  {
    id: "bristol-2",
    name: "Bristol Temple Meads Station",
    location: { lat: 51.4493, lng: -2.5813 },
    latitude: 51.4493,
    longitude: -2.5813,
    pricePerHour: 7.20,
    availableSpaces: 23,
    totalSpaces: 150,
    address: "Temple Meads Station, Bristol BS1 6QF",
    city: "Bristol",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Electric Vehicle Charging"],
    covered: false,
    evCharging: true,
    type: "lot"
  },
  {
    id: "bristol-3",
    name: "Broadmead Shopping Car Park",
    location: { lat: 51.4584, lng: -2.5916 },
    latitude: 51.4584,
    longitude: -2.5916,
    pricePerHour: 5.80,
    availableSpaces: 0,
    totalSpaces: 200,
    address: "Broadmead, Bristol BS1 3HZ",
    city: "Bristol",
    openingHours: "6:00 - 22:00",
    facilities: ["Security Cameras", "Disabled Access"],
    covered: true,
    evCharging: false,
    type: "garage"
  },
  {
    id: "bristol-4",
    name: "Park Street Parking",
    location: { lat: 51.4538, lng: -2.6021 },
    latitude: 51.4538,
    longitude: -2.6021,
    pricePerHour: 4.80,
    availableSpaces: 16,
    totalSpaces: 70,
    address: "Park St, Bristol BS1 5NG",
    city: "Bristol",
    openingHours: "8:00 - 20:00",
    facilities: ["Security Cameras"],
    covered: false,
    evCharging: false,
    type: "street"
  },
  {
    id: "bristol-5",
    name: "Harbourside Car Park",
    location: { lat: 51.4493, lng: -2.6004 },
    latitude: 51.4493,
    longitude: -2.6004,
    pricePerHour: 5.20,
    availableSpaces: 38,
    totalSpaces: 180,
    address: "Canons Rd, Bristol BS1 5UH",
    city: "Bristol",
    openingHours: "6:00 - 23:00",
    facilities: ["Security Cameras", "Electric Vehicle Charging"],
    covered: false,
    evCharging: true,
    type: "lot"
  },
  {
    id: "bristol-6",
    name: "Clifton Down Shopping Centre",
    location: { lat: 51.4644, lng: -2.6197 },
    latitude: 51.4644,
    longitude: -2.6197,
    pricePerHour: 3.50,
    availableSpaces: 67,
    totalSpaces: 150,
    address: "Whiteladies Rd, Bristol BS8 2NN",
    city: "Bristol",
    openingHours: "7:00 - 21:00",
    facilities: ["Security Cameras", "Disabled Access"],
    covered: true,
    evCharging: false,
    type: "garage"
  },
  {
    id: "bristol-7",
    name: "University of Bristol Parking",
    location: { lat: 51.4585, lng: -2.6030 },
    latitude: 51.4585,
    longitude: -2.6030,
    pricePerHour: 2.50,
    availableSpaces: 89,
    totalSpaces: 220,
    address: "Senate House, Bristol BS8 1TH",
    city: "Bristol",
    openingHours: "6:00 - 20:00",
    facilities: ["Security Cameras", "Electric Vehicle Charging"],
    covered: false,
    evCharging: true,
    type: "lot"
  },
  {
    id: "bristol-8",
    name: "Castle Street Car Park",
    location: { lat: 51.4518, lng: -2.5958 },
    latitude: 51.4518,
    longitude: -2.5958,
    pricePerHour: 4.20,
    availableSpaces: 31,
    totalSpaces: 100,
    address: "Castle St, Bristol BS1 3AD",
    city: "Bristol",
    openingHours: "24/7",
    facilities: ["Security Cameras", "Electric Vehicle Charging"],
    covered: true,
    evCharging: true,
    type: "garage"
  }
];
