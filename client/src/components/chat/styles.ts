import { makeStyles } from '@material-ui/core';

export default makeStyles({
    title: {
        margin: '15px 0'
    },
    chatSection: {
        width: '100%',
        height: '85vh',
        boxShadow: 'none'
    },
    headBG: {
        backgroundColor: '#b5acac'
    },
    borderRight: {
        borderRight: '1px solid #b5acac'
    },
    messageArea: {
        height: '75vh',
        overflowY: 'auto'
    },
    textAlignRight: {
        textAlign: 'right',
        '& > p': {
            color: 'green'
        }
    },
    senderMessage: {
        backgroundColor: '#8fa548',
        padding: '10px',
        color: '#fff',
    },
    receiverMessage: {
        '& > div': {
            backgroundColor: '#dadada',
        },
        padding: '10px'
    },
    username: {
        backgroundColor: 'transparent!important',
        color: '#000'
    },
    orderToRight: {
        order: 2,
        marginLeft: 'auto'
    },
    orderToLeft: {
        paddingLeft: '12px'
    },
    date: {
        margin: 0,
        '& > p': {
            fontSize: '11px'
        }
    }
});