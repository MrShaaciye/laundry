const numberFormatter = (value, locale = `en-US`) => {
    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export default numberFormatter;
