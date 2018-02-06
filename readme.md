# LMS Test Scripts

Test project LMS setup and integration using Scorm 1.1/1.2

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Setup

Please follow the steps below to setup the development environment on your local machine.

After downloading the repository source code, install the necessary npm packages
```
npm install
```

Install grunt (task runner) globally.
```
npm install -g grunt
```

Do not forget to put on the necessary values for the database connection settings found at /dist/config/db.json

```
{
    "host": "localhost",
    "user": "",
    "password": "",
    "database": "EvacScorm"
}
```

Create your database that will serve as your learning record store, i.e

```
CREATE DATABASE EvacScorm; USE EvacScorm;
```

Create the necessary tables. SQL script is in the db_setup directory named LMS.sql. Using the MySQL Command Line

```
mysql -uroot -p EvacScorm < db_setup/LMS.sql
```


## Running 

cd to the project root directory and compile ts files using grunt

```
npm run grunt
```

Fire up the server

```
npm start
```

The static HTML files is at 

```
http://127.0.0.1:3000/scorm-v3/
```


## References

* [Rustici Software](https://scorm.com/scorm-explained/technical-scorm/scorm-12-overview-for-developers/)
* [Scorm](https://www.scorm.com/)
* [pipwerks](https://pipwerks.com/2008/05/08/adding-scorm-code-to-an-html-file/)


