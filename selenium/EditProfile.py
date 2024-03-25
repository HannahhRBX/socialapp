import functions
import time

functions.driver.get("http://localhost:3000/login")

# Login to the website
functions.EnterByPlaceholder('Email','johnnydoe@email.com')
functions.EnterByPlaceholder('Password','password123')
functions.ClickButtonByText('Login')

# Profile Editing
functions.ClickButtonByText('Edit Profile')
functions.EnterByPlaceholder('First Name','Johnny')
functions.EnterByPlaceholder('Last Name','Doe')
functions.EnterByPlaceholder('Bio','This has been changed.')
functions.EnterByPlaceholder('Discord Username','Johnny26')
functions.UploadFile("C:\\Users\\Hannah\\Pictures\\ProfilePicture2.png")
functions.ClickButtonByText('Update')
time.sleep(60) # Prevent browser from immediately closing
