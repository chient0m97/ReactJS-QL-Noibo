import React, { Component } from 'react';
import cookie from 'react-cookies'
import jwt from 'jsonwebtoken';
import Permission from '../Authen/Permission'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Editor } from '@tinymce/tinymce-react';
import { Input } from 'antd'
import { Margin } from 'devextreme-react/circular-gauge';
const { TextArea } = Input;
class About extends Component {
    constructor(props) {
        super(props)
        this.state = {
            valueHtml: 'html table'
        }
    }
    handleEditorChange = (e) => {
        var data = e.target.getContent();
        console.log(data, 'data html')
        // data = data.replace(/<table>/g, "<table border='1' style='width:  100%'>")
        this.setState({
            valueHtml: data
        })
        document.getElementsByTagName
        document.getElementById('innerreport').innerHTML = '<pre> ' + data + '<pre/>'
    }
    render() {

        let token = cookie.load('token');

        let payload = jwt.decode(token);
        let claims = payload.claims; 
        let canRead = claims.indexOf(Permission.Role.Read) >= 0;
        console.log('canred', canRead)
        return (
            <div>
                <Editor
                    initialValue="<p>This is the initial content of the editor</p>"
                    init={ {
                        plugins: 'link image code table',
                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code table '
                    } }
                    onChange={ this.handleEditorChange }
                />
                <h2>Report html</h2>
                
                <div id='innerreport' style={ { minHeight: 100, border: '1px solid gray', Margin: '20px' } }>

                </div>
                <div>
                    <TextArea rows={ 8 } value={ this.state.valueHtml }>

                    </TextArea>
                </div>
            </div>
        );


    }
}

export default About;