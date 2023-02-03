import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography, InputBase, TextField, Input, InputAdornment } from '@mui/material';

//search
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

// project import
import Highlighter from './third-party/Highlighter';

// header style
const headerSX = {
    p: 2.5,
    '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
};

// ==============================|| CUSTOM - MAIN CARD ||============================== //

const MainCard = forwardRef(
    (
        {
            border = true,
            boxShadow,
            children,
            content = true,
            contentSX = {},
            darkTitle,
            divider = true,
            elevation,
            secondary,
            shadow,
            sx = {},
            title,
            codeHighlight,
            search,
            searchFunction,
            searchTitle,
            ...others
        },
        ref
    ) => {
        const theme = useTheme();
        boxShadow = theme.palette.mode === 'dark' ? boxShadow || true : boxShadow;

        // const StyledInputBase = styled(InputBase)(({ theme }) => ({
        //     color: 'inherit',
        //     '& .MuiInputBase-input': {
        //         // vertical padding + font size from searchIcon
        //         paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        //         paddingTop: 0,
        //         paddingBottom: 0,
        //         transition: theme.transitions.create('width'),
        //         width: '100%',
        //         [theme.breakpoints.up('sm')]: {
        //             width: '12ch',
        //             '&:focus': {
        //                 width: '20ch'
        //             }
        //         }
        //     }
        // }));

        // const SearchIconWrapper = styled('div')(({ theme }) => ({
        //     padding: theme.spacing(0, 2),
        //     height: '100%',
        //     position: 'absolute',
        //     pointerEvents: 'none',
        //     display: 'flex',
        //     alignItems: 'center',
        //     justifyContent: 'center'
        // }));

        // const Search = styled('div')(({ theme }) => ({
        //     position: 'relative',
        //     borderRadius: theme.shape.borderRadius,
        //     backgroundColor: alpha(theme.palette.common.black, 0.05),
        //     '&:hover': {
        //         backgroundColor: alpha(theme.palette.common.black, 0.15)
        //     },
        //     marginLeft: 0,
        //     width: '100%',
        //     [theme.breakpoints.up('sm')]: {
        //         marginLeft: theme.spacing(1),
        //         width: 'auto'
        //     }
        // }));

        // const searchFunction = (e) => {
        //     requestSearch(e);
        // };

        return (
            <Card
                elevation={elevation || 0}
                ref={ref}
                {...others}
                sx={{
                    ...sx,
                    border: border ? '1px solid' : 'none',
                    borderRadius: 2,
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey.A800,
                    boxShadow: boxShadow && (!border || theme.palette.mode === 'dark') ? shadow || theme.customShadows.z1 : 'inherit',
                    ':hover': {
                        boxShadow: boxShadow ? shadow || theme.customShadows.z1 : 'inherit'
                    },
                    '& pre': {
                        m: 0,
                        p: '16px !important',
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '0.75rem'
                    }
                }}
            >
                {/* card header and action */}
                {/* {!darkTitle && title && (
                    <CardHeader sx={headerSX} titleTypographyProps={{ variant: 'subtitle1' }} title={title} action={secondary} />
                )} */}
                {!darkTitle && title && (
                    <CardHeader
                        sx={headerSX}
                        titleTypographyProps={{ variant: 'subtitle1' }}
                        title={
                            <Typography sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography>{title}</Typography>
                                {search && (
                                    <Input
                                        placeholder={searchTitle ? searchTitle : 'Search…'}
                                        sx={{ padding: '0' }}
                                        onChange={(e) => searchFunction(e.target.value)}
                                        size="small"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        }
                                    />
                                )}
                            </Typography>
                        }
                        action={secondary}
                    />
                )}
                {darkTitle && title && (
                    <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
                )}

                {/* content & header divider */}
                {title && divider && <Divider />}

                {/* card content */}
                {content && <CardContent sx={contentSX}>{children}</CardContent>}
                {!content && children}

                {/* card footer - clipboard & highlighter  */}
                {codeHighlight && (
                    <>
                        <Divider sx={{ borderStyle: 'dashed' }} />
                        <Highlighter codeHighlight={codeHighlight} main>
                            {children}
                        </Highlighter>
                    </>
                )}
            </Card>
        );
    }
);

MainCard.propTypes = {
    border: PropTypes.bool,
    boxShadow: PropTypes.bool,
    contentSX: PropTypes.object,
    darkTitle: PropTypes.bool,
    divider: PropTypes.bool,
    elevation: PropTypes.number,
    secondary: PropTypes.node,
    shadow: PropTypes.string,
    sx: PropTypes.object,
    title: PropTypes.string,
    codeHighlight: PropTypes.bool,
    content: PropTypes.bool,
    children: PropTypes.node
};

export default MainCard;
