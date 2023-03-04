import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { red, grey, green, yellow } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import Moment from 'moment';
import { Link } from 'react-router-dom';

export class TenantDetailCard extends Component {
    // https://mui.com/material-ui/react-card/
    static displayName = TenantDetailCard.name;

    constructor(props) {
        super(props);
        const { td } = props;
        this.state = {
            tenantdetail: td,
            loading: true,
        }
    }

    render() {
        let card = TenantDetailCard.rendercard(this.state.tenantdetail)
        return card;
    }

    static rendercard(td) {
        let bcolor = "";
        switch (td.overallStatus) {
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
            <div>
                <Link to={`/guguseli/${td.id}`}>
                    <Card sx={{ bgcolor: bcolor }} >
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: grey[700] }} aria-label="recipe">
                                    {td.name.substring(0, 1).toUpperCase()}
                                </Avatar>
                            }
                            title={td.name}
                            subheader={Moment(td.lastChecked).format('yyyy-MM-DD HH:mm')}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Number of Missing Configurations: {td.numMissing}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Number of different configurations: {td.numDiffs}
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>
            </div >
        );
    }
}
