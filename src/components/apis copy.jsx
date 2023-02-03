//下拉選單
export const supplierNameList = 'http://127.0.0.1:8000/api/v1/Suppliers/all';
export const submarineCableList = 'http://127.0.0.1:8000/api/v1/SubmarineCables/all';
export const billMilestoneList = 'http://127.0.0.1:8000/api/v1/BillMilestone/';

// 產生發票工作檔
export const generateInvoice = 'http://127.0.0.1:8000/api/v1/generateInvoiceWKMaster&InvoiceWKDetail';

// 查詢發票工作檔
export const queryInvoice = 'http://127.0.0.1:8000/api/v1/getInvoiceWKMaster&InvoiceWKDetail';

// 更新工作檔狀態
export const updateInvoice = 'http://127.0.0.1:8000/api/v1/updateInvoiceWKMaster';

// 刪除發票工作檔
export const deleteInvoiceWKMaster = 'http://127.0.0.1:8000/api/v1/deleteInvoiceWKMaster';
export const deleteInvoiceWKDetail = 'http://127.0.0.1:8000/api/v1/deleteInvoiceWKDetail';
