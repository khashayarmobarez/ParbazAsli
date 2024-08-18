pipeline {
    agent any

    stages {
        
        stage('Build') {
            steps {
                bat 'corepack enable'
                bat 'corepack prepare pnpm@latest-9 --activate'
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
