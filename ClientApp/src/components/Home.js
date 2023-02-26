import React, { Component } from 'react';
import { TenantDetailCard } from "./TenantDetail"
import { Grid } from '@mui/material';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            tenantdata: [],
            loading: true,
        }
    }

    componentDidMount() {
        this.populateCardData();
    }
    render() {
        let grid = this.state.loading
            ? <p><em>Loading...</em></p>
            : Home.renderGrid(this.state.tenantdata)
        return (
            <div>
                {grid}
            </div>
        );
    }

    static renderGrid(tenantdata) {
        return (
            <Grid container spacing={5}>
                {tenantdata.map(td =>
                    <Grid item md={'auto'} key={td.id}>
                        <TenantDetailCard td={td} />
                    </Grid>
                )}
            </Grid>
        );
    }

    async populateCardData() {
        const response = await fetch('tenant')
        const data = await response.json();
        this.setState({ tenantdata: data, loading: false })
    }
}
