// 數字格式化
export const handleNumber = (value) => {
    console.log('value=>>', value);
    const tmpValue = value.toString().replaceAll(',', '');
    const parts = tmpValue.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const partJoin = parts.join('.');
    return partJoin;
    // test1
    // console.log('v=>>', v);
    // let vDigi = v.substring(v.indexOf('.'));
    // let vInt = v.substring(0, v.indexOf('.'));
    // vInt = vInt.replaceAll(',', '');
    // if (vInt.length > 3) {
    //     vInt = moneyFormat(str.substr(0, str.length - 3)) + ',' + str.substr(str.length - 3);
    // }
    // test2
    // let tmp = Number(v.replaceAll(',', ''));
    // console.log('tmp=>>', tmp, typeof tmp);
    // let internationalNumberFormat;
    // internationalNumberFormat = new Intl.NumberFormat('en-US');
    // let test = internationalNumberFormat.format(tmp);
    // console.log('test=>>', test);
};
