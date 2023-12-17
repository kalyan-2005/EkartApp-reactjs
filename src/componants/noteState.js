import React, { useState } from 'react';
import NoteContext from './noteContext';

function NoteState({ children }) {
    let [cart, setCart] = useState([]);
    return (
        <NoteContext.Provider value={[cart, setCart]}>
            {children}
        </NoteContext.Provider>
    )
}

export default NoteState;