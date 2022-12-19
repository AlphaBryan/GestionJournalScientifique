FROM openjdk:18-jdk as builder

WORKDIR /code
COPY . .

RUN ./mvnw package -D maven.test.skip


FROM openjdk:18-jdk-alpine as runner

WORKDIR /code

ARG JAR_FILE=target/api-0.0.1-SNAPSHOT.jar

COPY --from=builder /code/${JAR_FILE} /code/app.jar

ENTRYPOINT ["java","-jar","/code/app.jar"]