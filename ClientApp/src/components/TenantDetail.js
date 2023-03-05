import React, { Component } from 'react'
import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { red, grey, green, yellow } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
                    {tdrifts[0].map((row) =>
                        <div>
                            <div>
                                <TableContainer component={Paper} sx={{ marginTop: 2 }} key={row.resourceName}>
                                    <Table sx={{ width: '100%' }} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Property</TableCell>
                                                <TableCell>Value(s)</TableCell>
                                                <TableCell>Source</TableCell>
                                                <TableCell>Destination</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.drifts.map((asd) => (
                                                <TableRow
                                                    key={`${asd.resourceName}${asd.key}${asd.keyValue}`}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell>{asd.keyValue}</TableCell>
                                                    <TableCell>{asd.key}</TableCell>
                                                    <TableCell>{asd.properties.map(p => p.parameterName)}</TableCell>
                                                    <TableCell>{asd.properties.map(p => p.valueInSource)}</TableCell>
                                                    <TableCell>{asd.properties.map(p => p.valueInDestination)}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                    )}
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
