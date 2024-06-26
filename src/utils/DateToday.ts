function getDateToday() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export { getDateToday }