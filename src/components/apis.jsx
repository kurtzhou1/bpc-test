// 共通的下拉選單
export const submarineCableList = 'http://10.193.130.7:8000/api/v1/SubmarineCables/all'; // 海纜名稱
export const partiesList = 'http://10.193.130.7:8000/api/v1/Parties/all'; // 會員名稱

//發票管理下拉選單
export const supplierNameList = 'http://10.193.130.7:8000/api/v1/Suppliers/all';
export const billMilestoneList = 'http://10.193.130.7:8000/api/v1/BillMilestone/';

// 產生發票工作檔
export const generateInvoice = 'http://10.193.130.7:8000/api/v1/generateInvoiceWKMaster&InvoiceWKDetail';

// 查詢發票工作檔
export const queryInvoice = 'http://10.193.130.7:8000/api/v1/getInvoiceWKMaster&InvoiceWKDetail';

// 更新工作檔狀態
export const updateInvoice = 'http://10.193.130.7:8000/api/v1/updateInvoiceWKMaster';

// 刪除發票工作檔
export const deleteInvoiceWKMaster = 'http://10.193.130.7:8000/api/v1/deleteInvoiceWKMaster';
export const deleteInvoiceWKDetail = 'http://10.193.130.7:8000/api/v1/deleteInvoiceWKDetail';

//Liability下拉選單
export const billMilestoneLiabilityList = 'http://10.193.130.7:8000/api/v1/dropdownmenuBillMilestone';
export const submarineCableLiabilityList = 'http://10.193.130.7:8000/api/v1/dropdownmenuSubmarineCable';
export const partiesLiabilityList = 'http://10.193.130.7:8000/api/v1/dropdownmenuParties';
export const workTitleLiabilityList = 'http://10.193.130.7:8000/api/v1/dropdownmenuWorkTitle';

// 查詢Liability
export const queryLiability = 'http://10.193.130.7:8000/api/v1/Liability';
export const compareLiability = 'http://10.193.130.7:8000/api/v1/compareLiability';
export const addLiabilityapi = 'http:/10.193.130.7:8000/api/v1/batchAddLiability';
