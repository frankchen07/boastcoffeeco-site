export const BASE_RATE = 300; // TODO: real base rate — floor price, quote never goes below this
export const PER_GUEST_BLOCK_RATE = 50; // TODO: added per each 25 guests
export const GUEST_BLOCK_SIZE = 25;
export const PER_HOUR_RATE = 40; // TODO: added per hour of event duration

export const CART_TYPES = {
  "Standard Cart": 0,
  "Premium Cart": 150, // TODO
} as const;

export const SOLAR_VAN_DELTA = 100; // TODO: can be negative if it should be a discount

export const SPECIAL_DRINKS = {
  Matcha: 25, // TODO
  "Maple Bourbon Latte": 30, // TODO
  "Seasonal Latte": 30, // TODO
} as const;

export type CartType = keyof typeof CART_TYPES;
export type SpecialDrink = keyof typeof SPECIAL_DRINKS;

export function calculateEventEstimate(input: {
  guestCount: number;
  eventStart: string;
  eventEnd: string;
  cartType: CartType;
  solarVan: boolean;
  specialDrinks: SpecialDrink[];
}) {
  const hours =
    (new Date(input.eventEnd).getTime() - new Date(input.eventStart).getTime()) / 3_600_000;
  const guestBlocks = Math.ceil(input.guestCount / GUEST_BLOCK_SIZE);

  const drinksDelta = input.specialDrinks.reduce(
    (sum, d) => sum + SPECIAL_DRINKS[d],
    0
  );
  const cartDelta = CART_TYPES[input.cartType];
  const vanDelta = input.solarVan ? SOLAR_VAN_DELTA : 0;

  const raw =
    BASE_RATE +
    guestBlocks * PER_GUEST_BLOCK_RATE +
    hours * PER_HOUR_RATE +
    cartDelta +
    vanDelta +
    drinksDelta;

  return {
    total: Math.max(BASE_RATE, Math.round(raw)),
    breakdown: { hours, guestBlocks, cartDelta, vanDelta, drinksDelta },
  };
}
