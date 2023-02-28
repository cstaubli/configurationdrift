import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red, grey, green } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import Moment from 'moment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
        return (
            <div>
                <Link to={`/guguseli/${td.id}`}>
                    <Card sx={{ bgcolor: grey[50] }} >
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: td.overallStatus }} aria-label="recipe">
                                    {td.name.substring(0, 1).toUpperCase()}
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={td.name.substring(0, td.name.indexOf("."))}
                            subheader={Moment(td.lastChecked).format('MMMM DD, yyyy HH:mm')}
                        />
                        <CardMedia
                            component="img"
                            height="190"
                            image="https://www.enowsoftware.com/hubfs/Azure-9.png"
                            alt="AzureAD"
                        />
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                                Tenant: {td.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Overall status: {td.overallStatus}
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        );
    }
}
