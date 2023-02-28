import React, { Component } from 'react';
import { useParams } from "react-router-dom";

export function TenantDetail() {
    let { id } = useParams("id");

    if (!id) {
        return "No id found"
    }

    return (
        <div>
            {id}
        </div>
    );
}
