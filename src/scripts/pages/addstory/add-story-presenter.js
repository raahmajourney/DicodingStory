import StoryModel from '../../data/story-model';
import AddStoryView from './add-story-view';

export default class AddStoryPresenter {
  constructor() {
    this.elements = AddStoryView.getElements();
    this.stream = null;
    this._setupEventListeners();
  }

  _setupEventListeners() {
    this._handleCameraToggle();
    this._handleFormSubmission();
  }

  _handleCameraToggle() {
    const { captureButton, camera, canvas, photoInput } = this.elements;

    captureButton.addEventListener('click', async () => {
      // Kamera belum aktif → nyalakan
      if (!this.stream) {
        try {
          this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
          camera.srcObject = this.stream;
          AddStoryView.showCamera(camera);
          AddStoryView.hidePreviewImage();
          AddStoryView.updateCaptureButton(true);
        } catch (err) {
          console.error('Kamera error:', err);
          AddStoryView.showAlert('Gagal mengakses kamera.');
        }
        return;
      }

      // Kamera aktif → ambil foto lalu matikan kamera
      this._captureImage(camera, canvas, photoInput);
      this._stopCamera();
      AddStoryView.hideCamera(camera);
      AddStoryView.updateCaptureButton(false);
    });
  }

  _captureImage(video, canvas, photoInput) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const file = new File([blob], 'captured.jpg', { type: 'image/jpeg' });
      const dt = new DataTransfer();
      dt.items.add(file);
      photoInput.files = dt.files;

      // Tampilkan preview
      const reader = new FileReader();
      reader.onload = () => {
        AddStoryView.showPreviewImage(reader.result);
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

  _handleFormSubmission() {
    const { form, descriptionInput, photoInput, latInput, lonInput } = this.elements;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const photoFile = photoInput.files[0];
      if (!photoFile) {
        AddStoryView.showAlert('Harap unggah atau ambil foto terlebih dahulu.');
        return;
      }

      const storyData = {
        description: descriptionInput.value.trim(),
        photo: photoFile,
        lat: latInput.value,
        lon: lonInput.value,
      };

      try {
        const response = await StoryModel.postStory(storyData);
        if (response.error) {
          AddStoryView.showAlert(`Gagal: ${response.message}`);
        } else {
          AddStoryView.showAlert('Cerita berhasil dikirim!');
          window.location.hash = '/';
        }
      } catch (error) {
        console.error(error);
        AddStoryView.showAlert('Terjadi kesalahan saat mengirim cerita.');
      }
    });
  }
}
