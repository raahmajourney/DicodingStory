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

  bindCaptureButton(handler) {
    this.getElements().captureButton.addEventListener('click', handler);
  },

  bindFormSubmit(handler) {
    this.getElements().form.addEventListener('submit', handler);
  },

  showCamera() {
    this.getElements().camera.style.display = 'block';
  },

  hideCamera() {
    this.getElements().camera.style.display = 'none';
  },

  showPreviewImage(dataUrl) {
    const preview = this.getElements().photoPreview;
    preview.src = dataUrl;
    preview.style.display = 'block';
  },

  hidePreviewImage() {
    const preview = this.getElements().photoPreview;
    preview.style.display = 'none';
    preview.src = '';
  },

  updateCaptureButton(isStreaming) {
    const btn = this.getElements().captureButton;
    btn.textContent = isStreaming ? '📷 Ambil Foto' : '📷 Nyalakan Kamera';
  },

  showAlert(message) {
    alert(message);
  },

  navigateTo(route) {
    window.location.hash = route;
  },

  getFormData() {
    const { descriptionInput, photoInput, latInput, lonInput } = this.getElements();
    return {
      description: descriptionInput.value.trim(),
      photo: photoInput.files[0],
      lat: latInput.value,
      lon: lonInput.value,
    };
  },

  setPhotoInputFile(file) {
    const photoInput = this.getElements().photoInput;
    const dt = new DataTransfer();
    dt.items.add(file);
    photoInput.files = dt.files;
  },

  getVideoElement() {
    return this.getElements().camera;
  },

  getCanvasElement() {
    return this.getElements().canvas;
  },
};

export default AddStoryView;
