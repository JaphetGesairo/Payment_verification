import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Menu() {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/menu')
            .then((response) => setMenuItems(response.data.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div style={styles.container}>
            <h1>Menu</h1>
            <ul>
                {menuItems.map((item) => (
                    <li key={item.id}>
                        {item.name} - ${item.price.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

const styles = { container: { padding: '20px' } };

export default Menu;
