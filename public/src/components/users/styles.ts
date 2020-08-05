import { makeStyles } from '@material-ui/core';

export default makeStyles({
    title: {
        margin: '15px 0'
    },
    listItem: {
        backgroundColor: 'rgb(218 221 236)',
        borderBottom: '1px solid rgb(168 173 197)',
        '&:hover': {
            background: "#d6d8e4",
        },
        '&:last-child': {
            borderBottom: 'none'
        }
    },
    avatar: {
        backgroundColor: '#6f81d8'
    },
    textAlignRight: {
        textAlign: 'right'
    },
    textAlignCenter: {
        textAlign: 'center'
    },
    username: {
        '& > span': {
            lineHeight: '40px'
        }
    }
});