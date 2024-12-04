# Personalized Advertisement System Setup Guide

1. **JDK 17**  
   Ensure that JDK 17 is installed on your system. You can verify it by running:
   ```bash
   java -version

2. **mysql**
    ```bash
   mysql --version
   mysql -u root -p
   CREATE DATABASE personalized_advertisement_system;

3. **Update the config**  
  open `src/main/resources/application.properties`
    ```properties
   spring.datasource.username=your_mysql_username
   spring.datasource.password=your_mysql_password

4. **Run the Backend Application**
    ```bash
   cd src/main/java/org/lei/personalized_advertisement_system/
   javac PersonalizedAdvertisementSystemApplication.java
   java PersonalizedAdvertisementSystemApplication

5. **Set Up the Frontend**
   ```bash
   cd src/main/resources/templates
   npm install
   npm start
   
6. **Access the Application**
   Once the backend and frontend are running, open your browser and go to:
   http://localhost:3000/
