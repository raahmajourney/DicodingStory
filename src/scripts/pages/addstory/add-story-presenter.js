import AddStoryView from './add-story-view.js';
import StoryModel from '../../data/story-model';

export default class AddStoryPresenter {
  constructor() {
    this.view = AddStoryView;
    this.stream = null;

    this.view.bindCaptureButton(() => this._onCaptureButtonClicked());
    this.view.bindFormSubmit((e) => this._onFormSubmitted(e));
  }

  async _onCaptureButtonClicked() {
    const video = this.view.getVideoElement();
    const canvas = this.view.getCanvasElement();

    if (!this.stream) {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = this.stream;
        this.view.showCamera();
        this.view.hidePreviewImage();
        this.view.updateCaptureButton(true);
      } catch (err) {
        console.error('Kamera error:', err);
        this.view.showAlert('Gagal mengakses kamera.');
      }
      return;
    }

    this._captureImage(video, canvas);
    this._stopCamera();
    this.view.hideCamera();
    this.view.updateCaptureButton(false);
  }

  _captureImage(video, canvas) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const file = new File([blob], 'captured.jpg', { type: 'image/jpeg' });
      this.view.setPhotoInputFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.view.showPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }, 'image/jpeg');
  }

  _stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
  }

  destroy() {
    this._stopCamera(); // Clean-up ketika pindah halaman
  }

  async _onFormSubmitted(e) {
    e.preventDefault();

    const data = this.view.getFormData();

    if (!data.photo) {
      this.view.showAlert('Harap unggah atau ambil foto terlebih dahulu.');
      return;
    }

    try {
      const response = await StoryModel.postStory(data);
      if (response.error) {
        this.view.showAlert(`Gagal: ${response.message}`);
      } else {
        this.view.showAlert('Cerita berhasil dikirim!');
        this.view.navigateTo('/');
      }
    } catch (err) {
      console.error(err);
      this.view.showAlert('Terjadi kesalahan saat mengirim cerita.');
    }
  }
}
