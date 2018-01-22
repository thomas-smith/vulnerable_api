### Setup

MySQL Setup
1. Create an instance of MySQL
2. Create a DB called `dvna`
3. Create a user with a password
4. Assign the user to the DB created in step two
5. If your server does not automatically create environment variables for MySQL
you will need to add the following environment variables:

MYSQL_USER = THIS IS THE DB USER NAME YOU CREATED
MYSQL_PASSWORD = THIS IS THE DB USER PASSWORD
MYSQL_DATABASE = 'dvna'
MYSQL_HOST = THE IP OR NAME WHERE THE MYSQL INSTANCE IS I.E. 127.0.0.1
MYSQL_PORT = IF A DIFFERENT PORT IS UUSED FOR THE MYSQL INSTANCE ADD HERE

Install Repo onto the server
```bash
git clone URL
cd APP
```

Install Dependencies
```bash
npm install
```

Start the application
```bash
npm start
```

Access the application at http://ASSIGNED_URL:9090
