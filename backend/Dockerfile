FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests
RUN cp target/*.jar app.jar
ENTRYPOINT ["java", "-Xmx256m", "-Xms128m", "-jar", "app.jar"]
