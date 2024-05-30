import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import './index.css';
import Alert from './Alert';
import axios from 'axios';
import { getJwtToken, media } from '../config';
import { Upload, Icon, message } from 'antd';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { FormText } from 'reactstrap';
import { uploadApi } from '../config';
import jwt from "jsonwebtoken"

function getBase64(img, callback) {
   const reader = new FileReader();
   reader.addEventListener('load', () => callback(reader.result));
   reader.readAsDataURL(img);
}

export default function ImageUploader(props) {
   const [state, setState] = React.useState({
      res: false,
      error: false,
      message: '',
      imageUrl: null,
      loading: false,
      status: null,
   });
   const [selectedFile, setSelectedFile] = React.useState(null);
   const [file, setFile] = React.useState(props.info ? props.info : null);
   const [isUploading, setIsUploading] = React.useState(false);
   const [fileprogress, setFileProgress] = React.useState(null);
   const imageUpload = () => {
      if (file && selectedFile) {
         setIsUploading(true);
         var formdata = new FormData();
         formdata.append('mode', 'update');
         formdata.append('url', file);
         formdata.append('file', selectedFile, selectedFile.name);
         axios
            .request({
               method: 'post',
               headers: {
                  'x-auth-token': getJwtToken().jwt_token,
               },
               url: media.getUrlFromS3Api + getJwtToken().hotel_id,
               data: formdata,
               onUploadProgress: (p) => {
                  setFileProgress((p.loaded / p.total) * 100);
               },
            })
            .then((res) => {
               setIsUploading(false);
               setFile(res.data.file);
               props.res(res.data.file);
            })
            .catch((error) => {
               if (error.response) {
                  if (error.response.status == 422) {
                     setState({
                        ...state,
                        error: true,
                        message: 'Invalid token or session out, please login again',
                        status: error.response.status,
                     });
                  } else {
                     setState({
                        ...state,
                        error: true,
                        message: error.response.data,
                        status: error.response.status,
                     });
                  }
               } else if (error.request) {
                  // The request was made but no response was received
               } else {
                  // Something happened in setting up the request that triggered an Error
               }
            });
      } else if (selectedFile) {
         setIsUploading(true);
         var formdata = new FormData();
         formdata.append('file', selectedFile, selectedFile.name);
         
         const userId = jwt.decode(getJwtToken().jwt_token)
         axios
            .request({
               method: 'post',
               headers: {
                  'x-auth-token': getJwtToken().jwt_token,
               },
               url: media.getUrlFromS3Api + userId._id,
               data: formdata,
               onUploadProgress: (p) => {
                  setFileProgress((p.loaded / p.total) * 100);
               },
            })
            .then((res) => {
               setIsUploading(false);
               setFile(res.data.file);
               props.res(res.data.file);
            })
            .catch((error) => {
               if (error.response) {
                  if (error.response.status == 422) {
                     setState({
                        ...state,
                        error: true,
                        message: 'Invalid token or session out, please login again',
                        status: error.response.status,
                     });
                  } else {
                     setState({
                        ...state,
                        error: true,
                        message: error.response.data,
                        status: error.response.status,
                     });
                  }
               } else if (error.request) {
                  // The request was made but no response was received
               } else {
                  // Something happened in setting up the request that triggered an Error
               }
            });
      }
   };

   const beforeUpload = (file) => {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
         setSelectedFile(file);
         getBase64(file, (imageUrl) => {
            setState({
               ...state,
               imageUrl,
            });
         });
      } else {
         setSelectedFile(null);
         setState({
            ...state,
            error: true,
            message: 'Only upload JPG/PNG files are allowed',
         });
      }
   };

   const onImgLoad = ({ target: img }) => {
      if (props.cond.AR && img.naturalWidth / img.naturalHeight != props.cond.AR) {
         setSelectedFile(null);
         setState({
            ...state,
            file: null,
            imageUrl: null,
            error: true,
            message: props.cond.message,
         });
      } else {
         if (state.imageUrl) imageUpload();
      }
   };

   const _handleClose = () => {};
   const onClick = () => {
      if (state.status == 422) {
         window.location = '/login';
      }
      setState({
         ...state,
         videoData: null,
         error: false,
         message: '',
      });
   };

   const uploadButton = (
      <div style={props.cond.AR == 1.7777777777777777 ? { width: 160 } : { width: '100%' }}>
         <Icon type={isUploading ? 'loading' : 'plus'} />

         <FormText color='muted'>Upload Image</FormText>
         <FormText color='muted'>
            {props.cond.AR == 1.7777777777777777 ? 'Aspect Ratio 16:9' : 'Aspect Ratio 1:1'}
         </FormText>
      </div>
   );

   return (
      <div>
         <Upload
            name='avatar'
            listType='picture-card'
            className='avatar-uploader'
            showUploadList={false}
            disabled={isUploading}
            action={''}
            beforeUpload={beforeUpload}>
            {state.imageUrl ? (
               <img
                  src={state.imageUrl}
                  onLoad={onImgLoad}
                  alt='avatar'
                  style={props.cond.AR == 1.7777777777777777 ? { width: 160 } : { width: '100%' }}
               />
            ) : props.info ? (
               <img
                  src={props.info}
                  onLoad={onImgLoad}
                  alt='avatar'
                  style={props.cond.AR == 1.7777777777777777 ? { width: 160 } : { width: '100%' }}
               />
            ) : (
               uploadButton
            )}
         </Upload>
         <div style={{ marginTop: 5 }}>
            {state.imageUrl && isUploading ? (
               <Typography variant='caption' display='block' gutterBottom>
                  {Math.round(fileprogress && fileprogress)}%
                  <LinearProgress
                     variant='determinate'
                     style={{ width: 100 }}
                     value={fileprogress && fileprogress}
                  />{' '}
                  uploading...
               </Typography>
            ) : (
               selectedFile && (
                  <Typography variant='caption' display='block' gutterBottom>
                     {selectedFile && selectedFile.name}
                  </Typography>
               )
            )}
         </div>
         {state.error ? (
            <Alert
               isOpen={state.error}
               onClose={_handleClose}
               hasTwoButtons={false}
               handleSubmit={onClick}
               title={'Media upload'}
               text={state.message}
               submitButtonText='OK'
            />
         ) : null
            }
      </div>
   );
}
