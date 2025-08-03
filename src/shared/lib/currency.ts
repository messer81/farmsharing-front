// src/utils/currency.ts
const exchangeRateUSDToILS = 3.5; // Примерный курс обмена

export const convertCurrency = (amount: number, currency: 'ILS' | 'USD') => {
    if (currency === 'USD') {
        return amount / exchangeRateUSDToILS;
    }
    return amount * exchangeRateUSDToILS;
};