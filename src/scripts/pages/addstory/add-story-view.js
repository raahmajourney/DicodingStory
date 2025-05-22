const AddStoryView = {
  getElements() {
    return {
      form: document.querySelector('#storyForm'),
      descriptionInput: document.querySelector('#description'),
      photoInput: document.querySelector('#photo'),
      latInput: document.querySelector('#lat'),
      lonInput: document.querySelector('#lon'),
      camera: document.querySelector('#camera'),
      canvas: document.querySelector('#canvas'),
      captureButton: document.querySelector('#capture-button'),
      photoPreview: document.querySelector('#photoPreview'),
    };
  },

  showCamera(camera) {
    camera.style.display = 'block';
  },

  hideCamera(camera) {
    camera.style.display = 'none';
  },

  showAlert(message) {
    alert(message);
  },

   showPreviewImage(dataUrl) {
    const preview = document.querySelector('#photoPreview');
    preview.src = dataUrl;
    preview.style.display = 'block';
  },

  hidePreviewImage() {
    const preview = document.querySelector('#photoPreview');
    preview.style.display = 'none';
    preview.src = '';
  },

  updateCaptureButton(isStreaming) {
    const btn = document.querySelector('#capture-button');
    btn.textContent = isStreaming ? '📷 Ambil Foto' : '📷 Nyalakan Kamera';
  },


  showAlert(message) {
    alert(message);
  },

};

export default AddStoryView;
