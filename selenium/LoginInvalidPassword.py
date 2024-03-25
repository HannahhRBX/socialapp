import functions
import time

functions.driver.get("http://localhost:3000/login")
# Enter user information at login using placeholder text to find XPATH
functions.EnterByPlaceholder('Email','johnnydoe@email.com')
functions.EnterByPlaceholder('Password','wrongpassword123')
# Click login button
functions.ClickButtonByText('Login')
time.sleep(60) # Prevent browser from immediately closing
