// 共通的下拉選單
export const submarineCableList = 'http://10.193.130.7:8000/api/v1/SubmarineCables/all'; // 海纜名稱
export const partiesList = 'http://10.193.130.7:8000/api/v1/Parties/all'; // 會員名稱

//發票管理下拉選單
export const supplierNameList = 'http://10.193.130.7:8000/api/v1/Suppliers/all';
export const billMilestoneList = 'http://10.193.130.7:8000/api/v1/BillMilestone/';
export const queryBillMilestoneList = 'http://10.193.130.7:8000/api/v1/dropdownmenuBillMilestone';

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
export const updateLiability = 'http://10.193.130.7:8000/api/v1/updateLiability';

// 查詢Liability
export const queryLiability = 'http://10.193.130.7:8000/api/v1/Liability';
export const compareLiability = 'http://10.193.130.7:8000/api/v1/compareLiability';
export const addLiabilityapi = 'http://10.193.130.7:8000/api/v1/batchAddLiability';
export const deleteLiability = 'http://10.193.130.7:8000/api/v1/deleteLiability';

// 立帳的發票查詢
export const queryJounary = 'http://10.193.130.7:8000/api/v1/getInvoiceWKMaster&InvoiceWKDetail';
export const toBillDataapi = 'http://10.193.130.7:8000/api/v1/getInvoiceMaster&InvoiceDetailStream';
export const sendJounary = 'http://10.193.130.7:8000/api/v1/addInvoiceMaster&InvoiceDetail';
export const journaryDetailView = 'http://10.193.130.7:8000/api/v1/InvoiceDetail';
export const journaryMasterView = 'http://10.193.130.7:8000/api/v1/InvoiceWKMaster';
export const updateInvoiceMaster = 'http://10.193.130.7:8000/api/v1/updateInvoiceMaster';

// 應收帳款管理
export const uploadFileApi = 'http://10.193.130.7:8000/api/v1/uploadfile';

// 基本資料-Suppliers
export const getSuppliersInfo = 'http://10.193.130.7:8000/api/v1/Suppliers/all';
export const addSuppliers = 'http://10.193.130.7:8000/api/v1/Suppliers';
export const deleteSuppliers = 'http://10.193.130.7:8000/api/v1/deleteSuppliers';
export const editSuppliers = 'http://10.193.130.7:8000/api/v1/updateSuppliers';

// 基本資料-Partiess
export const getPartiesInfo = 'http://10.193.130.7:8000/api/v1/Parties/all';
export const addParties = 'http://10.193.130.7:8000/api/v1/Parties';
export const deleteParties = 'http://10.193.130.7:8000/api/v1/deleteParties';
export const editParties = 'http://10.193.130.7:8000/api/v1/updateParties';
