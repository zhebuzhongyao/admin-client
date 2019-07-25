import React from 'react'
import { Upload, Icon, Modal ,message} from 'antd';
import {reqDeleteImg} from '../../api'
import {BASE_IMG} from '../../utils/constants'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,//大图预览，默认是隐藏的
    previewImage: '',//大图的URL或者base64
    fileList: [
    //   {//文件信息对象
    //     uid: '-1',//唯一标识
    //     name: 'xxx.png',//图片的名字
    //     status: 'done',//状态 
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',//图片地址
    //   },
    ],
  };

  //获取所有已上传文件名的数组
  getImgs=()=>this.state.fileList.map(file=>file.name)

  handleCancel = () => this.setState({ previewVisible: false });

  //对应点击大图预览的回调函数
  //file：当前点击的那个图片的file对象。
  handlePreview = async file => {//file是当前操作的文件对象
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  //在file的状态(status)发生改变的监听回调
  //当前操作（上传或者删除）的file
  //file的status需要看开始的，不能看结束的。file里面没有url,但是file里的response里面有个data，里面有URL，还有个name，
  handleChange = async({ fileList,file }) => {
  if(file.status==='done'){
    const file=fileList[fileList.length-1]//因为file里边本身没有URL，但是filelist里面有URL，如果不判断的话，file拿不到URL，最终还是显示的是base64，需要判断filelist的最后一个是否跟file相等，因为最后一个才表示图片上传成功
    const {url,name}=file.response.data
    file.name=name//用这个name替换掉外面默认的name
    file.url=url//把data里边的URL给外边，让他拿到URL
  }else if(file.status==='removed'){
    const result=await reqDeleteImg(file.name)
    console.log(result,file.name)//undefined  有值
    if(result.status===0){  
        message.success('删除图片成功')
    }else{
        message.error('删除图片失败')
    }
  }
  this.setState({ fileList })
};


    componentWillMount(){
        //根据传入的imgs生成新的fileList并更新
        const imgs=this.props.imgs
        if(imgs&&imgs.length>0){
            const fileList=imgs.map((img,index)=>({
                uid: -index,//唯一标识
                name: img,//图片的名字
                status: 'done',//状态 
                url: BASE_IMG + img
            }))
            this.setState({fileList})
        }
        
    }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          action="/manage/img/upload"//上传图片的地址
          name='image'//发到后台的文件参数名
          listType="picture-card"//图片的风格
          fileList={fileList}//已经上传的文件列表  file是当前操作的文件对象
          onPreview={this.handlePreview}
          onChange={this.handleChange}//onchange传过来的是个对象，里面包含file（对象），filelist（数组），event（对象）
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        {/* modal是对话框，就是大图预览 */}
      </div>
    );
  }
}

