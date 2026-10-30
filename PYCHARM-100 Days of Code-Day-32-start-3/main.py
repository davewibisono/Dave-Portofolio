# Wednesday Motivation Project
import smtplib
import datetime as dt
import random

my_email = "peterkertasono@gmail.com"
password = "niyzdloqaoflbvhs"

now = dt.datetime.now()
weekday = now.weekday()
if weekday == 3:
    with open("quotes.txt") as quote_file:
        all_quotes = quote_file.readlines()
        quote = random.choice(all_quotes)

    print(f"Mengirim quote: {quote}")

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as connection:
        connection.login(user=my_email, password=password)
        connection.sendmail(
            from_addr=my_email,
            to_addrs="davewibisono@gmail.com",
            msg=f"Subject:Wednesday Motivation\n\n{quote}"
        )
    print("Email berhasil terkirim!")
else:
    print(f"Hari ini bukan Rabu (weekday saat ini: {weekday}), email tidak dikirim.")

## Working with date and time in Python
# import datetime as dt
#
# now = dt.datetime.now()
# year = now.year
# month = now.month
# day_of_week = now.weekday()
# print(day_of_week)
#
# date_of_birth = dt.datetime(year=1995, month=12, day=15, hour=4)
# print(date_of_birth)