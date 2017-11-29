/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem, MenuList } from 'material-ui/Menu';
import Divider from 'material-ui/Divider';
//import { mailFolderListItems, otherMailFolderListItems } from './tileData';

const styles = {
    list: {
        width: 250,
    },
    listFull: {
        width: 'auto',
    },
};

class TemporaryDrawer extends React.Component {
    state = {
        left: false,
    };

    toggleDrawer = (open) => () => {
        this.setState({
            left: open,
        });
    };

    render() {
        let items=[];
        if (typeof this.props.index != "undefined" && typeof this.props.index.content != "undefined") {
            items = this.props.index.content;
        }
        const { classes } = this.props;
        const sideList = (
            <div className={classes.list}>
                <MenuList>
                    {items.map((item) =>
                        <MenuItem key={item.id} id={item.page} onClick={this.props.handleIndex}>{item.blocks}</MenuItem>
                    )}
                </MenuList>
            </div>
        );

        return (
            <div>
                <Button onClick={this.toggleDrawer(true)}>Open Left</Button>
                <Drawer open={this.state.left} onRequestClose={this.toggleDrawer(false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer(false)}
                        onKeyDown={this.toggleDrawer(false)}
                    >
                        {sideList}
                    </div>
                </Drawer>
            </div>
        );
    }
}

TemporaryDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);