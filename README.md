# Pen Test Partners Vulnerable NodeJS Application (ptpvna) 

![dvna-logo](docs/resources/dvna.png)

Pen Test Partners Vulnerable NodeJS Application (ptpvna) is a simple NodeJS application to demonstrate [**OWASP Top 10 Vulnerabilities**](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project#OWASP_Top_10_for_2013) and guide on fixing and avoiding these vulnerabilities. The [fixes](https://github.com/appsecco/dvna/tree/fixes) branch will contain fixes for the vulnerabilities.

The application is powered by commonly used libraries such as [express](https://www.npmjs.com/package/express), [passport](https://www.npmjs.com/package/passport), [sequelize](https://www.npmjs.com/package/sequelize), etc.

The application comes with a developer friendly comprehensive guide which can be used to learn, avoid and fix the vulnerabilities. The guide available at https://appsecco.com/books/dvna-developers-security-guide/ covers the following

1. Instructions for setting up DVNA
2. Instructions on exploiting the vulnerabilities
3. Vulnerable code snippets and instructions on fixing vulnerabilities
4. Recommendations for avoid such vulnerabilities
5. References for learning more

The blog post for this release is at https://blog.appsecco.com/damn-vulnerable-nodejs-application-dvna-by-appsecco-7d782d36dc1e

## Getting Started

DVNA can be deployed in three ways

1. For Developers, using docker-compose with auto-reload on code updates
2. For Security Testers, using the Official image from Docker Hub
3. For Advanced Users, using a fully manual setup

Detailed instructions on setup and requirements are given in the Guide Gitbook

### Development Setup

Clone this repository
```bash
git clone https://github.com/appsecco/dvna; cd dvna
```

Create a `vars.env` with the desired database configuration
```
MYSQL_USER=dvna
MYSQL_DATABASE=dvna
MYSQL_PASSWORD=passw0rd
MYSQL_RANDOM_ROOT_PASSWORD=yes
```

Start the application and database using docker-compose
```bash
docker-compose up
```

Access the application at http://127.0.0.1:9090/ 

The application will automatically reload on code changes, so feel free to patch and play around with the application.

### Using Official Docker Image

Create a file named `vars.env` with the following configuration
```
MYSQL_USER=dvna
MYSQL_DATABASE=dvna
MYSQL_PASSWORD=passw0rd
MYSQL_RANDOM_ROOT_PASSWORD=yes
MYSQL_HOST=mysql-db
MYSQL_PORT=3306
```

Start a MySQL container
```bash
docker run --name dvna-mysql --env-file vars.env -d mysql:5.7
```

Start the application using the official image
```bash
docker run --name dvna-app --env-file vars.env --link dvna-mysql:mysql-db -p 9090:9090 appsecco/dvna
```

Access the application at http://127.0.0.1:9090/ and start testing!

### Manual Setup

Clone the repository
```bash
git clone https://github.com/appsecco/dvna; cd dvna
```

Configure the environment variables with your database information
```bash
export MYSQL_USER=dvna
export MYSQL_DATABASE=dvna
export MYSQL_PASSWORD=passw0rd
export MYSQL_HOST=127.0.0.1
export MYSQL_PORT=3306
```

Install Dependencies
```bash
npm install
```

Start the application
```bash
npm start
```

Access the application at http://localhost:9090

## TODO

- [ ] Link commits to fixes in documentation
- [ ] Add new vulnerabilities from OWASP Top 10 2017
- [ ] Improve application features, documentation

## Contributing

In case of bugs in the application, please create an issue on github. Pull requests are highly welcome!

## Thanks
[Abhisek Datta - abhisek](https://github.com/abhisek) for application architecture and front-end code

## License

MIT