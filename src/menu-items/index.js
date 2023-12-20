// project import
import invoiceWorkManagePage from './invoiceWorkManagePage';
import dashboard from './dashboard';
import createJournal from './createJournal';
import liabilityManage from './liabilityManage';
import creditBalanceManage from './creditBalanceManage';
import CreditMemoManage from './creditMemoManage';
import accountsReceivable from './accountsReceivable';
import supplierPayment from './supplierPayment';
import allResearch from './allResearch';
import notification from './notification';
import uploadManage from './uploadManage';
import setting from './setting';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [
    dashboard,
    invoiceWorkManagePage,
    createJournal,
    accountsReceivable,
    supplierPayment,
    creditBalanceManage,
    CreditMemoManage,
    allResearch,
    liabilityManage,
    notification,
    uploadManage,
    setting
  ],
};

export default menuItems;
