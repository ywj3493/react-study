import React from 'react';
import { useLocalStore, useObserver } from "mobx-react";

//
const StoreContext = React.createContext();

//
const StoreProvider = ({children}) => {
    //store has two properties, state & function that modifying state 
    const store = useLocalStore(() => ({
        bugs: ["Centipede"],
        addBug: (bug) => {
            //mutable!
            store.bugs.push(bug);
        },
        //get -> You can key access to array length. Don't need to call this function!
        get bugsCount() {
            return store.bugs.length;
        }
    }));

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    )
};

const BugsHeader = () => {
    const store = React.useContext(StoreContext);
    return useObserver(()=> ( 
        <h1>{store.bugsCount} Bugs!</h1>
    ));
};

const BugsList = () => {
    const store = React.useContext(StoreContext);

    return useObserver(()=> (
        <ul>
            {store.bugs.map(bug => (
                <li key={bug}>{bug}</li>
            ))}
        </ul>
    ));
};

const BugsForm = () => {
    const store = React.useContext(StoreContext);
    const [bug, setBug] = React.useState("");

    return (
        <form onSubmit = {e=> {
            store.addBug(bug);
            setBug("");
            e.preventDefault();
        }}
        >
            <input type="text" value={bug} onChange={e => {setBug(e.target.value)}}></input>
            <button type="submit">Add</button>
        </form>
    )
};

export default function MobxStudy() {
    return (
        <StoreProvider>
            <main>
                <BugsHeader/>
                <BugsList/>
                <BugsForm/>
            </main>
        </StoreProvider>
    );
}