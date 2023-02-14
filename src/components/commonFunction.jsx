// 數字格式化
export const handleNumber = (value) => {
    const tmpValue = value.toString().replaceAll(',', '');
    const parts = tmpValue.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const partJoin = parts.join('.');
    return partJoin;
};
