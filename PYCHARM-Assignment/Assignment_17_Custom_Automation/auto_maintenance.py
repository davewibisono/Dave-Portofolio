import os
import shutil
import datetime
from pathlib import Path
import psutil

# --- KONFIGURASI ---
TARGET_DIR = Path("./my_projects")  # Folder target yang ingin dibackup
BACKUP_DIR = Path("./backups")      # Folder penyimpanan hasil backup
RETENTION_DAYS = 7                  # Hapus file backup yang lebih lama dari X hari

def check_system_vitals():
    """Memeriksa penggunaan sumber daya sistem (CPU, RAM, Disk)."""
    print("\n--- [1/3] MEMERIKSA KESEHATAN SISTEM ---")
    cpu = psutil.cpu_percent(interval=1)
    memory = psutil.virtual_memory().percent
    disk = psutil.disk_usage('/').percent
    
    print(f"• CPU Usage    : {cpu}%")
    print(f"• RAM Usage    : {memory}%")
    print(f"• Disk Usage   : {disk}%")
    
    if disk > 90:
        print("⚠️ [WARNING] Kapasitas disk utama sudah di atas 90%!")

def create_backup():
    """Membuat arsip ZIP otomatis dari folder target."""
    print("\n--- [2/3] MENJALANKAN BACKUP OTOMATIS ---")
    if not TARGET_DIR.exists():
        print(f"⚠️ [WARNING] Direktori target '{TARGET_DIR}' tidak ditemukan. Melewati proses backup.")
        return
    
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_filename = BACKUP_DIR / f"backup_{timestamp}"
    
    try:
        archive_path = shutil.make_archive(str(backup_filename), 'zip', TARGET_DIR)
        print(f"✅ [SUCCESS] Backup berhasil dibuat: {archive_path}")
    except Exception as e:
        print(f"❌ [ERROR] Gagal membuat backup: {e}")

def clean_old_backups():
    """Menghapus file backup lama berdasarkan batas waktu retensi."""
    print("\n--- [3/3] PEMBERSIHAN ARSIP LAMA ---")
    if not BACKUP_DIR.exists():
        print("ℹ️ Direktori backup belum ada, tidak ada yang perlu dibersihkan.")
        return
    
    now = datetime.datetime.now()
    deleted_count = 0
    
    for archive in BACKUP_DIR.glob("backup_*.zip"):
        file_mtime = datetime.datetime.fromtimestamp(archive.stat().st_mtime)
        age_days = (now - file_mtime).days
        
        if age_days > RETENTION_DAYS:
            archive.unlink()
            print(f"🗑️ [CLEANUP] Menghapus backup kedaluwarsa: {archive.name} (Umur: {age_days} hari)")
            deleted_count += 1
            
    if deleted_count == 0:
        print("ℹ️ Tidak ada arsip lama yang perlu dihapus.")
    else:
        print(f"✅ Pembersihan selesai. Total file dihapus: {deleted_count}")

if __name__ == "__main__":
    print(f"==========================================")
    print(f"  AUTOMATION TASK STARTED: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"==========================================")
    
    check_system_vitals()
    create_backup()
    clean_old_backups()
    
    print(f"\n==========================================")
    print(f"  AUTOMATION COMPLETED SUCCESSFULLY")
    print(f"==========================================")