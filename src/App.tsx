import React from 'react';
import './App.css';
import Counter from "./components/Counter/Counter";
import Settings from "./components/Settings/Settings";
import {useSelector} from "react-redux";
import {AppStateT} from "./Redux/store";

function App() {
    const editMode = useSelector<AppStateT, boolean>(state => state.counter.editMode)

    return <div className="App">
        {editMode ? <Settings/> : <Counter/>}
    </div>
}


export default App;
