import turtle

# Set up the screen
screen = turtle.Screen()
screen.title("Breakout - Python Turtle Edition")
screen.bgcolor("black")
screen.setup(width=600, height=600)
screen.tracer(0)  # Turns off automatic screen updates for smooth animation

# Initialize Game Variables
score = 0
lives = 3

# Score & Lives Display
score_display = turtle.Turtle()
score_display.speed(0)
score_display.color("white")
score_display.penup()
score_display.hideturtle()
score_display.goto(0, 260)
score_display.write("Score: 0  Lives: 3", align="center", font=("Courier", 14, "normal"))

# Paddle
paddle = turtle.Turtle()
paddle.speed(0)
paddle.shape("square")
paddle.color("cyan")
paddle.shapesize(stretch_wid=1, stretch_len=5)
paddle.penup()
paddle.goto(0, -250)

# Ball
ball = turtle.Turtle()
ball.speed(0)
ball.shape("circle")
ball.color("white")
ball.penup()
ball.goto(0, -200)
ball.dx = 3.0
ball.dy = -3.0

# Create Bricks
bricks = []
colors = ["red", "orange", "yellow", "green"]

for row_idx, color in enumerate(colors):
    for col_idx in range(-5, 6):  # 11 bricks per row
        brick = turtle.Turtle()
        brick.speed(0)
        brick.shape("square")
        brick.color(color)
        brick.shapesize(stretch_wid=1, stretch_len=2.3)
        brick.penup()
        
        # Position each brick in a grid layout
        x = col_idx * 52
        y = 220 - (row_idx * 25)
        brick.goto(x, y)
        bricks.append(brick)

# Paddle Movement Functions
def paddle_left():
    x = paddle.xcor()
    if x > -240:
        paddle.setx(x - 35)

def paddle_right():
    x = paddle.xcor()
    if x < 240:
        paddle.setx(x + 35)

# Keyboard Bindings
screen.listen()
screen.onkeypress(paddle_left, "Left")
screen.onkeypress(paddle_right, "Right")

def update_score():
    score_display.clear()
    score_display.write(f"Score: {score}  Lives: {lives}", align="center", font=("Courier", 14, "normal"))

# Main Game Loop
def game_loop():
    global score, lives
    
    # Move the ball
    ball.setx(ball.xcor() + ball.dx)
    ball.sety(ball.ycor() + ball.dy)
    
    # Border Collision - Left & Right Walls
    if ball.xcor() > 290:
        ball.setx(290)
        ball.dx *= -1
        
    if ball.xcor() < -290:
        ball.setx(-290)
        ball.dx *= -1
        
    # Border Collision - Top Wall
    if ball.ycor() > 290:
        ball.sety(290)
        ball.dy *= -1
        
    # Border Collision - Bottom Wall (Lose a Life)
    if ball.ycor() < -290:
        ball.goto(0, -200)
        ball.dy *= -1
        lives -= 1
        update_score()
        if lives == 0:
            score_display.goto(0, 0)
            score_display.write("GAME OVER", align="center", font=("Courier", 24, "bold"))
            return  # Stop the loop
            
    # Paddle Collision
    if (ball.ycor() > -240 and ball.ycor() < -230) and (paddle.xcor() - 55 < ball.xcor() < paddle.xcor() + 55):
        ball.sety(-230)
        ball.dy *= -1
        
    # Brick Collisions
    for brick in bricks[:]:
        if brick.isvisible() and ball.distance(brick) < 25:
            brick.hideturtle()
            bricks.remove(brick)
            ball.dy *= -1
            score += 10
            update_score()
            
            # Check Win Condition
            if not bricks:
                score_display.goto(0, 0)
                score_display.write("YOU WIN!", align="center", font=("Courier", 24, "bold"))
                return

    screen.update()
    screen.ontimer(game_loop, 10)

# Start the game
game_loop()
turtle.done()