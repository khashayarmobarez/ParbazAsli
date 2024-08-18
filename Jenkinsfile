pipeline {
    agent any

    environment {
        CI = false
    }

    stages {
        
        stage('Install') {
            steps {
                bat 'npm run build'
            }
        }
    }
    
    post {
        success {
            echo 'Deployment succeeded!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
