pipeline {
    agent any

    environment {
        CI = false
        PUBLISH_DIR = 'C:/inetpub/wwwroot/DigiLogBook'
    }

    stages {
        
        stage('Install') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }
        
        stage('Add web.config') {
            steps {
                bat "powershell.exe -Command \"Copy-Item -Path ./web.config -Destination ./build/\""
            }
        }

        stage('Remove Last Publish Files') {
            steps {
                bat "powershell.exe -Command \"Remove-Item $env.PUBLISH_DIR/* -Recurse\""
            }
        }

        stage('Copy and paste publish files') {
            steps {
                bat "powershell.exe -Command \"Copy-Item -Path  ./build/* -Destination $env.PUBLISH_DIR -Recurse\""
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
