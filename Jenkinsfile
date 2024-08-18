pipeline {
    agent any

    stages {
        
        stage('Install') {
            steps {
                bat 'corepack enable'
                bat 'corepack prepare pnpm@latest-9 --activate'
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
