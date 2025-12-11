const { useState, useMemo } = React;

export function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [convertFrom, setConvertFrom] = useState('USD');
  const [convertTo, setConvertTo] = useState('EUR');

  const currencyOptions = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.78,
    JPY: 156.7,
  };

  const baseConvertedAmounts = useMemo(() => {
    if (!convertFrom) return {};
    const fromRate = currencyOptions[convertFrom];
    const amounts = {};
    for (const [currency, rate] of Object.entries(currencyOptions)) {
      amounts[currency] = (amount * rate / fromRate).toFixed(2);
    }
    return amounts;
  }, [amount, convertFrom]); 

  const convertedAmount = convertTo ? `${baseConvertedAmounts[convertTo]} ${convertTo}` : '';

  return (
    <div className="currencyConverter">
      <h1>Currency Converter</h1>

      <label htmlFor="amount">Amount:</label>
      <input
        id="amount"
        type="number"
        min="0"
        value={amount}
        onChange={e => setAmount(Number(e.target.value))}
      />

      <label htmlFor="convertFrom">Start Currency:</label>
      <select
        id="convertFrom"
        value={convertFrom}
        onChange={e => setConvertFrom(e.target.value)}
      >
        {Object.keys(currencyOptions).map(currency => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>

      <label htmlFor="convertTo">Target Currency:</label>
      <select
        id="convertTo"
        value={convertTo}
        onChange={e => setConvertTo(e.target.value)}
      >
        {Object.keys(currencyOptions).map(currency => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>

      <p>Converted Amount: {convertedAmount}</p>
    </div>
  );
}
