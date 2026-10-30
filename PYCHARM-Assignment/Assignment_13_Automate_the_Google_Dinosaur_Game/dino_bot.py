import time
from PIL import ImageGrab, ImageOps
import pyautogui

# Menonaktifkan fitur fail-safe agar bot tidak error saat mouse di pojok layar
pyautogui.FAILSAFE = False


class DinoBot:

  def __init__(self):
    # Tentukan koordinat kotak area (bounding box) di depan dinosaurus.
    # Format: (left, upper, right, lower)
    self.bbox = (330, 380, 410, 420)

  def check_obstacle(self):
    """Menangkap layar dan menghitung rata-rata tingkat warna/kecerahan."""
    image = ImageGrab.grab(bbox=self.bbox)
    gray_image = ImageOps.grayscale(image)

    # Menggunakan metode yang aman untuk Pillow versi terbaru
    pixels = list(gray_image.getdata())
    avg_color = sum(pixels) / len(pixels)
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
        # Threshold untuk mendeteksi rintangan (kaktus/objek gelap)
        if self.check_obstacle() < 270:
          self.jump()
          time.sleep(
              0.08
          )  # Jeda singkat agar tidak spam tombol saat melompat

    except KeyboardInterrupt:
      print("\n🛑 Bot dihentikan.")


if __name__ == "__main__":
  bot = DinoBot()
  bot.run()