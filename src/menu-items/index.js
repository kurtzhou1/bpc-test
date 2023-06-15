// project import
import invoiceWorkManagePage from './invoiceWorkManagePage';
import dashboard from './dashboard';
import createJournal from './createJournal';
// import liabilityManage from './liabilityManage';
import creditBalanceManage from './creditBalanceManage';
import creditNoteManage from './creditNoteManage';
import accountsReceivable from './accountsReceivable';
import supplierPayment from './supplierPayment';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    // items: [dashboard, pages, utilities, support]
    items: [dashboard, invoiceWorkManagePage, createJournal, accountsReceivable, supplierPayment, creditBalanceManage, creditNoteManage]
};

export default menuItems;
