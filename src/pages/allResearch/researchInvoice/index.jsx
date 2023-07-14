import { useState, useRef } from 'react';
import { Grid, Button } from '@mui/material';
// import { styled } from '@mui/material/styles';

// project import
import MainCard from 'components/MainCard';
import ResearchInvoiceQuery from './researchInvoiceQuery';
import ResearchInvoiceDataList from './researchInvoiceDataList';
import ResearchInvoiceDetail from './researchInvoiceDetail';

// redux
import { useSelector } from 'react-redux';

const fakeData = [
    {
        BillMaster: {
            WorkTitle: 'Upgrade',
            BillingNo: '01UP-KT2304181348',
            PONo: '',
            PartyName: 'KT',
            DueDate: '2023-06-02T00:00:00',
            ReceivedAmountSum: 66437.27,
            IsPro: false,
            URI: 's3://cht-deploy-bucket-1/KT.pdf',
            SubmarineCable: 'NCP',
            BillMasterID: 8,
            IssueDate: '2023-04-21T00:00:00',
            FeeAmountSum: 66442.16,
            BankFees: 4.89,
            Status: 'COMPLETE ',
            BillMilestone: '2022.B_BM0'
        },
        InvoiceWKMaster: [
            {
                IssueDate: '2023-04-10T12:00:00',
                DedAmount: null,
                DueDate: '2023-06-09T12:00:00',
                PaidAmount: 0.0,
                InvoiceNo: '88561',
                PartyName: '',
                CreateDate: '2023-04-18T10:53:44',
                WKMasterID: 23,
                IsPro: false,
                PaidDate: null,
                SupplierName: 'Ciena-US',
                IsRecharge: false,
                Status: 'PAYING',
                SubmarineCable: 'NCP',
                IsLiability: true,
                WorkTitle: 'Upgrade',
                IsCreditMemo: null,
                ContractType: 'SC',
                TotalAmount: 123028.76,
                BillMasterIDList: [8],
                BillMilestone: '2022.B_BM0'
            }
        ]
    }
];

const ResearchInvoice = () => {
    const { partiesList, subCableList } = useSelector((state) => state.dropdown); //供應商下拉選單 + 海纜名稱下拉選單
    const queryApi = useRef('/all');
    const [listInfo, setListInfo] = useState([]);
    const [datailInfo, setDetailInfo] = useState([]);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <ResearchInvoiceQuery setListInfo={setListInfo} setDetailInfo={setDetailInfo} />
            </Grid>
            <Grid item xs={12}>
                <MainCard title="發票資料列表">
                    {/* <ResearchInvoiceDataList listInfo={listInfo} setIsDetailShow={setIsDetailShow} />{' '} */}
                    <ResearchInvoiceDataList listInfo={fakeData} setDetailInfo={setDetailInfo} />
                </MainCard>
            </Grid>
            <Grid item xs={12}>
                <MainCard title="立帳資料">
                    <ResearchInvoiceDetail datailInfo={datailInfo} />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default ResearchInvoice;
