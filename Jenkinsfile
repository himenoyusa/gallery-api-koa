pipeline {
  agent {
    docker {
      image 'node:12-alpine' 
      args '-p 3000:3000' 
    }
  }

  stages {
    stage('Build') {
      environment {
        BITBUCKET_COMMON_CREDS = credentials('jenkins-bitbucket-common-creds')
      }
      steps {
        echo 'Building...'
        sh 'npm i'
        sh "mysql -u $BITBUCKET_COMMON_CREDS_USR -p $BITBUCKET_COMMON_CREDS_PSW < init.sql"
      }
    }
    stage('Test') {
      steps {
        echo 'Testing...'
      }
    }
    stage('Deploy') {
      steps {
        echo 'Deploying...'
      }
    }
  }
}
