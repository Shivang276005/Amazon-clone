import { formatCurrency } from "../scripts/utils/money.js";

describe('Test Suite : formatCurrency',()=>{
  it('Converts cents to dollar',()=>{
    expect(formatCurrency(2095)).toEqual('20.95');
  });
  it('Works with zeros',()=>{
    expect(formatCurrency(0)).toEqual('0.00');
  });
  it('ROund up to nearest cents',()=>{
    expect(formatCurrency(2000.5)).toEqual('20.01');
  })
})