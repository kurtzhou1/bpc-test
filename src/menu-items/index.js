// project import
import invoiceWorkManagePage from './invoiceWorkManagePage';
import dashboard from './dashboard';
import createJournal from './createJournal';
import liabilityManage from './liabilityManage';
import creditBalanceManage from './creditBalanceManage';
import creditNoteManage from './creditNoteManage';
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
    creditNoteManage,
    allResearch,
    liabilityManage,
    notification,
    uploadManage,
    setting
  ],
};

export default menuItems;
