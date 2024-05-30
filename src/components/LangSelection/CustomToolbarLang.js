/**Toolbar for the Datatable is handled in this file
 * Customization: Add Button
 * Add button redirects/links to the edit page without any default values
 */

import React,{Component} from "react";

//Linking to another page 
import { Link } from "react-router-dom";

//Imports of all the required classes and functions from Material UI
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

//Icon style designing
const defaultToolbarStyles = {
  iconButton: {
    color:"#266199",
    backgroundColor:"#CFD9E3"
  },
};

//Rendering Custom Toolbar
class CustomToolbarLang extends Component {

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Tooltip title={"custom icon"}>
          <Button className={classes.iconButton} onClick={this.handleClick}>
            <AddIcon /> <Link to={`/language/addHotelLang/1`}>Add </Link>
          </Button>
        </Tooltip>
      </React.Fragment>
    );
  }

}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbarLang" })(CustomToolbarLang);