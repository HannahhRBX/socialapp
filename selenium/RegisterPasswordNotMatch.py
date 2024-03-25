import functions
import time

functions.driver.get("http://localhost:3000/login")
# Click create account
functions.ClickButtonByText('Create Account')
# Enter user information at login using placeholder text to find XPATH
functions.EnterByPlaceholder('First Name','Johnny')
functions.EnterByPlaceholder('Last Name','Doe')
functions.EnterByPlaceholder('Email','johnnydoe@email.com')
functions.EnterByPlaceholder('Discord Username','JohnnyDoe26')
functions.EnterByPlaceholder('Password','password123')
functions.EnterByPlaceholder('Confirm Password','password12')
functions.UploadFile("C:\\Users\\Hannah\\Pictures\\ProfilePicture.png")
functions.ClickButtonByText('Create Account')

time.sleep(60) # Prevent browser from immediately closing
