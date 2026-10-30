# Initialize the game board
board = [" " for _ in range(9)]

def print_board():
    row1 = f" {board[0]} | {board[1]} | {board[2]} "
    row2 = f"---+---+---"
    row3 = f" {board[3]} | {board[4]} | {board[5]} "
    row4 = f"---+---+---"
    row5 = f" {board[6]} | {board[7]} | {board[8]} "
    print("\n" + row1 + "\n" + row2 + "\n" + row3 + "\n" + row4 + "\n" + row5 + "\n")

def player_move(icon):
    if icon == "X":
        player_name = "Player 1 (X)"
    else:
        player_name = "Player 2 (O)"
        
    print(f"{player_name}'s turn")
    while True:
        try:
            choice = int(input("Choose a position (1-9): "))
            if 1 <= choice <= 9:
                if board[choice - 1] == " ":
                    board[choice - 1] = icon
                    break
                else:
                    print("That space is already taken! Choose another one.")
            else:
                print("Invalid input. Please enter a number between 1 and 9.")
        except ValueError:
            print("Please enter a valid number!")

def is_victory(icon):
    win_conditions = [
        (0, 1, 2), (3, 4, 5), (6, 7, 8),  # Rows
        (0, 3, 6), (1, 4, 7), (2, 5, 8),  # Columns
        (0, 4, 8), (2, 4, 6)             # Diagonals
    ]
    for condition in win_conditions:
        if board[condition[0]] == board[condition[1]] == board[condition[2]] == icon:
            return True
    return False

def is_draw():
    return " " not in board

def play_game():
    current_icon = "X"
    print("=== WELCOME TO TIC TAC TOE ===")
    print("Board position guide:")
    print(" 1 | 2 | 3 ")
    print("---+---+---")
    print(" 4 | 5 | 6 ")
    print("---+---+---")
    print(" 7 | 8 | 9 \n")

    while True:
        print_board()
        player_move(current_icon)
        
        if is_victory(current_icon):
            print_board()
            winner = "Player 1 (X)" if current_icon == "X" else "Player 2 (O)"
            print(f"🎉 CONGRATULATIONS! {winner} WINS! 🎉")
            break
        
        if is_draw():
            print_board()
            print("🤝 It's a DRAW! 🤝")
            break
        
        # Switch turns
        current_icon = "O" if current_icon == "X" else "X"

# Run the game
if __name__ == "__main__":
    play_game()