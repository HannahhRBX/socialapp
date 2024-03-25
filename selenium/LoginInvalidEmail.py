import functions
import time

functions.driver.get("http://localhost:3000/login")
# Enter user information at login using placeholder text to find XPATH
functions.EnterByPlaceholder('Email','anotheremail@email.com')
functions.EnterByPlaceholder('Password','password')
# Click login button
functions.ClickButtonByText('Login')
time.sleep(60) # Prevent browser from immediately closing
