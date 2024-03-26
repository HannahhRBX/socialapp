from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By

def EnterText(xpath,text): #Function to send keys to a specified XPATH with specified text
    textbox = driver.find_element(By.XPATH, xpath)
    textbox.clear()
    textbox.send_keys(text)

def EnterByPlaceholder(placeholder,text): #Function to send keys to a textbox by reffering to its placeholder text
    EnterText("//input[@placeholder='"+placeholder+"']",text)

def EnterByName(name,text): #Function to send keys to a textbox by reffering to its name
    EnterText("//*[@name='"+name+"']",text)

def ClickByXPATH(xpath): #Function to Click elements by XPATH
    button = driver.find_element(By.XPATH, xpath)
    button.click()

def ClickByText(objClass,text): #Function to Click elements by type
    button = driver.find_element(By.XPATH, "//"+objClass+"[(text()='"+text+"')]")
    button.click()

def ClickButtonByText(text): #Function to click button type elements 
    ClickByText('button',text)

def UploadFile(fileLocation): #Function to upload file by filepath to POST files in form
    elem = driver.find_element(By.XPATH,"//input[@type='file']")
    elem.send_keys(fileLocation)

options = Options()
options.add_argument("--window-size=1600,900")
driver = webdriver.Chrome(options=options)
