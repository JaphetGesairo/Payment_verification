import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Verification() {
    const { id } = useParams();
    const [verification, setVerification] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/verify_payment/${id}`)
            .then((response) => setVerification(response.data.data))
            .catch((error) => console.error(error));
    }, [id]);

    if (!verification) return <p>Loading...</p>;

    return (
        <div style={styles.container}>
            <h1>Verification Details</h1>
            <p>ID: {verification.id}</p>
            <p>Verified By: {verification.verifier_name}</p>
            <p>Date: {verification.verified_date}</p>
        </div>
    );
}

const styles = { container: { padding: '20px' } };

export default Verification;
