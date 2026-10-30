import tkinter as tk
import random
import time

class TypingSpeedTest:
    def __init__(self, root):
        self.root = root
        self.root.title("Typing Speed Test")
        self.root.geometry("700x520")
        self.root.config(bg="#f3f4f6")

        # List of sample sentences
        self.sentences = [
            "The quick brown fox jumps over the lazy dog.",
            "Python is a versatile programming language used for web development, data science, and artificial intelligence.",
            "Practice makes perfect when learning how to code efficient and clean software solutions.",
            "Industrial engineering optimizes complex processes, systems, or organizations by developing improvement strategies."
        ]
        
        self.start_time = None
        self.sample_text = random.choice(self.sentences)

        # --- UI Header ---
        title_label = tk.Label(root, text="Typing Speed Test", font=("Inter", 18, "bold"), bg="#f3f4f6", fg="#1f2937")
        title_label.pack(pady=15)

        instructions = tk.Label(root, text="Type the text below as fast and accurately as you can:", font=("Inter", 11), bg="#f3f4f6", fg="#4b5563")
        instructions.pack(pady=5)

        # --- Sample Text Display ---
        self.sample_label = tk.Label(root, text=self.sample_text, font=("Inter", 11), bg="white", fg="#1f2937", wraplength=600, justify="left", relief="solid", bd=1, padx=15, pady=15)
        self.sample_label.pack(pady=15, fill="x", padx=50)

        # --- Text Input Area ---
        self.input_text = tk.Text(root, height=4, font=("Inter", 11), wrap="word")
        self.input_text.pack(padx=50, pady=5, fill="x")
        self.input_text.bind("<KeyPress>", self.start_timer)

        # --- Results Area ---
        results_frame = tk.Frame(root, bg="#f3f4f6")
        results_frame.pack(pady=10)

        self.wpm_label = tk.Label(results_frame, text="WPM: 0", font=("Inter", 12, "bold"), bg="#f3f4f6", fg="#10b981")
        self.wpm_label.grid(row=0, column=0, padx=25)

        self.accuracy_label = tk.Label(results_frame, text="Accuracy: 100%", font=("Inter", 12, "bold"), bg="#f3f4f6", fg="#3b82f6")
        self.accuracy_label.grid(row=0, column=1, padx=25)

        # --- Control Buttons ---
        btn_frame = tk.Frame(root, bg="#f3f4f6")
        btn_frame.pack(pady=10)

        self.submit_btn = tk.Button(btn_frame, text="Calculate Result", command=self.calculate_results, bg="#10b981", fg="white", font=("Inter", 10, "bold"), padx=15, pady=8, relief="flat")
        self.submit_btn.grid(row=0, column=0, padx=10)

        self.reset_btn = tk.Button(btn_frame, text="Reset", command=self.reset_test, bg="#6b7280", fg="white", font=("Inter", 10, "bold"), padx=15, pady=8, relief="flat")
        self.reset_btn.grid(row=0, column=1, padx=10)

    def start_timer(self, event):
        # Start the timer on the first meaningful key press
        if self.start_time is None and event.keysym not in ("Shift_L", "Shift_R", "Control_L", "Control_R", "Alt_L", "Alt_R", "Caps_Lock"):
            self.start_time = time.time()

    def calculate_results(self):
        if self.start_time is None:
            return
        
        end_time = time.time()
        elapsed_time = end_time - self.start_time
        if elapsed_time <= 0:
            elapsed_time = 1

        typed = self.input_text.get("1.0", "end-1c").strip()
        if not typed:
            return

        # Calculate Words Per Minute (WPM)
        minutes = elapsed_time / 60
        words_typed = len(typed.split())
        wpm = int(words_typed / minutes) if minutes > 0 else 0

        # Calculate Accuracy
        target = self.sample_text
        correct_chars = sum(1 for i, c in enumerate(typed) if i < len(target) and c == target[i])
        accuracy = int((correct_chars / len(target)) * 100) if len(target) > 0 else 0
        if accuracy < 0: accuracy = 0
        if accuracy > 100: accuracy = 100

        # Update labels
        self.wpm_label.config(text=f"WPM: {wpm}")
        self.accuracy_label.config(text=f"Accuracy: {accuracy}%")

    def reset_test(self):
        self.start_time = None
        self.sample_text = random.choice(self.sentences)
        self.sample_label.config(text=self.sample_text)
        self.input_text.delete("1.0", "end")
        self.wpm_label.config(text="WPM: 0")
        self.accuracy_label.config(text="Accuracy: 100%")

if __name__ == "__main__":
    root = tk.Tk()
    app = TypingSpeedTest(root)
    root.mainloop()