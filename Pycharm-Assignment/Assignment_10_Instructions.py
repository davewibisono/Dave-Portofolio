from gtts import gTTS
from pypdf import PdfReader


def pdf_to_audiobook(pdf_path, output_mp3_path, lang="en"):
  """Membaca file PDF, mengekstrak teksnya, dan mengubahnya menjadi file audio (MP3)."""
  try:
    print(f"📄 Membaca file PDF: {pdf_path}...")
    reader = PdfReader(pdf_path)
    full_text = ""

    # Ekstraksi teks dari setiap halaman PDF
    for i, page in enumerate(reader.pages):
      text = page.extract_text()
      if text:
        full_text += text + "\n"
      print(
          f"-> Berhasil memproses halaman {i + 1} dari {len(reader.pages)}"
      )

    if not full_text.strip():
      print(
          "⚠️ Peringatan: Tidak ada teks yang dapat diekstrak dari PDF tersebut."
      )
      return

    print("🔊 Mengonversi teks menjadi suara (Text-to-Speech)...")
    # Buat objek gTTS (atur lang='id' jika teksnya Bahasa Indonesia)
    tts = gTTS(text=full_text, lang=lang, slow=False)

    print(f"💾 Menyimpan audiobook ke: {output_mp3_path}...")
    tts.save(output_mp3_path)
    print("✨ Selesai! Audiobook berhasil dibuat.")

  except Exception as e:
    print(f"❌ Terjadi kesalahan: {e}")


# Contoh penggunaan:
if __name__ == "__main__":
  # Ganti dengan path file PDF kamu
  input_pdf = "sample.pdf"
  output_audio = "audiobook_hasil.mp3"

  # Jalankan fungsi (gunakan lang='id' untuk Bahasa Indonesia, 'en' untuk Bahasa Inggris)
  pdf_to_audiobook(input_pdf, output_audio, lang="en")