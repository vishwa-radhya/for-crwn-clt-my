
//this runs as stripe instance
import { loadStripe } from "@stripe/stripe-js";

// we need to pass publishiable key
export const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
 );