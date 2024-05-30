
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import './index.css';
import { Alert } from 'antd';

class Alrt extends React.Component {
    state = {
        visible: true,
    };

      render() {
       
        return (
            <div>
           
                    <Alert
                        message="Theme assigned successfully"
                        type="success"
                        // closable
                        // afterClose={this.handleClose}
                    />
             

            </div>
        );
    }
}
export default Alrt