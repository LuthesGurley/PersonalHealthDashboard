pipeline {
  agent any
  tools {
    nodejs "Node22"
  }
  environment {
    PATH = "/var/jenkins_home/tools/jenkins.plugins.nodejs.tools.NodeJSInstallation/Node22/bin:/usr/local/bin:$PATH"
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Build Frontend') {
      steps {
        dir('frontend') {
          sh '''
            npm --version || echo "npm not found"
            npm install
            npm install @angular/cli@19
            npx ng build --configuration production
          '''
        }
      }
    }
    stage('Test Backend') {
      steps {
        dir('backend') {
          sh '''
            npm --version || echo "npm not found"
            npm install
            npm run test
          '''
        }
      }
    }
    stage('Build Docker Images') {
      steps {
        sh 'docker-compose -f docker/docker-compose.yml build'
      }
    }
    stage('Run Containers') {
      steps {
        sh 'docker-compose -f docker/docker-compose.yml up -d'
      }
    }
  }
  post {
    always {
      sh 'docker-compose -f docker/docker-compose.yml down || true'
    }
  }
}

