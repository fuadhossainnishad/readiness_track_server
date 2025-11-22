const StringToDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year + 2000, month - 1, day);
}

const Converter = {
    StringToDate,
}
export default Converter;