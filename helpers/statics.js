const getAverageCost  = (array)=>{
    const sumWithInitial = array.reduce((previousValue, currentValue) => previousValue + currentValue);
    const avgCost = Math.floor(sumWithInitial/array.length);
    return avgCost;
}

export {getAverageCost};