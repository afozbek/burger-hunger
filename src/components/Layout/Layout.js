import React from 'react'
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.css';

const layout = (props) => (
    <Auxiliary>
        <div>
            {/* Some Style will come here */}
            Toolbar, SideDrawer, Backdrop
        </div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Auxiliary>
);
export default layout;