import StoryModel from '../../data/story-model';


export default class AddStoryPresenter {
  constructor() {
    this._collectElements();
    this._setupEventListeners();
  }

  _collectElements() {
    this.form = document.querySelector('#storyForm');
    this.descriptionInput = document.querySelector('#description');
    this.photoInput = document.querySelector('#photo');
    this.latInput = document.querySelector('#lat');
    this.lonInput = document.querySelector('#lon');
    this.camera = document.querySelector('#camera');
    this.canvas = document.querySelector('#canvas');
    this.captureButton = document.querySelector('#capture-button');
  }

  _setupEventListeners() {
    this._handleCameraCapture();
    this._handleFormSubmission();
  }

  _handleCameraCapture() {
    if (!this.captureButton || !this.camera || !this.canvas || !this.photoInput) return;

    this.captureButton.addEventListener('click', async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        this._startCameraPreview(stream);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        this._captureImageFromCamera();
        this._stopCamera(stream);
      } catch (error) {
        console.error('Gagal membuka kamera:', error);
        alert('Gagal menggunakan kamera. Silakan unggah foto secara manual.');
      }
    });
  }

  _startCameraPreview(stream) {
    this.camera.srcObject = stream;
    this.camera.style.display = 'block';
  }

  _captureImageFromCamera() {
    this.canvas.width = this.camera.videoWidth;
    this.canvas.height = this.camera.videoHeight;

    const context = this.canvas.getContext('2d');
    context.drawImage(this.camera, 0, 0, this.canvas.width, this.canvas.height);

    this.canvas.toBlob((blob) => {
      const photoFile = new File([blob], 'captured.jpg', { type: 'image/jpeg' });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(photoFile);
      this.photoInput.files = dataTransfer.files;
    }, 'image/jpeg');
  }

  _stopCamera(stream) {
    stream.getTracks().forEach((track) => track.stop());
    this.camera.style.display = 'none';
  }

  _handleFormSubmission() {
    if (!this.form) return;

    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const photoFile = this.photoInput.files[0];
      if (!photoFile) {
        alert('Harap unggah atau ambil foto terlebih dahulu.');
        return;
      }

      const storyData = {
        description: this.descriptionInput.value.trim(),
        photo: photoFile,
        lat: this.latInput.value,
        lon: this.lonInput.value,
      };

      try {
        const response = await StoryModel.postStory(storyData);
        if (response.error) {
          alert(`Gagal: ${response.message}`);
        } else {
          alert('Cerita berhasil dikirim!');
          window.location.hash = '/';
        }
      } catch (error) {
        console.error('Kesalahan saat mengirim cerita:', error);
        alert('Terjadi kesalahan saat mengirim cerita.');
      }
    });
  }
}
