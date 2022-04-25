import { Checkbox, IconButton, InputBase, ListItem, ListItemSecondaryAction, ListItemText } from '@mui/material';
import { DeleteOutlined} from '@mui/icons-material';
import React, { Component } from 'react'

export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = { item: props.item, readOnly: true, items: props.items };
        this.delete = props.delete;
        this.update = props.update;
    }

    deleteEventHandler = () => {
        this.delete(this.state.item);
    }
    
    checkboxEventHandler = (e) => {
        const thisItem = this.state.item;
        if(thisItem.done === true) {
            thisItem.done = false;
        } else {
            thisItem.done = true
        }
        this.setState({item: thisItem});
        this.update(this.state.item);
        console.log(thisItem);
    }

    offReadOnlyMode = () => {
        console.log("Event!", this.state.readOnly);
        this.setState({readOnly: false}, () => {
            console.log("ReadOnly? ", this.state.readOnly);
        });
    }

    enterKeyEnventHandler = (e) => {
        if (e.key === "Enter") {
            this.setState({readOnly: true}, () => {
                console.log('readOnly? ', this.state.readOnly);
                console.log('items: ', this.state.items);
            });
            this.update(this.state.item);
        }
    }

    editEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({item: thisItem}, () => {
            console.log("title: ", this.state.item.title);
        });
    }

    render() {
        const item = this.state.item;
        return (
            <ListItem>
                <Checkbox defaultChecked={item.done} onClick={this.checkboxEventHandler}/>
                <ListItemText>
                    <InputBase
                        inputProps={{"aria-label" : "naked", readOnly: this.state.readOnly}}
                        onClick={this.offReadOnlyMode}
                        type="text"
                        id={item.id}
                        name={item.id}
                        value={item.title}
                        multiline={true}
                        fullWidth={true}
                        onKeyPress={this.enterKeyEnventHandler}
                        onChange= {this.editEventHandler}
                        />
                </ListItemText>
                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete Todo" onClick={this.deleteEventHandler}>
                        <DeleteOutlined />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}
