import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
// import PropTypes from 'prop-types'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import _ from 'lodash'



export default class RichTextEditor extends Component {

  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange=_.throttle((editorState) => {
    console.log('----')
    this.setState({
      editorState,
    });
  },1000)

  getDetail=()=>draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))


  uploadImageCallBack=(file) =>{
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/manage/img/upload');
        xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }
  

  componentWillMount(){
    const detail=this.props.detail
    //根据ditail生成一个editorState
    if(detail){ 
      const contentBlock = htmlToDraft(detail);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({ editorState })
    }   
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}//以受控方式更新编辑器状态的属性
          editorStyle={{height:'200px',border:'1px solid black',padding:'0 10px'}}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}