# 1) Build stage with Java 17
FROM maven:3.9.0-eclipse-temurin-17 AS builder
WORKDIR /app

# Copy only what's needed for dependency download
COPY pom.xml ./
# If you have a .mvn folder, copy it too:
# COPY .mvn .mvn
RUN mvn dependency:go-offline -B

# Copy source & package
COPY src ./src
# Build without tests
RUN mvn clean package -DskipTests

# 2) Runtime stage
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copy the fat-jar (artifactId=backend, version=0.0.1-SNAPSHOT)
COPY --from=builder /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8086
ENTRYPOINT ["java","-jar","/app/app.jar"]
