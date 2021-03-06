import React from 'react';
import classes from './Modal.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import BackDrop from '../BackDrop/BackDrop';

const modal = (props) => {
    var classList = [classes.Modal];
    props.show ? classList.push(classes.Show) : classList.push(classes.Hide)

    return (
        <Auxiliary>
            <BackDrop show = {props.show} clicked = {props.modalClose}/>
            <div className = {classList.join(" ")}>
                {props.children}
            </div>
        </Auxiliary>
    );
};

export default React.memo(modal);