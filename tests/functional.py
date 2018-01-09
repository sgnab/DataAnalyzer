import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
import time


class DataAnalyzerLoginTest(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome(executable_path='C:\\Users\\seyed\\drivers\\chromedriver')
        self.driver.get("http://127.0.0.1:5000/login")
    def test_login(self):
        driver = self.driver
        userName = "seyed"
        password = "12345"
        userId= "username"
        passId = "password"
        logButtonXpath = "/html/body/div/div/form/input"
        userElement = WebDriverWait(driver,10).until(lambda driver: driver.find_element_by_id(userId))
        passElement = WebDriverWait(driver, 10).until(lambda driver: driver.find_element_by_id(passId))
        button = WebDriverWait(driver,10).until(lambda  driver: driver.find_element_by_xpath(logButtonXpath))
        userElement.clear()
        userElement.send_keys(userName)
        passElement.clear()
        passElement.send_keys(password)
        button.click()
        WebDriverWait(driver, 10).until(lambda driver: driver.find_element_by_id("dash-container"))

    def tearDown(self):
        self.driver.close()

if __name__=="__main__":
    unittest.main()



