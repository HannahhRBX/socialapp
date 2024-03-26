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
functions.ClickButtonByText('Change Password')
time.sleep(1) # Prevent page loading issues
functions.EnterByPlaceholder('Current Password','password')
functions.EnterByPlaceholder('New Password','newpassword')
functions.EnterByPlaceholder('Confirm Password','wrongpassword')
functions.ClickButtonByText('Submit')

time.sleep(60) # Prevent browser from immediately closing
