import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Moment from 'moment';

export class TenantDetailCard extends Component {
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
                <Card sx={{ backgroundColor: td.overallStatus }} >
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                            {td.name}
                        </Typography>
                        <Typography variant="h5" component="div">
                            Overall Status: {td.overallStatus}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Last Checked: {Moment(td.lastChecked).format('yyyy-MM-DD HH:mm')}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}
