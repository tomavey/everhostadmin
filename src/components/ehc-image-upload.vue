<!-- example 
https://stackoverflow.com/questions/53708278/how-to-resize-the-image-in-vue
    <ehc-image-upload
        v-model="show"
        title="whatever the title of dialog is"
        imgPath="path/to/the/filename"
        @upload="funcDOINGSOMETHING($event)"
    >

    opens dialog box to crop and upload image the name passed to it in imgPath
    once uploaded it closes the dialog box and returns 
    @upload = return download url
-->


<template>

    <ehc-dialog v-model="show" :title="title" width="500" close :loading="loading">


        <v-file-input
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an Image"
          prepend-icon="mdi-camera"
          label="Avatar"
          @change="readURL"
        ></v-file-input>
      <v-container v-if="originalImg">
        <v-row justify="space-around">
          <v-col cols="5">
            <div class="subheading">Original Image</div>
            <img :src="originalImg"/>
          </v-col>
          <v-col cols="5">
            <div class="subheading">Resized Image</div>
            <img :src="resizedImg"/>
          </v-col>
        </v-row>
      </v-container>

        <ehc-btn plain @click="$refs.file.click()">
           + Upload a new photo
        </ehc-btn>
        <!-- input is so the button above will work, theres probably a better way to do this -->
        <input type="file" ref="file" @change="loadImage($event)" accept="image/*" v-show="false">

        <cropper
            ref="cropper"
            class="upload-example-cropper"
            :src="image.src"
        />


        <template v-slot:actions>
            <ehc-btn @click="crop()">
                Apply
            </ehc-btn>
            <ehc-btn color="error" plain @click="show=false">
                Cancel
            </ehc-btn>
        </template>
    </ehc-dialog>
</template>

<script>
import { CircleStencil, Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import firebase from 'firebase'


// This function is used to detect the actual image type, 
function getMimeType(file, fallback = null) {
	const byteArray = (new Uint8Array(file)).subarray(0, 4);
    let header = '';
    for (let i = 0; i < byteArray.length; i++) {
       header += byteArray[i].toString(16);
    }
	switch (header) {
        case "89504e47":
            return "image/png";
        case "47494638":
            return "image/gif";
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
            return "image/jpeg";
        default:
            return fallback;
    }
}

// this is for the resizing of the image 
const dataURItoBlob = (dataURI) => {
  const bytes = dataURI.split(',')[0].indexOf('base64') >= 0
    ? atob(dataURI.split(',')[1])
    : unescape(dataURI.split(',')[1]);
  const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const max = bytes.length;
  const ia = new Uint8Array(max);
  for (let i = 0; i < max; i += 1) ia[i] = bytes.charCodeAt(i);
  return new Blob([ia], { type: mime });
};

const resizeImage = ({ file, maxSize }) => {
  const reader = new FileReader();
  const image = new Image();
  const canvas = document.createElement('canvas');

  const resize = () => {
    let { width, height } = image;

    if (width > height) {
      if (width > maxSize) {
        height *= maxSize / width;
        width = maxSize;
      }
    } else if (height > maxSize) {
      width *= maxSize / height;
      height = maxSize;
    }

    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(image, 0, 0, width, height);

    const dataUrl = canvas.toDataURL('image/jpeg');

    return dataURItoBlob(dataUrl);
  };

  return new Promise((ok, no) => {
    if (!file.type.match(/image.*/)) {
      no(new Error('Not an image'));
      return;
    }

    reader.onload = (readerEvent) => {
      image.onload = () => ok(resize());
      image.src = readerEvent.target.result;
    };

    reader.readAsDataURL(file);
  });
};


export default {
	components: {
		Cropper,
	},
    props: {
        value: Boolean,
        title: String,
        uploadPath: {type: String, required: true},
        size: Object
    },
	data() {
		return {
            originalImg: '',
            resizedImg: '',
            loading: false,
            show: false,
			image: {
				src: null,
				type: null
			}
		};
	},
    watch: {
        value(val) {
            if (val != this.show) {
                this.show= val
            }
        },
        show(val) {
            if (val != this.value) {
                this.$emit('input', val)
            }
        }
    },
	methods: {
        readURL(file) {
            // START: preview original
            // you can remove this section if you don't like to preview original image
            if (!file.type.match(/image.*/)) {
                no(new Error('Not an image'));
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => this.originalImg = e.target.result;
            reader.readAsDataURL(file); // convert to base64 string
            // END: preview original

            // START: preview resized
            resizeImage({ file: file, maxSize: 150 }).then((resizedImage) => {
                this.resizedImg = URL.createObjectURL(resizedImage);
            }).catch((err) => {
                console.error(err);
            });
            // END: preview resized
            },
		async crop() {
            this.loading=true
            let imageRef = firebase.storage().ref(this.uploadPath)
            console.log("crop")
			// const { canvas } = this.$refs.cropper.getResult();
            const { image } = this.$refs.cropper.getResult()
            var canvas = document.createElement('canvas')

            canvas.width=100
            canvas.height=100
            canvas.getContext('2d').drawImage(image, 0, 0, 100, 100);




            console.log("canvas", canvas)

			canvas.toBlob((blob) => {
                imageRef.put(blob)
                .then((snapshot) => {
                    console.log("uploaded a blob", snapshot.metadata)
                    snapshot.ref.getDownloadURL().then((url) => {
                        this.$emit('upload', url)
                        this.loading=false
                        this.show=false
                    })
                })
				// Do something with blob: upload to a server, download and etc.
			}, this.image.type);
		},
		reset() {
			this.image = {
				src: null,
				type: null
			}
		},
		loadImage(event) {
			// Reference to the DOM input element
			const { files } = event.target;
			// Ensure that you have a file before attempting to read it
			if (files && files[0]) {
				// 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
				if (this.image.src) {
					URL.revokeObjectURL(this.image.src)
				}
				// 2. Create the blob link to the file to optimize performance:
				const blob = URL.createObjectURL(files[0]);
				
				// 3. The steps below are designated to determine a file mime type to use it during the 
				// getting of a cropped image from the canvas. You can replace it them by the following string, 
				// but the type will be derived from the extension and it can lead to an incorrect result:
				//
				// this.image = {
				//    src: blob;
				//    type: files[0].type
				// }
				
				// Create a new FileReader to read this image binary data
				const reader = new FileReader();
				// Define a callback function to run, when FileReader finishes its job
				reader.onload = (e) => {
					// Note: arrow function used here, so that "this.image" refers to the image of Vue component
					this.image = {
						// Set the image source (it will look like blob:http://example.com/2c5270a5-18b5-406e-a4fb-07427f5e7b94)
						src: blob,
						// Determine the image type to preserve it during the extracting the image from canvas:
						type: getMimeType(e.target.result, files[0].type),
					};
				};
				// Start the reader job - read file as a data url (base64 format)
				reader.readAsArrayBuffer(files[0]);
			}
		},
	},
	destroyed() {
		// Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
		if (this.image.src) {
			URL.revokeObjectURL(this.image.src)
		}
	}
};
</script>