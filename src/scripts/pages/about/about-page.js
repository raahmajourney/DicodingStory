export default class AboutPage {
  async render() {
    return `
      <section class="container" id="main-content">
        <h1>Tentang Aplikasi</h1>
        <p>
          Aplikasi ini adalah platform berbagi cerita dengan fitur lokasi.<br><br>
          Anda dapat menambahkan cerita disertai foto dan lokasi geografis. 
          Cerita-cerita ini bisa dilihat secara interaktif di peta.<br><br>
          Dibuat sebagai bagian dari pembelajaran pemrograman web modern.
        </p>
        <br>
        <h3>Pengembang:</h3>
        <ul>
          <li><strong>Nama:</strong> Rahma</li>
          <li><strong>Email:</strong> <a href="mailto:raahma2410if@gmail.com">rahma@gmail.com</a></li>
          <li><strong>GitHub:</strong> <a href="https://github.com/raahmajourney" target="_blank" rel="noopener">raahmajourney</a></li>
        </ul>
      </section>
    `;
  }

  async afterRender() {
    // Do your job here
  }
}
