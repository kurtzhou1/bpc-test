import { useEffect, useState, useRef } from 'react';
import { Grid, Button, IconButton, Box, Tabs, Tab, Typography, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import { styled } from '@mui/material/styles';

// project import
import MainCard from 'components/MainCard';
import { TabPanel } from 'components/commonFunction';
import ToCombineDataList from './toCombineDataList';
import ToDeductDataList from './toDeductDataList';
import DeductedDataList from './deductedDataList';
import SignedDataList from './signedDataList';
import InvalidatedDataList from './invalidatedDataList';
import DraftDataList from './draftDataList';

import ReceivableQuery from './receivableQuery';

// redux
import { useDispatch } from 'react-redux';
import { setMessageStateOpen } from 'store/reducers/dropdown';

const fakeData = [
    {
        WKDetailID: 1,
        InvDetailID: 1,
        PartyName: 'CHT',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM9a',
        FeeAmountPre: 1288822.32,
        LBRatio: 7.1428571429,
        Difference: 0,
        InvoiceNo: 'DT0170168-1',
        InvMasterID: 1,
        WKMasterID: 1,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Equipment',
        FeeAmountPost: 92058.74,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 2,
        InvDetailID: 2,
        PartyName: 'CHT',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM9a',
        FeeAmountPre: 1178227.94,
        LBRatio: 7.1428571429,
        Difference: 0,
        InvoiceNo: 'DT0170168-1',
        InvMasterID: 1,
        WKMasterID: 1,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Service',
        FeeAmountPost: 84159.14,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 1,
        InvDetailID: 3,
        PartyName: 'SKB',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM9a',
        FeeAmountPre: 1288822.32,
        LBRatio: 7.1428571429,
        Difference: 0,
        InvoiceNo: 'DT0170168-1',
        InvMasterID: 2,
        WKMasterID: 1,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Equipment',
        FeeAmountPost: 92058.74,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 2,
        InvDetailID: 4,
        PartyName: 'SKB',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM9a',
        FeeAmountPre: 1178227.94,
        LBRatio: 7.1428571429,
        Difference: 0,
        InvoiceNo: 'DT0170168-1',
        InvMasterID: 2,
        WKMasterID: 1,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Service',
        FeeAmountPost: 84159.14,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 1,
        InvDetailID: 5,
        PartyName: 'TICC',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM9a',
        FeeAmountPre: 1288822.32,
        LBRatio: 7.1428571429,
        Difference: 0,
        InvoiceNo: 'DT0170168-1',
        InvMasterID: 3,
        WKMasterID: 1,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Equipment',
        FeeAmountPost: 92058.74,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 2,
        InvDetailID: 6,
        PartyName: 'TICC',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM9a',
        FeeAmountPre: 1178227.94,
        LBRatio: 7.1428571429,
        Difference: 0,
        InvoiceNo: 'DT0170168-1',
        InvMasterID: 3,
        WKMasterID: 1,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Service',
        FeeAmountPost: 84159.14,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 1,
        InvDetailID: 7,
        PartyName: 'VNPT',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM9a',
        FeeAmountPre: 1288822.32,
        LBRatio: 7.1428571429,
        Difference: 0,
        InvoiceNo: 'DT0170168-1',
        InvMasterID: 4,
        WKMasterID: 1,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Equipment',
        FeeAmountPost: 92058.74,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 2,
        InvDetailID: 8,
        PartyName: 'VNPT',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM9a',
        FeeAmountPre: 1178227.94,
        LBRatio: 7.1428571429,
        Difference: 0,
        InvoiceNo: 'DT0170168-1',
        InvMasterID: 4,
        WKMasterID: 1,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Service',
        FeeAmountPost: 84159.14,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 1,
        InvDetailID: 9,
        PartyName: 'DHT',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM9a',
        FeeAmountPre: 1288822.32,
        LBRatio: 3.5714285714,
        Difference: 0,
        InvoiceNo: 'DT0170168-1',
        InvMasterID: 5,
        WKMasterID: 1,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Equipment',
        FeeAmountPost: 46029.37,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 2,
        InvDetailID: 10,
        PartyName: 'DHT',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM9a',
        FeeAmountPre: 1178227.94,
        LBRatio: 3.5714285714,
        Difference: 0,
        InvoiceNo: 'DT0170168-1',
        InvMasterID: 5,
        WKMasterID: 1,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Service',
        FeeAmountPost: 42079.57,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 1,
        InvDetailID: 11,
        PartyName: 'Telin',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM9a',
        FeeAmountPre: 1288822.32,
        LBRatio: 3.5714285714,
        Difference: 0,
        InvoiceNo: 'DT0170168-1',
        InvMasterID: 6,
        WKMasterID: 1,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Equipment',
        FeeAmountPost: 46029.37,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 2,
        InvDetailID: 12,
        PartyName: 'Telin',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM9a',
        FeeAmountPre: 1178227.94,
        LBRatio: 3.5714285714,
        Difference: 0,
        InvoiceNo: 'DT0170168-1',
        InvMasterID: 6,
        WKMasterID: 1,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Service',
        FeeAmountPost: 42079.57,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 1,
        InvDetailID: 13,
        PartyName: 'CM',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM9a',
        FeeAmountPre: 1288822.32,
        LBRatio: 28.5714285714,
        Difference: 0,
        InvoiceNo: 'DT0170168-1',
        InvMasterID: 7,
        WKMasterID: 1,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Equipment',
        FeeAmountPost: 368234.95,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 2,
        InvDetailID: 14,
        PartyName: 'CM',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM9a',
        FeeAmountPre: 1178227.94,
        LBRatio: 28.5714285714,
        Difference: 0,
        InvoiceNo: 'DT0170168-1',
        InvMasterID: 7,
        WKMasterID: 1,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Service',
        FeeAmountPost: 336636.55,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 1,
        InvDetailID: 15,
        PartyName: 'EDGE',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM9a',
        FeeAmountPre: 1288822.32,
        LBRatio: 28.5714285714,
        Difference: 0,
        InvoiceNo: 'DT0170168-1',
        InvMasterID: 8,
        WKMasterID: 1,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Equipment',
        FeeAmountPost: 368234.95,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 2,
        InvDetailID: 16,
        PartyName: 'EDGE',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM9a',
        FeeAmountPre: 1178227.94,
        LBRatio: 28.5714285714,
        Difference: 0,
        InvoiceNo: 'DT0170168-1',
        InvMasterID: 8,
        WKMasterID: 1,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Service',
        FeeAmountPost: 336636.55,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 1,
        InvDetailID: 17,
        PartyName: 'KDDI',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM9a',
        FeeAmountPre: 1288822.32,
        LBRatio: 0.0793650794,
        Difference: 0,
        InvoiceNo: 'DT0170168-1',
        InvMasterID: 9,
        WKMasterID: 1,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Equipment',
        FeeAmountPost: 1022.87,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 2,
        InvDetailID: 18,
        PartyName: 'KDDI',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM9a',
        FeeAmountPre: 1178227.94,
        LBRatio: 0.0793650794,
        Difference: 0,
        InvoiceNo: 'DT0170168-1',
        InvMasterID: 9,
        WKMasterID: 1,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Service',
        FeeAmountPost: 935.1,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 1,
        InvDetailID: 19,
        PartyName: 'Singtel',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM9a',
        FeeAmountPre: 1288822.32,
        LBRatio: 7.0634920634,
        Difference: 0,
        InvoiceNo: 'DT0170168-1',
        InvMasterID: 10,
        WKMasterID: 1,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Equipment',
        FeeAmountPost: 91035.86,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 2,
        InvDetailID: 20,
        PartyName: 'Singtel',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM9a',
        FeeAmountPre: 1178227.94,
        LBRatio: 7.0634920634,
        Difference: -0.01,
        InvoiceNo: 'DT0170168-1',
        InvMasterID: 10,
        WKMasterID: 1,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM9a Sea cable manufactured (except 8.5km spare cable))- Service',
        FeeAmountPost: 83224.03,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 3,
        InvDetailID: 21,
        PartyName: 'CHT',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM12',
        FeeAmountPre: 1627300.92,
        LBRatio: 7.1428571429,
        Difference: 0,
        InvoiceNo: 'DT0170168-2',
        InvMasterID: 11,
        WKMasterID: 2,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM12 Branching Units (100%)-Equipment',
        FeeAmountPost: 116235.78,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 4,
        InvDetailID: 22,
        PartyName: 'CHT',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM12',
        FeeAmountPre: 1487661.54,
        LBRatio: 7.1428571429,
        Difference: 0,
        InvoiceNo: 'DT0170168-2',
        InvMasterID: 11,
        WKMasterID: 2,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM12 Branching Units (100%)-Service',
        FeeAmountPost: 106261.54,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 3,
        InvDetailID: 23,
        PartyName: 'CM',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM12',
        FeeAmountPre: 1627300.92,
        LBRatio: 28.5714285714,
        Difference: 0,
        InvoiceNo: 'DT0170168-2',
        InvMasterID: 12,
        WKMasterID: 2,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM12 Branching Units (100%)-Equipment',
        FeeAmountPost: 464943.12,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 4,
        InvDetailID: 24,
        PartyName: 'CM',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM12',
        FeeAmountPre: 1487661.54,
        LBRatio: 28.5714285714,
        Difference: 0,
        InvoiceNo: 'DT0170168-2',
        InvMasterID: 12,
        WKMasterID: 2,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM12 Branching Units (100%)-Service',
        FeeAmountPost: 425046.15,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 3,
        InvDetailID: 25,
        PartyName: 'DHT',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM12',
        FeeAmountPre: 1627300.92,
        LBRatio: 3.5714285714,
        Difference: 0,
        InvoiceNo: 'DT0170168-2',
        InvMasterID: 13,
        WKMasterID: 2,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM12 Branching Units (100%)-Equipment',
        FeeAmountPost: 58117.89,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 4,
        InvDetailID: 26,
        PartyName: 'DHT',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM12',
        FeeAmountPre: 1487661.54,
        LBRatio: 3.5714285714,
        Difference: 0,
        InvoiceNo: 'DT0170168-2',
        InvMasterID: 13,
        WKMasterID: 2,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM12 Branching Units (100%)-Service',
        FeeAmountPost: 53130.77,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 3,
        InvDetailID: 27,
        PartyName: 'EDGE',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM12',
        FeeAmountPre: 1627300.92,
        LBRatio: 28.5714285714,
        Difference: 0,
        InvoiceNo: 'DT0170168-2',
        InvMasterID: 14,
        WKMasterID: 2,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM12 Branching Units (100%)-Equipment',
        FeeAmountPost: 464943.12,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 4,
        InvDetailID: 28,
        PartyName: 'EDGE',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM12',
        FeeAmountPre: 1487661.54,
        LBRatio: 28.5714285714,
        Difference: 0,
        InvoiceNo: 'DT0170168-2',
        InvMasterID: 14,
        WKMasterID: 2,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM12 Branching Units (100%)-Service',
        FeeAmountPost: 425046.15,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 3,
        InvDetailID: 29,
        PartyName: 'KDDI',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM12',
        FeeAmountPre: 1627300.92,
        LBRatio: 0.0793650794,
        Difference: 0,
        InvoiceNo: 'DT0170168-2',
        InvMasterID: 15,
        WKMasterID: 2,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM12 Branching Units (100%)-Equipment',
        FeeAmountPost: 1291.51,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 4,
        InvDetailID: 30,
        PartyName: 'KDDI',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM12',
        FeeAmountPre: 1487661.54,
        LBRatio: 0.0793650794,
        Difference: 0,
        InvoiceNo: 'DT0170168-2',
        InvMasterID: 15,
        WKMasterID: 2,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM12 Branching Units (100%)-Service',
        FeeAmountPost: 1180.68,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 3,
        InvDetailID: 31,
        PartyName: 'Singtel',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM12',
        FeeAmountPre: 1627300.92,
        LBRatio: 7.0634920635,
        Difference: 0,
        InvoiceNo: 'DT0170168-2',
        InvMasterID: 16,
        WKMasterID: 2,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM12 Branching Units (100%)-Equipment',
        FeeAmountPost: 114944.27,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 4,
        InvDetailID: 32,
        PartyName: 'Singtel',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM12',
        FeeAmountPre: 1487661.54,
        LBRatio: 7.0634920635,
        Difference: 0,
        InvoiceNo: 'DT0170168-2',
        InvMasterID: 16,
        WKMasterID: 2,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM12 Branching Units (100%)-Service',
        FeeAmountPost: 105080.85,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 3,
        InvDetailID: 33,
        PartyName: 'SKB',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM12',
        FeeAmountPre: 1627300.92,
        LBRatio: 7.1428571429,
        Difference: 0,
        InvoiceNo: 'DT0170168-2',
        InvMasterID: 17,
        WKMasterID: 2,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM12 Branching Units (100%)-Equipment',
        FeeAmountPost: 116235.78,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 4,
        InvDetailID: 34,
        PartyName: 'SKB',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM12',
        FeeAmountPre: 1487661.54,
        LBRatio: 7.1428571429,
        Difference: 0,
        InvoiceNo: 'DT0170168-2',
        InvMasterID: 17,
        WKMasterID: 2,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM12 Branching Units (100%)-Service',
        FeeAmountPost: 106261.54,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 3,
        InvDetailID: 35,
        PartyName: 'Telin',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM12',
        FeeAmountPre: 1627300.92,
        LBRatio: 3.5714285714,
        Difference: 0,
        InvoiceNo: 'DT0170168-2',
        InvMasterID: 18,
        WKMasterID: 2,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM12 Branching Units (100%)-Equipment',
        FeeAmountPost: 58117.89,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 4,
        InvDetailID: 36,
        PartyName: 'Telin',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM12',
        FeeAmountPre: 1487661.54,
        LBRatio: 3.5714285714,
        Difference: 0,
        InvoiceNo: 'DT0170168-2',
        InvMasterID: 18,
        WKMasterID: 2,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM12 Branching Units (100%)-Service',
        FeeAmountPost: 53130.77,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 3,
        InvDetailID: 37,
        PartyName: 'TICC',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM12',
        FeeAmountPre: 1627300.92,
        LBRatio: 7.1428571429,
        Difference: 0,
        InvoiceNo: 'DT0170168-2',
        InvMasterID: 19,
        WKMasterID: 2,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM12 Branching Units (100%)-Equipment',
        FeeAmountPost: 116235.78,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 4,
        InvDetailID: 38,
        PartyName: 'TICC',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM12',
        FeeAmountPre: 1487661.54,
        LBRatio: 7.1428571429,
        Difference: 0,
        InvoiceNo: 'DT0170168-2',
        InvMasterID: 19,
        WKMasterID: 2,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM12 Branching Units (100%)-Service',
        FeeAmountPost: 106261.54,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 3,
        InvDetailID: 39,
        PartyName: 'VNPT',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM12',
        FeeAmountPre: 1627300.92,
        LBRatio: 7.1428571428,
        Difference: 0,
        InvoiceNo: 'DT0170168-2',
        InvMasterID: 20,
        WKMasterID: 2,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM12 Branching Units (100%)-Equipment',
        FeeAmountPost: 116235.78,
        Status: 'TO_MERGE',
        IsPro: false
    },
    {
        WKDetailID: 4,
        InvDetailID: 40,
        PartyName: 'VNPT',
        SubmarineCable: 'SJC2',
        BillMilestone: 'BM12',
        FeeAmountPre: 1487661.54,
        LBRatio: 7.1428571428,
        Difference: 0.01,
        InvoiceNo: 'DT0170168-2',
        InvMasterID: 20,
        WKMasterID: 2,
        SupplierName: 'NEC',
        WorkTitle: 'Construction',
        FeeItem: 'BM12 Branching Units (100%)-Service',
        FeeAmountPost: 106261.55,
        Status: 'TO_MERGE',
        IsPro: false
    }
];

const GenerateFeeAmount = () => {
    const [value, setValue] = useState(0);
    const [listInfo, setListInfo] = useState([]);
    // const [dataList, setDataList] = useState([]);
    const dispatch = useDispatch();
    const queryApi = useRef('/Status=TO_MERGE');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [cbToCn, setCbToCn] = useState({}); //勾選合併狀態
    // const totalCombineAmount = useRef(0); //勾選合併帳單總金額
    const handleChange = (event, newValue) => {
        setListInfo([]);
        // setDataList([]);
        setValue(newValue);
    };

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`
        };
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };
    const handleDialogOpen = () => {
        if (Object.values(cbToCn).indexOf(true) > -1) {
            setIsDialogOpen(true); //打開的時候才會觸發合併API
        } else {
            dispatch(setMessageStateOpen({ messageStateOpen: { isOpen: true, severity: 'error', message: '請至少勾選一筆發票項目' } }));
        }
    };

    //初始化查詢
    const receivableQuery = () => {
        let tmpQuery = queryApi.current;
        fetch(tmpQuery, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setListInfo(data);
            })
            .catch((e) => {
                console.log('e1=>', e);
            });
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <ReceivableQuery value={value} setListInfo={setListInfo} queryApi={queryApi} />
            </Grid>
            <Grid item xs={12}>
                <MainCard
                    title={`${
                        value == 0 ? '待合併' : value == 1 ? '待抵扣' : value == 2 ? '已抵扣' : value == 3 ? '已簽核' : '已作廢'
                    }帳單資料列表`}
                >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="待合併" {...a11yProps(0)} />
                            <Tab label="待抵扣" {...a11yProps(1)} />
                            <Tab label="已抵扣" {...a11yProps(2)} />
                            <Tab label="已簽核" {...a11yProps(3)} />
                            <Tab label="已作廢" {...a11yProps(4)} />
                        </Tabs>
                        {value == 0 ? (
                            <>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    sx={{
                                        position: 'absolute',
                                        right: 80,
                                        top: 4
                                    }}
                                    onClick={() => {
                                        handleDialogOpen();
                                    }}
                                >
                                    + 合併帳單
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{
                                        position: 'absolute',
                                        right: 0,
                                        top: 4
                                    }}
                                >
                                    Reset
                                </Button>
                            </>
                        ) : (
                            ''
                        )}
                    </Box>
                    <TabPanel value={value} index={0}>
                        <ToCombineDataList
                            handleDialogClose={handleDialogClose}
                            isDialogOpen={isDialogOpen}
                            // dataList={listInfo}
                            dataList={fakeData}
                            // totalCombineAmount={totalCombineAmount}
                            cbToCn={cbToCn}
                            setCbToCn={setCbToCn}
                            receivableQuery={receivableQuery}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ToDeductDataList dataList={listInfo} receivableQuery={receivableQuery} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <DeductedDataList dataList={listInfo} receivableQuery={receivableQuery} />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <SignedDataList dataList={listInfo} receivableQuery={receivableQuery} />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <InvalidatedDataList dataList={listInfo} />
                    </TabPanel>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default GenerateFeeAmount;
