import React from 'react';
import ImgsViewer from 'react-images-viewer';

export default function ImageViewer(props) {
   const IMG_SET = [
      {
         src: props.img,
         caption: props.title,
         // As an array
         //  srcSet: [props.currImg],
      },
   ];
   return (
      <ImgsViewer
         imgs={IMG_SET}
         //  currImg={props.currImg}
         isOpen={props.viewerIsOpen}
         // onClickPrev={this.gotoPrevious}
         // onClickNext={this.gotoNext}
         onClose={props.onClose}
         closeBtnTitle={'Close'}
      />
   );
}
