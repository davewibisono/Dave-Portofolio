# International Morse Code Dictionary
MORSE_CODE_DICT = {
    'A': '.-',
    'B': '-...',
    'C': '-.-.',
    'D': '-..',
    'E': '.',
    'F': '..-.',
    'G': '--.',
    'H': '....',
    'I': '..',
    'J': '.---',
    'K': '-.-',
    'L': '.-..',
    'M': '--',
    'N': '-.',
    'O': '---',
    'P': '.--.',
    'Q': '--.-',
    'R': '.-.',
    'S': '...',
    'T': '-',
    'U': '..-',
    'V': '...-',
    'W': '.--',
    'X': '-..-',
    'Y': '-.--',
    'Z': '--..',
    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9': '----.',
    '0': '-----',
    ',': '--..--',
    '.': '.-.-.-',
    '?': '..--..',
    '/': '-..-.',
    '-': '-....-',
    '(': '-.--.',
    ')': '-.--.-',
    ' ': '/',
}


def text_to_morse(text):
  """Converts a given text string into Morse code."""
  morse_translation = []
  for char in text.upper():
    if char in MORSE_CODE_DICT:
      morse_translation.append(MORSE_CODE_DICT[char])
    else:
      # If character is not supported, append a placeholder
      morse_translation.append('?')
  return ' '.join(morse_translation)


def main():
  print('========================================')
  print('     TEXT TO MORSE CODE CONVERTER       ')
  print('========================================')

  while True:
    user_input = input("\nEnter text to convert (or type 'exit' to quit): ")

    if user_input.lower() == 'exit':
      print('\nExiting program. Have a great day!')
      break

    if not user_input.strip():
      print('Please enter some valid text.')
      continue

    result = text_to_morse(user_input)
    print(f'\nMorse Code Output:\n{result}')


if __name__ == '__main__':
  main()