pipeline {
  agent any
 
  tools {nodejs "node"}
  
  stages {
    stage('Prepare') {
      steps {
        sh 'yarn install --mutex network'
      }
    }

    stage('Unit Tests') {
      parallel {
        stage('Logic') {
          steps {
            sh 'yarn test'
          }
        }

        stage('Syntax & Naming') {
          steps {
            sh 'yarn lint'
          }
        }
      }
    }

    stage('Build & Launch') {
      steps {
        sh 'yarn build'
        sh 'yarn start:prod'
      }
    }

    stage('E2E Tests') {
      steps {
        sh 'yarn e2e'
      }
    }

    stage('Clean Up') {
      steps {
        sh 'yarn stop:prod'
        sh 'rm -rf node_modules'
      }
    }

  }
}