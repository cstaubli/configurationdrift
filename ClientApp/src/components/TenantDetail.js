import React, { Component } from 'react'
import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red, grey, green, yellow } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Moment from 'moment';

function withParams(Component) {
    return (props) => <Component {...props} params={useParams()} />;
}

class TenantDetail extends Component {
    static displayName = TenantDetail.name;

    constructor(props) {
        super(props);
        this.state = {
            tenantdata: [],
            loading: true,
        };
    }

    componentDidMount() {
        this.populateTenantData(this.props.params.id);
    }

    static renderTenantData(tenantdata) {
        const tname = tenantdata.map(td => td.name);
        const tnameshort = tname.toString().substring(0, 1).toUpperCase();
        const tlastchecked = tenantdata.map(td => td.lastChecked);
        const toverallStatus = tenantdata.map(td => td.overallStatus);
        const tnumMissing = tenantdata.map(td => td.numMissing);
        const tnumDiffs = tenantdata.map(td => td.numDiffs);
        const tdrifts = tenantdata.map(td => td.drifts);

        let bcolor = "";
        switch (toverallStatus) {
            case "red":
                bcolor = red[300];
                break;

            case "yellow":
                bcolor = yellow[300];
                break;

            default:
                bcolor = green[300];
                break;
        }
        return (
            <Card sx={{ bgcolor: bcolor }} >
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: grey[700] }} aria-label="recipe">
                            {tnameshort}
                        </Avatar>
                    }
                    title={tname}
                    subheader={tlastchecked}
                />
                <CardContent>
                    <Typography>
                        Number of Missing Configurations: {tnumMissing} | Number of different configurations: {tnumDiffs}
                    </Typography>
                </CardContent>
                <CardContent>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ResourceName</TableCell>
                                    <TableCell>Key</TableCell>
                                    <TableCell>KeyValue</TableCell>
                                    <TableCell>Properties</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tdrifts[0].map((row) => (
                                    <TableRow
                                        key={`${row.resourceName}${row.key}${row.keyValue}`}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.resourceName}
                                        </TableCell>
                                        <TableCell>{row.key}</TableCell>
                                        <TableCell>{row.keyValue}</TableCell>
                                        <TableCell>{row.properties.map(p => p.parameterName)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card >
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : TenantDetail.renderTenantData(this.state.tenantdata);

        return (
            <div>
                {contents}
            </div>
        );
    }

    async populateTenantData(id) {
        const response = await fetch(`tenant/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
            },
        })
        const data = await response.json();
        this.setState({ tenantdata: data, loading: false });
    }
}

export default withParams(TenantDetail);
