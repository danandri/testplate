import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  _image : any ;
  _fileTransfer : FileTransferObject ;

  constructor(private cam : Camera, private transfer : FileTransfer, private file : File) {}

  fromGallery(){
    const camOptions : CameraOptions = {
        quality : 100,
        destinationType : this.cam.DestinationType.DATA_URL,
        sourceType : this.cam.PictureSourceType.PHOTOLIBRARY
    }
    this.cam.getPicture(camOptions).
    then((imgData)=>{
        this._image = 'data:image/jpeg;base64,' + imgData;
    },(err)=>{
        alert(JSON.stringify(err));
    })
  }
  takePicture(){
    const camOptions : CameraOptions = {
      quality : 100,
      destinationType : this.cam.DestinationType.DATA_URL,
      sourceType : this.cam.PictureSourceType.CAMERA
    }
    this.cam.getPicture(camOptions).
    then((imgData)=>{
        this._image = 'data:image/jpeg;base64,' + imgData;
    },(err)=>{
        alert(JSON.stringify(err));
    })
  }

  uploadImage(){
    this._fileTransfer = this.transfer.create();
    let transferOptions : FileUploadOptions = {
        fileKey : 'image',
        fileName : "image_uploaded.jpg",
        mimeType : "image/jpeg",
        chunkedMode : false,
        headers : {}
    }
    this._fileTransfer.upload(this._image,'http://192.168.1.153/ionicserver/uploadImage.php',transferOptions)
    .then(()=>{
        alert("Lasa le izy");
    },(err)=>{
        alert("Tsy lasa : " + JSON.stringify(err));
    })
  }
}
