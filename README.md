# Personal Health Dashboard

The **Personal Health Dashboard** is a locally-hosted web application designed to help users track and visualize personal health metrics, such as diet (calorie intake) and vitals (weight), in a private and secure environment. Running entirely on the user's machine, it ensures data privacy while providing a modern, responsive interface for logging health data and viewing trends through interactive charts, such as weight history over time. Built with a robust tech stack, the project integrates Angular for the frontend, NestJS for the backend, MongoDB for data storage, and Docker for containerized deployment, all automated via a Jenkins CI/CD pipeline.

The application enables users to log health entries, interact with a RESTful API for data management, and visualize their health progress, making it ideal for those seeking a self-contained, privacy-focused health tracking solution without cloud dependencies.

---

## Project Overview

The Personal Health Dashboard was developed with the following goals:
- **Health Tracking**: Allow users to easily log diet and vital statistics.
- **Data Visualization**: Provide intuitive charts to monitor health trends, like weight changes.
- **Privacy and Security**: Keep all data local to the user’s machine for full control.
- **Automation**: Streamline development, testing, and deployment with a CI/CD pipeline.
- **Modular Design**: Separate frontend, backend, and database for maintainability.

This project showcases a full-stack application with modern development practices, including containerization, automated testing, and continuous integration, serving as both a practical health tool and a reference for developers.

---

## Features

- **Health Data Logging**:
  - Record diet entries with calorie details (e.g., 600 calories).
  - Track vital measurements, such as weight (e.g., 147 lbs).
- **Interactive Dashboard**:
  - Dynamic weight history chart using Chart.js and ng2-charts.
  - User-friendly interface powered by Angular Material.
- **RESTful API**:
  - Endpoints for health data management:
    - `GET /api/health`: Retrieve all health records.
    - `POST /api/health`: Log new health data.
    - `GET /api/health/weight`: Fetch weight history.
- **Local Deployment**:
  - Docker containers for frontend, backend, and MongoDB ensure consistent environments.
- **Automated CI/CD**:
  - Jenkins pipeline automates code checkout, builds, tests, and deployments.
- **Persistent Storage**:
  - MongoDB stores health metrics locally, preserving data across sessions.
- **Responsive Frontend**:
  - Optimized for desktop browsers, with potential for mobile enhancements.

---

## Tech Stack

- **Frontend**:
  - **Angular 19**: Framework for building a single-page application (SPA).
  - **Angular Material**: UI components for a polished, consistent design.
  - **Chart.js / ng2-charts**: Libraries for interactive health charts.
  - **nginx**: Serves the Angular app and proxies API requests to the backend.
- **Backend**:
  - **NestJS 11**: Node.js framework for scalable, efficient APIs.
  - **Mongoose**: Object Data Modeling (ODM) for MongoDB.
  - **Express**: Underlying HTTP server for NestJS.
- **Database**:
  - **MongoDB**: NoSQL database for flexible storage of health metrics.
- **DevOps**:
  - **Docker**: Containers for frontend, backend, and database.
  - **Docker Compose**: Orchestrates multi-container setup.
  - **Jenkins**: Automates CI/CD workflows.
- **Development Tools**:
  - **Node.js 22**: Runtime for frontend and backend.
  - **npm**: Package manager for dependencies.
  - **Jest**: Testing framework for backend unit tests.
  - **TypeScript**: Enhances code quality and maintainability.
  - **ESLint / Prettier**: Enforces code style consistency.

---

## Project Structure

The repository is organized to promote clarity and modularity:
