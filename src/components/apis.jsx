// Login
export const generatetoken = "http://internal-cbpsAlb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/generatetoken";
export const checktoken = "http://internal-cbpsAlb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/checktoken";

// 共通的下拉選單
// export const submarineCableList = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/SubmarineCables/all'; // 海纜名稱
export const submarineCableInfoList = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/SubmarineCables/all'; // 海纜名稱
export const supplierNameListForInvoice = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/Suppliers/'; //供應商
export const supplierNameList = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/Suppliers/all'; //供應商
export const supplierNameDropDownUnique = 'http://internal-cbpsAlb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/dropdownmenuSuppliers'; //供應商
// export const supplierNameDropDown = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/Suppliers/'; //供應商有條件的
// export const getPartiesInfoList = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/Parties/all'; // 會員名稱
export const getPartiesInfoList = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/dropdownmenuParties'; // 會員名稱
export const billMilestoneLiabilityList = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/dropdownmenuBillMilestone'; //計帳段號

//發票管理下拉選單
export const billMilestoneList = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/BillMilestone/';

// 產生發票工作檔
export const generateInvoice = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/generateInvoiceWKMaster&InvoiceWKDetail';

// 查詢發票工作檔
export const queryInvoice = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/getInvoiceWKMaster&InvoiceWKDetail';

// 更新工作檔狀態
export const updateInvoice = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/updateInvoiceWKMaster';

// 刪除發票工作檔
export const deleteInvoiceWKMaster = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/deleteInvoiceWKMaster';
export const deleteInvoiceWKDetail = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/deleteInvoiceWKDetail';

//Liability下拉選單
export const submarineCableLiabilityList = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/dropdownmenuSubmarineCable';
export const partiesLiabilityList = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/dropdownmenuParties';
export const workTitleLiabilityList = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/dropdownmenuWorkTitle';
export const updateLiability = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/updateLiability';

// 查詢Liability
export const queryLiability = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/Liability';
export const compareLiability = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/compareLiability';
export const addLiabilityapi = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/batchAddLiability';
export const deleteLiability = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/deleteLiability';
export const dropdownmenuBillMilestone = 'http://internal-cbpsAlb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/dropdownmenuBillMilestone'; 

// 立帳的發票查詢
// export const queryJounary = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/getInvoiceWKMaster&InvoiceWKDetail';
export const toBillDataapi = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/getInvoiceMaster&InvoiceDetailStream';
export const sendJounary = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/addInvoiceMaster&InvoiceDetail';
export const journaryDetailView = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/InvoiceDetail';
export const journaryMasterView = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/InvoiceWKMaster';
export const updateInvoiceMaster = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/updateInvoiceMaster';
export const checkInvoiceNo = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/checkInvoiceNo';

// 應收帳款管理
export const uploadFileApi = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/uploadSignedBillMaster';
export const uploadBillMasterAttachment = 'http://internal-cbpsAlb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/uploadBillMasterAttachment/';

// CB
export const queryCB = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/CreditBalance';
export const generateReport = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/CreditBalanceStatement/generateReport';

// 待合併
export const queryToCombineInvo = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/getInvoiceMaster&InvoiceDetail';
export const combineInvo = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/getBillMaster&BillDetailStream';
export const isBillNoCheckOK = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/checkBillingNo';
export const generateBillNoCovert = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/checkBillingNo/convert';
export const invoCombine = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/initBillMaster&BillDetail';
export const queryToDecutBill = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/getBillMaster&BillDetail';
export const sendDuctInfo = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/generateBillMaster&BillDetail';
export const quertDeductedData = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/getBillMaster&BillDetailWithCBData';

// 產製應收帳款-已抵扣
export const generateBillData = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/getBillMasterDraftStream';
export const contactUser = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/User/all';

// 產製應收帳款-已簽核
export const updateBM = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/updateBillMaster';
export const downBM = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/BillMaster/signedDraft';

// 銷帳
export const sendToWriteOff = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/BillMaster&BillDetail/toWriteOff';

// 廠商付款處理
export const querySupplierPayment = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/payment';
export const sendPayment = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/payment/submit';

//函稿製作
export const queryPaydraft = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/paydraft';

// 退回-發票查詢
export const returnToValidated = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/returnToValidated';
// 退回-待抵扣
export const beforeDuction = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/returnBillMaster/beforeduction';
// 退回-已抵扣
export const afterDeduction = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/returnBillMaster/afterdeduction';
// 發票查詢-作廢
export const afterBilled = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/invalidInvoice/afterBilled';
export const getPayDraftStream = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/getPayDraftStream';
// 全域查詢
export const searchBillMasterByInvoiceWKMaster = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/searchBillMasterByInvoiceWKMaster';
export const searchInvoiceWKMasterByBillMaster = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/searchInvoiceWKMasterByBillMaster';

// 基本資料-Suppliers
export const addSuppliers = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/Suppliers';
export const deleteSuppliers = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/deleteSuppliers';
export const editSuppliers = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/updateSuppliers';

// 基本資料-Parties
export const addParties = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/Parties';
export const getPartiesAllInfo = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/Parties/all'; // 會員名稱
export const deleteParties = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/deleteParties';
export const editParties = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/updateParties';

// 基本資料-Corporates(暫時用不到)
// export const getCorporatesInfo = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/Corporates/all';
// export const addCorporates = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/Corporates';
// export const deleteCorporates = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/deleteCorporates';
// export const editCorporates = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/updateCorporates';

// 基本資料-Contracts
export const getContractsInfo = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/Contracts/all';
export const addContracts = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/Contracts';
export const deleteContracts = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/deleteContracts';
export const editContracts = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/updateContracts';

// 基本資料-SubmarineCables
export const addSubmarineCables = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/SubmarineCables';
export const deleteSubmarineCables = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/deleteSubmarineCables';
export const editSubmarineCables = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/updateSubmarineCables';

// 基本資料-PartiesByContract
export const getPartiesByContractInfo = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/PartiesByContract/all';
export const addPartiesByContract = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/PartiesByContract';
export const deletePartiesByContract = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/deletePartiesByContract';
export const editPartiesByContract = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/updatePartiesByContract';

// 基本資料-Corporates
export const getCorporatesInfo = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/Corporates/all';
export const addCorporates = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/Corporates';
export const deleteCorporates = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/deleteCorporates';
export const editCorporates = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/updateCorporates';

// 基本資料-SuppliersByContract
export const getSuppliersByContractInfo = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/SuppliersByContract/all';
export const addSuppliersByContract = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/SuppliersByContract';
export const deleteSuppliersByContract = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/deleteSuppliersByContract';
export const editSuppliersByContract = 'http://internal-cbpsalb-1176080923.ap-northeast-1.elb.amazonaws.com/api/v1/updateSuppliersByContract';
