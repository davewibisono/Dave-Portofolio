import time
from PIL import ImageGrab, ImageOps
import pyautogui


class DinoBot:

  def __init__(self):
    # Tentukan koordinat kotak area (bounding box) di depan dinosaurus.
    # Format: (left, upper, right, lower)
    # Catatan: Nilai ini perlu disesuaikan dengan resolusi layar dan posisi browser Anda.
    self.bbox = (330, 380, 410, 420)

  def check_obstacle(self):
    """Menangkap layar pada area tertentu dan menghitung rata-rata tingkat warna/kecerahan."""
    image = ImageGrab.grab(bbox=self.bbox)
    gray_image = ImageOps.grayscale(image)
    # Menghitung rata-rata nilai piksel; adanya kaktus (objek gelap) akan mengubah rata-rata ini.
    avg_color = sum(list(gray_image.getdata())) / len(gray_image.getdata())
    return avg_color

  def jump(self):
    pyautogui.press("space")

  def run(self):
    print("🎮 Bot Google Dinosaur aktif dalam 3 detik...")
    print(
        "Segera buka game Dino (chrome://dino) dan letakkan jendela di posisi"
        " yang sesuai."
    )
    time.sleep(3)
    print("🚀 Bot sedang berjalan! Tekan Ctrl+C di terminal untuk berhenti.")

    try:
      while True:
        # Nilai threshold (ambang batas) ini mendeteksi perubahan piksel saat kaktus muncul.
        # Jika latar belakang terang, nilai rata-rata akan turun drastis jika ada kaktus.
        if self.check_obstacle() < 270:  # Sesuaikan threshold jika diperlukan
          self.jump()
          time.sleep(
              0.08
          )  # Jeda singkat agar tidak spam tombol saat melompati rintangan

    except KeyboardInterrupt:
      print("\n🛑 Bot dihentikan.")


if __name__ == "__main__":
  bot = DinoBot()
  bot.run()