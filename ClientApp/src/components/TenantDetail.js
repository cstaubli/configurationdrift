import React, { Component } from 'react'
import { useParams } from "react-router-dom";

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
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>LastChecked</th>
                    </tr>
                </thead>
                <tbody>
                    {tenantdata.map(td =>
                        <tr key={td.id}>
                            <td>{td.name}</td>
                            <td>{td.lastChecked}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : TenantDetail.renderTenantData(this.state.tenantdata);

        return (
            <div>
                <h1 id="tabelLabel">{this.state.tenantname}</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async populateTenantData(id) {
        const response = await fetch(`tenant/${id}`);
        const data = await response.json();
        this.setState({ tenantdata: data, loading: false });
    }
}

export default withParams(TenantDetail);
