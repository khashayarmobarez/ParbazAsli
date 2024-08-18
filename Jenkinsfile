pipeline {
    agent any

    environment {
        CI = false
    }

    stages {
        
        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }
        
        stage('Add web.config') {
            steps {
                bat "powershell.exe -Command \"Copy-Item -Path .\\web.config -Destination .\\build\\\""
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
