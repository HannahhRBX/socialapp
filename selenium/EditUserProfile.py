import functions
import time

functions.driver.get("http://localhost:3000/login")

# Login to the website
functions.EnterByPlaceholder('Email','johnnydoe@email.com')
functions.EnterByPlaceholder('Password','password')
functions.ClickButtonByText('Login')
time.sleep(1) # Prevent page loading issues
# Profile Editing
functions.ClickButtonByText('Edit Profile')
time.sleep(1) # Prevent page loading issues
functions.EnterByName('FirstName','Johnny')
functions.EnterByName('LastName','Doe')
functions.EnterByName('Bio','This has been changed.')
functions.EnterByName('Discord','Johnny26')
functions.UploadFile("C:\\Users\\Hannah\\Pictures\\ProfilePicture2.png")
time.sleep(1) # Prevent page loading issues
functions.ClickButtonByText('Update')
time.sleep(60) # Prevent browser from immediately closing
