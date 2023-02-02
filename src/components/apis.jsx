//下拉選單
export const supplierNameList = 'http://http://10.193.130.7:8000/api/v1/Suppliers/all';
export const submarineCableList = 'http://http://10.193.130.7:8000/api/v1/SubmarineCables/all';
export const billMilestoneList = 'http://http://10.193.130.7:8000/api/v1/BillMilestone/';

// 產生發票工作檔
export const generateInvoice = 'http://http://10.193.130.7:8000/api/v1/generateInvoiceWKMaster&InvoiceWKDetail';

// 查詢發票工作檔
export const queryInvoice = 'http://http://10.193.130.7:8000/api/v1/getInvoiceWKMaster&InvoiceWKDetail';

// 更新工作檔狀態
export const updateInvoice = 'http://http://10.193.130.7:8000/api/v1/updateInvoiceWKMaster';

// 刪除發票工作檔
export const deleteInvoiceWKMaster = 'http://http://10.193.130.7:8000/api/v1/deleteInvoiceWKMaster';
export const deleteInvoiceWKDetail = 'http://http://10.193.130.7:8000/api/v1/deleteInvoiceWKDetail';
