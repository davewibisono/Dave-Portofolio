import os
import tkinter as tk
from tkinter import filedialog, messagebox
from PIL import Image, ImageDraw, ImageFont, ImageTk

class WatermarkApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Image Watermarking App")
        self.root.geometry("700x650")
        self.root.config(bg="#f3f4f6")

        self.image_path = None
        self.original_image = None
        self.watermarked_image = None
        self.photo_preview = None

        # --- UI Header ---
        title_label = tk.Label(root, text="Image Watermarking Tool", font=("Inter", 18, "bold"), bg="#f3f4f6", fg="#1f2937")
        title_label.pack(pady=15)

        # --- Frame for Controls ---
        control_frame = tk.Frame(root, bg="#f3f4f6")
        control_frame.pack(pady=5)

        # Upload Button
        self.upload_btn = tk.Button(control_frame, text="Upload Image", command=self.upload_image, bg="#3b82f6", fg="white", font=("Inter", 10, "bold"), padx=10, pady=5, relief="flat")
        self.upload_btn.grid(row=0, column=0, padx=5, pady=5)

        # Watermark Text Input
        tk.Label(control_frame, text="Watermark Text:", bg="#f3f4f6", font=("Inter", 10)).grid(row=0, column=1, padx=5, sticky="e")
        self.text_entry = tk.Entry(control_frame, font=("Inter", 10), width=20)
        self.text_entry.grid(row=0, column=2, padx=5, pady=5)
        self.text_entry.insert(0, "© David Wibisono")

        # Apply Watermark Button
        self.apply_btn = tk.Button(control_frame, text="Apply Watermark", command=self.apply_watermark, bg="#10b981", fg="white", font=("Inter", 10, "bold"), padx=10, pady=5, relief="flat")
        self.apply_btn.grid(row=0, column=3, padx=5, pady=5)

        # Save Button
        self.save_btn = tk.Button(control_frame, text="Save Image", command=self.save_image, bg="#6366f1", fg="white", font=("Inter", 10, "bold"), padx=10, pady=5, relief="flat", state="disabled")
        self.save_btn.grid(row=0, column=4, padx=5, pady=5)

        # --- Image Preview Area ---
        self.preview_frame = tk.Frame(root, bg="#e5e7eb", width=600, height=400, relief="solid", bd=1)
        self.preview_frame.pack(pady=20)
        self.preview_frame.pack_propagate(False)

        self.preview_label = tk.Label(self.preview_frame, text="No Image Uploaded", bg="#e5e7eb", font=("Inter", 11), fg="#6b7280")
        self.preview_label.pack(expand=True)

    def upload_image(self):
        file_path = filedialog.askopenfilename(filetypes=[("Image Files", "*.jpg *.jpeg *.png *.bmp")])
        if file_path:
            self.image_path = file_path
            self.original_image = Image.open(self.image_path).convert("RGBA")
            self.watermarked_image = self.original_image.copy()
            self.display_image(self.watermarked_image)
            self.save_btn.config(state="normal")

    def display_image(self, img):
        # Resize image to fit preview frame (600x400 max)
        img_copy = img.copy()
        img_copy.thumbnail((580, 380))
        self.photo_preview = ImageTk.PhotoImage(img_copy)
        
        self.preview_label.config(image=self.photo_preview, text="")
        self.preview_label.image = self.photo_preview

    def apply_watermark(self):
        if not self.original_image:
            messagebox.showerror("Error", "Please upload an image first!")
            return

        watermark_text = self.text_entry.get()
        if not watermark_text:
            messagebox.showwarning("Warning", "Watermark text cannot be empty!")
            return

        # Create a copy of the original image for watermarking
        base_image = self.original_image.copy()
        txt_layer = Image.new("RGBA", base_image.size, (255, 255, 255, 0))
        
        draw = ImageDraw.Draw(txt_layer)
        
        # Determine font size relative to image height
        font_size = int(base_image.height / 25)
        try:
            font = ImageFont.truetype("arial.ttf", font_size)
        except IOError:
            font = ImageFont.load_default()

        # Calculate text size and position (Bottom-Right corner)
        text_bbox = draw.textbbox((0, 0), watermark_text, font=font)
        text_width = text_bbox[2] - text_bbox[0]
        text_height = text_bbox[3] - text_bbox[1]
        
        margin = 30
        x = base_image.width - text_width - margin
        y = base_image.height - text_height - margin

        # Draw semi-transparent white text
        draw.text((x, y), watermark_text, fill=(255, 255, 255, 160), font=font)

        # Combine original image with watermark layer
        self.watermarked_image = Image.alpha_composite(base_image, txt_layer)
        self.display_image(self.watermarked_image)
        messagebox.showinfo("Success", "Watermark applied successfully!")

    def save_image(self):
        if not self.watermarked_image:
            return

        save_path = filedialog.asksaveasfilename(defaultextension=".png", filetypes=[("PNG file", "*.png"), ("JPEG file", "*.jpg")])
        if save_path:
            # Convert RGBA to RGB if saving as JPEG
            if save_path.lower().endswith(('.jpg', '.jpeg')):
                rgb_im = self.watermarked_image.convert("RGB")
                rgb_im.save(save_path)
            else:
                self.watermarked_image.save(save_path)
            messagebox.showinfo("Success", f"Image successfully saved to:\n{save_path}")

if __name__ == "__main__":
    root = tk.Tk()
    app = WatermarkApp(root)
    root.mainloop()