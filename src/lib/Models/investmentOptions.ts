type InterestRate = {
    min: number;
    max: number;
};

type InvestmentOption = {
    label: string;
    interestRate: InterestRate;
    volatility: boolean;
};

export const investmentProperties: InvestmentOption[] = [
    { label: 'Girokonto', interestRate: { min: 0, max: 0 }, volatility: false },
    { label: 'Tagesgeldkonto', interestRate: { min: 0.01, max: 0.01 }, volatility: false },
    { label: 'ETF Depot', interestRate: { min: -0.02, max: 0.06 }, volatility: true }
]

export const investmentOptions = Object.values(investmentProperties).map(option => option.label);
  