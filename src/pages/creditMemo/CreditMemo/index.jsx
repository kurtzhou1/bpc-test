import { useEffect, useState } from 'react';
import { Grid, Button, IconButton, Box, Tabs, Tab } from '@mui/material';
// import { styled } from '@mui/material/styles';

// project import
import MainCard from 'components/MainCard';
import CreditMemoQuery from './creditMemoQuery';
import CreditBalanceToCN from './creditBalanceToCN';
import CreditMemoDataList from './creditMemoDataList';
import CreditMemoAdd from './creditMemoAdd';
import { TabPanel } from 'components/commonFunction';

import { CreditMemoApi } from 'components/apis';

// day
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';

const CreditMemo = () => {
    // const [value, setValue] = useState(0);
    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };
    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    };
    const fakeData = [
        {
            CNNo: 'CN03UP-KT2310261124',
            CNType: 'REFUND',
            WorkTitle: 'Upgrade',
            CurrAmount: 2124379.0,
            Note: 'str',
            SubmarineCable: 'TPE',
            CNID: 1,
            PartyName: 'KT',
            IssueDate: '2023-10-26T11:24:24',
            URI: 'https://s.yimg.com/ny/api/res/1.2/Mnp9nKRJPk.7t9nY86k58Q--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTU0MDtjZj13ZWJw/https://media.zenfs.com/zh-tw/ebc.net.tw/4fe3286ffeb7b42a9365bd897a0a459f',
        },
        {
            CNNo: 'CN03UP-KT2310261124',
            CNType: 'REFUND',
            WorkTitle: 'Upgrade',
            CurrAmount: 2124379.0,
            Note: 'str',
            SubmarineCable: 'TPE',
            CNID: 1,
            PartyName: 'KT',
            IssueDate: '2023-10-26T11:24:24',
            URI: 's3://xxx/xxx/xxx',
        },
    ];

    const [listInfo, setListInfo] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogAction, setDialogAction] = useState('');

    const [lBRatio, setLBRatio] = useState(''); //攤分比例
    const [editItem, setEditItem] = useState(NaN);
    const [modifyNote, setModifyNote] = useState('');

    const [submarineCable, setSubmarineCable] = useState(''); //海纜名稱
    const [billMilestone, setBillMilestone] = useState(''); //計帳段號
    const [partyName, setPartyName] = useState([]); //會員名稱

    const initQuery = () => {
        setSubmarineCable('');
        setBillMilestone('');
        setPartyName('');
    };

    const CreditMemoQuery = () => {
        let tmpQuery = CreditMemoApi + 'view';
        let tmpObject = {};
        if (submarineCable && submarineCable !== '') {
            tmpObject.SubmarineCable = submarineCable;
        }
        if (billMilestone && billMilestone !== '') {
            tmpObject.BillMilestone = billMilestone;
        }
        if (partyName && partyName !== '') {
            tmpObject.PartyName = partyName;
        }
        fetch(tmpQuery, { method: 'POST', body: JSON.stringify(tmpObject) })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setListInfo(data);
                }
            })
            .catch((e) => console.log('e1=>', e));
    };

    const handleDialogOpen = () => {
        setIsDialogOpen(true);
        setDialogAction('add');
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const itemDetailInitial = () => {
        setBillMilestone('');
        setPartyName([]);
        setLBRatio('');
        setModifyNote('');
    };

    //新增
    const addLiability = (list) => {
        console.log('list=>>', list);
        if (list.length > 0) {
            let tmpArray = listInfo.map((i) => i);
            list.forEach((i) => {
                tmpArray.push({
                    BillMilestone: i.BillMilestone,
                    PartyName: i.PartyName,
                    LBRatio: i.LbRatio,
                    createTime: new Date(),
                    modifyNote: modifyNote.trim() === '' ? '' : modifyNote,
                });
            });

            setListInfo([...tmpArray]);
            handleDialogClose();
            itemDetailInitial();
        }
    };

    //刪除
    const deletelistInfoItem = (deleteItem) => {
        let tmpArray = listInfo.map((i) => i);
        tmpArray.splice(deleteItem, 1);
        setListInfo([...tmpArray]);
    };

    //編輯
    const editlistInfoItem = () => {
        let tmpArray = listInfo[editItem];
        if (tmpArray) {
            setBillMilestone(tmpArray?.billMilestone);
            partyName.current = tmpArray?.partyName;
            setLBRatio(tmpArray?.lBRatio);
            setModifyNote(tmpArray?.modifyNote);
        }
    };

    //儲存編輯
    const saveEdit = () => {
        setEditItem(NaN);
        deletelistInfoItem(editItem);
        addLiability();
        // setIsListEdit(false);
        itemDetailInitial();
    };

    useEffect(() => {
        itemDetailInitial();
        if (editItem >= 0) {
            editlistInfoItem();
            setIsDialogOpen(true);
        }
    }, [editItem]);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <CreditMemoQuery
                    CreditMemoQuery={CreditMemoQuery}
                    setListInfo={setListInfo}
                    queryInit={initQuery}
                />
            </Grid>
            <Grid item xs={12}>
                <MainCard title="Credit Memo資料列表">
                    {/* <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative' }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="CB轉CN" {...a11yProps(0)} />
              <Tab label="CN列表" {...a11yProps(1)} />
            </Tabs>
          </Box> */}
                    {/* <TabPanel value={value} index={0}>
            <CreditBalanceToCN
              listInfo={listInfo}
              setDialogAction={setDialogAction}
              setIsDialogOpen={setIsDialogOpen}
              setEditItem={setEditItem}
              deletelistInfoItem={deletelistInfoItem}
            />
          </TabPanel> */}
                    {/* <TabPanel value={value} index={1}> */}
                    <CreditMemoDataList
                        listInfo={listInfo}
                        setDialogAction={setDialogAction}
                        setIsDialogOpen={setIsDialogOpen}
                        setEditItem={setEditItem}
                        deletelistInfoItem={deletelistInfoItem}
                    />
                    {/* </TabPanel> */}
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default CreditMemo;
