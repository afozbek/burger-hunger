import React from 'react'
import Auxiliary from '../../hoc/Auxiliary';
const layout = (props) => (
    <Auxiliary>
        <div>
            {/* Some Style will come here */}
            Toolbar, SideDrawer, Backdrop
        </div>
        <main>
            {props.children}
        </main>
    </Auxiliary>
);
export default layout;