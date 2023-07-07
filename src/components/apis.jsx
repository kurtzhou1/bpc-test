// 共通的下拉選單
export const submarineCableList = 'http://10.193.130.7:8000/api/v1/SubmarineCables/all'; // 海纜名稱
export const supplierNameListForInvoice = 'http://10.193.130.7:8000/api/v1/Suppliers/'; //供應商
export const supplierNameList = 'http://10.193.130.7:8000/api/v1/Suppliers/all'; //供應商
// export const getPartiesInfoList = 'http://10.193.130.7:8000/api/v1/Parties/all'; // 會員名稱
export const getPartiesInfoList = 'http://10.193.130.7:8000/api/v1/dropdownmenuParties'; // 會員名稱
export const billMilestoneLiabilityList = 'http://10.193.130.7:8000/api/v1/dropdownmenuBillMilestone'; //計帳段號

//發票管理下拉選單
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
// export const queryJounary = 'http://10.193.130.7:8000/api/v1/getInvoiceWKMaster&InvoiceWKDetail';
export const toBillDataapi = 'http://10.193.130.7:8000/api/v1/getInvoiceMaster&InvoiceDetailStream';
export const sendJounary = 'http://10.193.130.7:8000/api/v1/addInvoiceMaster&InvoiceDetail';
export const journaryDetailView = 'http://10.193.130.7:8000/api/v1/InvoiceDetail';
export const journaryMasterView = 'http://10.193.130.7:8000/api/v1/InvoiceWKMaster';
export const updateInvoiceMaster = 'http://10.193.130.7:8000/api/v1/updateInvoiceMaster';
export const checkInvoiceNo = 'http://10.193.130.7:8000/api/v1/checkInvoiceNo';

// 應收帳款管理
export const uploadFileApi = 'http://10.193.130.7:8000/api/v1/uploadSignedBillMaster';

// CB
export const queryCB = 'http://10.193.130.7:8000/api/v1/CreditBalance';
export const generateReport = 'http://10.193.130.7:8000/api/v1/CreditBalanceStatement/generateReport';

// 待合併
export const queryToCombineInvo = 'http://10.193.130.7:8000/api/v1/getInvoiceMaster&InvoiceDetail';
export const combineInvo = 'http://10.193.130.7:8000/api/v1/getBillMaster&BillDetailStream';
export const isBillNoCheckOK = 'http://10.193.130.7:8000/api/v1/checkBillingNo';
export const generateBillNoCovert = 'http://10.193.130.7:8000/api/v1/checkBillingNo/convert';
export const invoCombine = 'http://10.193.130.7:8000/api/v1/initBillMaster&BillDetail';
export const queryToDecutBill = 'http://10.193.130.7:8000/api/v1/getBillMaster&BillDetail';
export const sendDuctInfo = 'http://10.193.130.7:8000/api/v1/generateBillMaster&BillDetail';
export const quertDeductedData = 'http://10.193.130.7:8000/api/v1/getBillMaster&BillDetailWithCBData';

// 產製應收帳款-已抵扣
export const generateBillData = 'http://10.193.130.7:8000/api/v1/getBillMasterDraftStream';
export const contactUser = 'http://10.193.130.7:8000/api/v1/User/all';

// 產製應收帳款-已簽核
export const updateBM = 'http://10.193.130.7:8000/api/v1/updateBillMaster';
export const downBM = 'http://10.193.130.7:8000/api/v1/BillMaster/signedDraft';

// 銷帳
export const sendToWriteOff = 'http://10.193.130.7:8000/api/v1/BillMaster&BillDetail/toWriteOff';

// 廠商付款處理
export const querySupplierPayment = 'http://10.193.130.7:8000/api/v1/payment';
export const sendPayment = 'http://10.193.130.7:8000/api/v1/payment/submit';

//函稿製作
export const queryPaydraft = 'http://10.193.130.7:8000/api/v1/paydraft';

// 退回-發票查詢
export const returnToValidated = 'http://10.193.130.7:8000/api/v1/returnToValidated';
// 退回-待抵扣
export const beforeDuction = 'http://10.193.130.7:8000/api/v1/returnBillMaster/beforeduction';
// 退回-已抵扣
export const afterDeduction = 'http://10.193.130.7:8000/api/v1/returnBillMaster/afterdeduction';
// 發票查詢-作廢
export const afterBilled = 'http://10.193.130.7:8000/api/v1/invalidInvoice/afterBilled';

export const getPayDraftStream = 'http://10.193.130.7:8000/api/v1/getPayDraftStream';

// 基本資料-Suppliers
export const addSuppliers = 'http://10.193.130.7:8000/api/v1/Suppliers';
export const deleteSuppliers = 'http://10.193.130.7:8000/api/v1/deleteSuppliers';
export const editSuppliers = 'http://10.193.130.7:8000/api/v1/updateSuppliers';

// 基本資料-Parties
export const addParties = 'http://10.193.130.7:8000/api/v1/Parties';
export const getPartiesAllInfo = 'http://10.193.130.7:8000/api/v1/Parties/all'; // 會員名稱
export const deleteParties = 'http://10.193.130.7:8000/api/v1/deleteParties';
export const editParties = 'http://10.193.130.7:8000/api/v1/updateParties';

// 基本資料-Corporates(暫時用不到)
// export const getCorporatesInfo = 'http://10.193.130.7:8000/api/v1/Corporates/all';
// export const addCorporates = 'http://10.193.130.7:8000/api/v1/Corporates';
// export const deleteCorporates = 'http://10.193.130.7:8000/api/v1/deleteCorporates';
// export const editCorporates = 'http://10.193.130.7:8000/api/v1/updateCorporates';

// 基本資料-Contracts
export const getContractsInfo = 'http://10.193.130.7:8000/api/v1/Contracts/all';
export const addContracts = 'http://10.193.130.7:8000/api/v1/Contracts';
export const deleteContracts = 'http://10.193.130.7:8000/api/v1/deleteContracts';
export const editContracts = 'http://10.193.130.7:8000/api/v1/updateContracts';

// 基本資料-SubmarineCables
export const addSubmarineCables = 'http://10.193.130.7:8000/api/v1/SubmarineCables';
export const deleteSubmarineCables = 'http://10.193.130.7:8000/api/v1/deleteSubmarineCables';
export const editSubmarineCables = 'http://10.193.130.7:8000/api/v1/updateSubmarineCables';

// 基本資料-PartiesByContract
export const getPartiesByContractInfo = 'http://10.193.130.7:8000/api/v1/PartiesByContract/all';
export const addPartiesByContract = 'http://10.193.130.7:8000/api/v1/PartiesByContract';
export const deletePartiesByContract = 'http://10.193.130.7:8000/api/v1/deletePartiesByContract';
export const editPartiesByContract = 'http://10.193.130.7:8000/api/v1/updatePartiesByContract';

// 基本資料-Corporates
export const getCorporatesInfo = 'http://10.193.130.7:8000/api/v1/Corporates/all';
export const addCorporates = 'http://10.193.130.7:8000/api/v1/Corporates';
export const deleteCorporates = 'http://10.193.130.7:8000/api/v1/deleteCorporates';
export const editCorporates = 'http://10.193.130.7:8000/api/v1/updateCorporates';

// 基本資料-SuppliersByContract
export const getSuppliersByContractInfo = 'http://10.193.130.7:8000/api/v1/SuppliersByContract/all';
export const addSuppliersByContract = 'http://10.193.130.7:8000/api/v1/SuppliersByContract';
export const deleteSuppliersByContract = 'http://10.193.130.7:8000/api/v1/deleteSuppliersByContract';
export const editSuppliersByContract = 'http://10.193.130.7:8000/api/v1/updateSuppliersByContract';
