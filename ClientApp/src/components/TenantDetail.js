import React, { useState } from 'react'
import { useParams } from "react-router-dom";

export function TenantDetail() {
    let { id } = useParams("id");
    const [fetchedData, setFetchedData] = useState([]);

    if (!id) {
        return "No id found"
    }

    fetchTenantData(id)
        .then((tds) => {
            let td = tds[0]
            console.log(td.drifts);
        })

    return (
        <div>
            {id}
        </div>
    );

}

async function fetchTenantData(tenantid) {
    const response = await fetch(`tenant/${tenantid}`)
    const data = await response.json();
    return data;
}
