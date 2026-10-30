import os
from flask import Flask, render_template, request
import numpy as np
from PIL import Image
from sklearn.cluster import KMeans

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Maksimal 16MB

# Pastikan folder uploads ada
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)


def rgb_to_hex(rgb):
  """Mengonversi tuple (R, G, B) menjadi kode HEX (#RRGGBB)."""
  return f'#{int(rgb[0]):02x}{int(rgb[1]):02x}{int(rgb[2]):02x}'


def get_dominant_colors(image_path, num_colors=6):
  """Menganalisis gambar dan mengembalikan warna paling dominan menggunakan K-Means."""
  # Buka gambar dan ubah ukurannya agar proses pemrosesan lebih cepat
  img = Image.open(image_path).convert('RGB')
  img.thumbnail((300, 300))

  # Ubah gambar menjadi array piksel 2D (jumlah_piksel, 3)
  img_data = np.array(img)
  pixels = img_data.reshape(-1, 3)

  # Gunakan K-Means untuk mengelompokkan warna
  kmeans = KMeans(n_clusters=num_colors, random_state=42, n_init=10)
  kmeans.fit(pixels)

  # Ambil pusat kluster (warna utama)
  colors = kmeans.cluster_centers_

  # Urutkan warna berdasarkan frekuensi kemunculannya
  labels, counts = np.unique(kmeans.labels_, return_counts=True)
  sorted_indices = np.argsort(-counts)

  hex_colors = [rgb_to_hex(colors[i]) for i in sorted_indices]
  return hex_colors


@app.route('/', methods=['GET', 'POST'])
def index():
  palette = []
  image_url = None

  if request.method == 'POST':
    if 'image_file' not in request.files:
      return render_template('index.html', error='Tidak ada file diunggah')

    file = request.files['image_file']
    if file.filename == '':
      return render_template('index.html', error='File belum dipilih')

    if file:
      file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
      file.save(file_path)

      # Dapatkan jumlah warna yang diminta (default 6)
      num_colors = int(request.form.get('num_colors', 6))

      # Ekstrak palet warna
      palette = get_dominant_colors(file_path, num_colors=num_colors)
      image_url = file_path

  return render_template('index.html', palette=palette, image_url=image_url)


if __name__ == '__main__':
  app.run(debug=True)