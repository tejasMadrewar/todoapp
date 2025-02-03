# TodoMVC app

TodoMVC app with angular frontend and backend in Spring boot 3 (Java 17)
Example of how to package frontend and backend in single jar file.

Build frontend
```
cd frontend
ng build
```

Build backend jar
```
mvnw package
```

Run app
```
java -jar target\todoapp-0.0.1-SNAPSHOT.jar
```

Goto localhost:8080 to use angular app