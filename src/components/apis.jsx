// let env = 'internal-cbpsAlb-1176080923.ap-northeast-1.elb.amazonaws.com'
// let env = '10.193.130.75:8000';
let env = 'localhost:8000';

export const ssoUrlQA =
    'https://iam-qa.cht.com.tw/auth/realms/B2E/protocol/openid-connect/auth?client_id=CBPS.QA.I&response_type=code&redirect_uri=https://cbpsqa.cht.com.tw&scope=ldap';
export const ssoUrlOL =
    'https://iam.cht.com.tw/auth/realms/B2E/protocol/openid-connect/auth?client_id=CBPS-CBPS.OL.I&response_type=code&redirect_uri=https://cbps.cht.com.tw&scope=ldap';

export const redirectUriQA = 'https://cbpsqa.cht.com.tw';
export const redirectUriOL = 'https://cbps.cht.com.tw';
// 'http://internal-cbpsalbfrontend-1323185980.ap-northeast-1.elb.amazonaws.com';

export const accessSSOQA =
    'https://iam-qa.cht.com.tw/auth/realms/B2E/protocol/openid-connect/token';
export const accessSSOOL = 'https://iam.cht.com.tw/auth/realms/B2E/protocol/openid-connect/token';

// Login
export const generatetoken = `http://${env}/api/v1/generatetoken`;
export const checktoken = `http://${env}/api/v1/checktoken`;
export const checktokenForLDAP = `http://${env}/api/v1/checktokenForLDAP`;

// 產生發票工作檔
export const generateInvoice = `http://${env}/api/v1/generateInvoiceWKMaster&InvoiceWKDetail`;

// 更新工作檔狀態
export const updateInvoice = `http://${env}/api/v1/updateInvoiceWKMaster`;

// 查詢發票工作檔狀態
export const queryInvoice = `http://${env}/api/v1/getInvoiceWKMaster&InvoiceWKDetail`;

// 刪除發票工作檔
export const deleteInvoiceWKMaster = `http://${env}/api/v1/deleteInvoiceWKMaster`;
export const deleteInvoiceWKDetail = `http://${env}/api/v1/deleteInvoiceWKDetail`;

//發票與附件管理
export const uploadInvoiceWKMaster = `http://${env}/api/v1/uploadInvoiceWKMaster`;
export const uploadInvoiceWKMasterAttachment = `http://${env}/api/v1/uploadInvoiceWKMaster/Attachment`;
export const downloadInvoiceWKMaster = `http://${env}/api/v1/downloadInvoiceWKMaster`;
export const downloadInvoiceWKMasterAttachment = `http://${env}/api/v1/downloadInvoiceWKMaster/Attachment`;

//Liability下拉選單
export const updateLiability = `http://${env}/api/v1/updateLiability`;

// 查詢Liability
export const compareLiability = `http://${env}/api/v1/compareLiability`;
export const addLiabilityapi = `http://${env}/api/v1/batchAddLiability`;
export const deleteLiability = `http://${env}/api/v1/deleteLiability`;
export const dropdownmenuBillMilestone = `http://${env}/api/v1/dropdownmenuBillMilestone`;

// 立帳的發票查詢
export const sendJounary = `http://${env}/api/v1/addInvoiceMaster&InvoiceDetail`;
export const updateInvoiceMaster = `http://${env}/api/v1/updateInvoiceMaster`;
export const checkInvoiceNo = `http://${env}/api/v1/checkInvoiceNo`;

// 立帳與附件管理
export const uploadSignedBillMaster = `http://${env}/api/v1/uploadSignedBillMaster`;
export const downloadBillMaster = `http://${env}/api/v1/downloadBillMaster`;
export const downloadBillMasterAttachment = `http://${env}/api/v1/downloadBillMaster/Attachment`;
export const billMasterAndAttachment = `http://${env}/api/v1/SendEmail/BillMasterAndAttachment`;

// 應收帳款管理
export const uploadFileApi = `http://${env}/api/v1/uploadSignedBillMaster`;
export const uploadBillMasterAttachment = `http://${env}/api/v1/uploadBillMasterAttachment`;

// CB
export const generateReport = `http://${env}/api/v1/CreditBalanceStatement/generateReport`;

// CM
// export const creditMemoApi = `http://${env}/api/v1/CreditMemo`;
export const creditMemoView = `http://${env}/api/v1/CreditMemo/view`;
export const getCreditMemoStreamApi = `http://${env}/api/v1/getCreditMemoStream`;
export const uploadCreditMemoApi = `http://${env}/api/v1/uploadCreditMemo`;
export const downloadCreditMemoApi = `http://${env}/api/v1/downloadCreditMemo`;

// 待合併
export const combineInvo = `http://${env}/api/v1/getBillMaster&BillDetailStream`;
export const isBillNoCheckOK = `http://${env}/api/v1/checkBillingNo`;
export const generateBillNoCovert = `http://${env}/api/v1/checkBillingNo/convert`;
export const invoCombine = `http://${env}/api/v1/initBillMaster&BillDetail`;
export const sendDuctInfo = `http://${env}/api/v1/generateBillMaster&BillDetail`;

// 產製應收帳款-已抵扣
export const generateBillData = `http://${env}/api/v1/getBillMasterDraftStream`;

// 產製應收帳款-已簽核
export const updateBM = `http://${env}/api/v1/updateBillMaster`;
// export const downBM = `http://${env}/api/v1/BillMaster/signedDraft`;

// 產製應收帳款-帳單與附件管理
// export const attachment = `http://${env}/api/v1/BillMaster/attachment`;

// 銷帳
// export const sendToWriteOff = `http://${env}/api/v1/BillMaster&BillDetail/toWriteOff`;
export const getWriteOffDetail = `http://${env}/api/v1/getWriteOffDetail`;
export const getBillMasterBillDetail = `http://${env}/api/v1/getBillMaster&BillDetail`;
export const saveWriteOff = `http://${env}/api/v1/WriteOffDetail/saveWriteOff`;
export const submitWriteOff = `http://${env}/api/v1/BillMaster&BillDetail/submitWriteOff`;
export const completeWriteOff = `http://${env}/api/v1/completeWriteOff`;

// 廠商付款處理
export const sendPayment = `http://${env}/api/v1/payment/submit`;
export const getPayMasterPayStatement = `http://${env}/api/v1/getPayMaster&PayStatement`;

// 退回-發票查詢
export const returnToValidated = `http://${env}/api/v1/returnToValidated`;
// 退回-待抵扣
export const beforeDuction = `http://${env}/api/v1/returnBillMaster/beforeduction`;
// 退回-已抵扣
export const afterDeduction = `http://${env}/api/v1/returnBillMaster/afterdeduction`;
// 發票查詢-作廢
export const afterBilled = `http://${env}/api/v1/invalidInvoice/afterBilled`;
export const getPayDraftStream = `http://${env}/api/v1/getPayDraftStream`;
export const getPayDraftStreamCBRefund = `http://${env}/api/v1/getPayDraftStream/CBRefund`;
// 全域查詢
export const searchBillMasterByInvoiceWKMaster = `http://${env}/api/v1/searchBillMasterByInvoiceWKMaster`;
export const searchInvoiceWKMasterByBillMaster = `http://${env}/api/v1/searchInvoiceWKMasterByBillMaster`;
export const searchInvoiceWKMasterIsBilled = `http://${env}/api/v1/searchInvoiceWKMasterIsBilled`;

// 基本資料-Suppliers
export const suppliers = `http://${env}/api/v1/Suppliers`;
export const deleteSuppliers = `http://${env}/api/v1/deleteSuppliers`;
export const editSuppliers = `http://${env}/api/v1/updateSuppliers`;

// 基本資料-Parties
export const parties = `http://${env}/api/v1/Parties`;
export const deleteParties = `http://${env}/api/v1/deleteParties`;
export const editParties = `http://${env}/api/v1/updateParties`;

// 基本資料-Contracts
// export const addContracts = `http://${env}/api/v1/Contracts`;
// export const deleteContracts = `http://${env}/api/v1/deleteContracts`;
// export const editContracts = `http://${env}/api/v1/updateContracts`;

// 基本資料-SubmarineCables
export const submarineCables = `http://${env}/api/v1/SubmarineCables`;
export const deleteSubmarineCables = `http://${env}/api/v1/deleteSubmarineCables`;
export const editSubmarineCables = `http://${env}/api/v1/updateSubmarineCables`;

// 基本資料-PartiesByContract
// export const addPartiesByContract = `http://${env}/api/v1/PartiesByContract`;
// export const deletePartiesByContract = `http://${env}/api/v1/deletePartiesByContract`;
// export const editPartiesByContract = `http://${env}/api/v1/updatePartiesByContract`;

// 基本資料-Corporates
export const corporates = `http://${env}/api/v1/Corporates`;
export const deleteCorporates = `http://${env}/api/v1/deleteCorporates`;
export const editCorporates = `http://${env}/api/v1/updateCorporates`;

// 通知
export const addBillNotifyRule = `http://${env}/api/v1/Notification/BillMaster/addBillNotifyRule`;
export const addSysInvNotifyRule = `http://${env}/api/v1/Notification/InvoiceWKMaster/addSysInvNotifyRule&SysInvNotifyRecipients`;
export const getSysInvNotifyRule = `http://${env}/api/v1/Notification/InvoiceWKMaster/getSysInvNotifyRule&SysInvNotifyRecipients`;
export const updateSysInvNotifyRule = `http://${env}/api/v1/Notification/InvoiceWKMaster/updateSysInvNotifyRule&SysInvNotifyRecipients`;
export const deleteSysInvNotifyRule = `http://${env}/api/v1/Notification/InvoiceWKMaster/deleteSysInvNotifyRule`;

// GET
export const supplierNameListForInvoice = `http://${env}/api/v1/Suppliers/`; //供應商
export const supplierNameDropDownUnique = `http://${env}/api/v1/dropdownmenuSuppliers`; //供應商
export const submarineCableInfoList = `http://${env}/api/v1/SubmarineCables/all`; // 海纜名稱
export const supplierNameList = `http://${env}/api/v1/Suppliers/all`; //供應商
export const getPartiesInfoList = `http://${env}/api/v1/dropdownmenuParties`; // 會員名稱
export const billMilestoneLiabilityList = `http://${env}/api/v1/dropdownmenuBillMilestone`; //計帳段號
export const billMilestoneList = `http://${env}/api/v1/BillMilestone/`;
export const submarineCableLiabilityList = `http://${env}/api/v1/dropdownmenuSubmarineCable`;
export const partiesLiabilityList = `http://${env}/api/v1/dropdownmenuParties`;
// export const workTitleLiabilityList = `http://${env}/api/v1/dropdownmenuWorkTitle`;
export const queryLiability = `http://${env}/api/v1/Liability`;
export const toBillDataapi = `http://${env}/api/v1/getInvoiceMaster&InvoiceDetailStream`;
export const journaryDetailView = `http://${env}/api/v1/InvoiceDetail`;
export const journaryMasterView = `http://${env}/api/v1/InvoiceWKMaster`;
export const queryToCombineInvo = `http://${env}/api/v1/getInvoiceMaster&InvoiceDetail`;
export const queryToDecutBill = `http://${env}/api/v1/getBillMaster&BillDetail`;
export const quertDeductedData = `http://${env}/api/v1/getBillMaster&BillDetailWithCBData`;
export const contactUser = `http://${env}/api/v1/User/all`;
export const querySupplierPayment = `http://${env}/api/v1/payment`;
export const queryPaydraft = `http://${env}/api/v1/paydraft`;
export const getPartiesAllInfo = `http://${env}/api/v1/Parties/all`; // 會員名稱
// export const getContractsInfo = `http://${env}/api/v1/Contracts/all`;
export const getCorporatesInfo = `http://${env}/api/v1/Corporates/all`;
// export const getPartiesByContractInfo = `http://${env}/api/v1/PartiesByContract/all`;

// CreditBalance
export const queryCB = `http://${env}/api/v1/CreditBalance`;
export const creditBalanceRefund = `http://${env}/api/v1/CreditBalance/refund`;
export const refundView = `http://${env}/api/v1/CBStatement/Refund/view`;
export const cBRefund = `http://${env}/api/v1/initPayDraft/CBRefund`;
export const cBRefundView = `http://${env}/api/v1/initPayDraft/CBRefund/view`;
export const uploadPayDraft = `http://${env}/api/v1/uploadPayDraft/CBRefund`;
export const updatePayDraft = `http://${env}/api/v1/updatePayDraft/CBRefund`;
export const getInvoiceWKMasterInvoiceWKDetail = `http://${env}/api/v1/getInvoiceWKMaster&InvoiceWKDetail`;
