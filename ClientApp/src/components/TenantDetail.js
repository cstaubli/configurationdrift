import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

export function TenantDetail(props) {
    let { id } = useParams("id");
    const [tenantdata, setTenantdata] = useState([])

    useEffect(() => {
        async function getData() {
            const response = await fetch(`tenant/${id}`);
            const data = await response.json();
            setTenantdata(data);
        }
        getData();
    }, [])

    /*
    const getTenantData = async () => {
        const response = await fetch(`tenant/${id}`);
        const data = await response.json();
        setTenantdata(data);
    }
    */

    let name, overallStatus;
    tenantdata.forEach(element => {
        name = element.name
        overallStatus = element.overallStatus;
        console.log(element);
    });

    return (
        <div>
            {name}
        </div>
    );
}
