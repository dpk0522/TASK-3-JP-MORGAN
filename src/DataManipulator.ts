import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc:number,
  price_def:number,
  ratio:number,
  upper_bond:number,
  lower_bond:number,
  trigger_alert:number|undefined,
  timestamp: Date,
}


export class DataManipulator {
   static generateRow(serverResponds: ServerRespond[]):Row {
    const priceABC = (serverResponds[0].top_ask.price+serverResponds[0].top_bid.price)/2;
    const priceDEF = (serverResponds[1].top_ask.price+serverResponds[1].top_bid.price)/2;
    const ratio = priceABC/priceDEF;
    const upper_bond=1+0.5;
    const lower_bond=1-0.5;
  
      return {
        price_abc:priceABC,
        price_def:priceDEF,
        ratio,
        timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ?
             serverResponds[0].timestamp : serverResponds[1].timestamp,
        upper_bond:upper_bond,
        lower_bond:lower_bond,
        trigger_alert: (ratio > upper_bond||ratio  < lower_bond) ? ratio : undefined,
      };
    }
  }

