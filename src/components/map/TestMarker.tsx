import React from 'react';

function TestMarker(): JSX.Element {
    const styles = {
        width: '20px',
        height:'20px',
        backgroundColor: 'red'
    }
    return (
        <div style={styles}></div>
    );
};

export default TestMarker;